import { ModalFormWrapper } from "./modal-form.style";
import { FormCheckbox, FormInput, FormSelect, FormTextarea } from "../../design-system/form-inputs";
import { SubmitHandler, useForm } from "react-hook-form";
import { formatPhoneNumber } from "../../../utils";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import api from "../../../api/httpConfig";
import { EApi } from "../../../api/endpoints";
import { ModalTypeFormT } from "../modal/modal-send";
import { clearCart } from "../../../store/cartSlice";
import { ymNeedCalculation, ymPlacedAnOrder, ymSubmitPartnership } from "../../../utils/yandex-metrika";

export enum EFormInps {
  USERNAME = 'Username',
  EMAIL = 'Email',
  AGREEMENT = 'Agreement',
  LETTER = 'Letter',
  FILIAL = 'Filial',
  PHONE = 'Phone'
}

export type Inputs = {
  [EFormInps.USERNAME]: EFormInps.USERNAME
  [EFormInps.EMAIL]: EFormInps.EMAIL
  [EFormInps.PHONE]: EFormInps.PHONE
  [EFormInps.AGREEMENT]: EFormInps.AGREEMENT
  [EFormInps.LETTER]: EFormInps.LETTER
  [EFormInps.FILIAL]: EFormInps.FILIAL
}

type FormDataT = {
  username: string
  email: string
  phone: string
  text?: string
  filial?: string
}
type ModalFormT = {
  formId: string
  filialOrText: 'filial' | 'text'
  onSetStep?: (isSuccess: boolean) => void
  formType: ModalTypeFormT
}
export const ModalForm: React.FC<ModalFormT> = ({ formId, filialOrText, onSetStep, formType }) => {
  // @ts-ignore
  const params = new Proxy(new URLSearchParams(window.location.search), {
  // @ts-ignore
    get: (searchParams, prop) => searchParams.get(prop),
  });
// Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
  // @ts-ignore
  const utmContent = params.utm_content;
  // @ts-ignore
  const utmSource = params.utm_source;
  // @ts-ignore
  const utmCampaign = params.utm_campaign;
  // @ts-ignore
  const utmMedium = params.utm_medium;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({ mode: 'onTouched' })
  const { cartList } = useAppSelector(state => state.cart)
  const dispatch = useAppDispatch()
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const requestBody = {
      data: {
        letter: data[EFormInps.LETTER] ? data[EFormInps.LETTER].trim() : '',
        fio: data[EFormInps.USERNAME].trim(),
        phone: data[EFormInps.PHONE].trim(),
        email: data[EFormInps.EMAIL].trim(),
        type: formType,
        items: cartList,
      }
    }
    if(!!data[EFormInps.FILIAL]) {
      // @ts-ignore
      requestBody.data.filial = data[EFormInps.FILIAL]
    }
    // @ts-ignore
    if(utmContent) requestBody.data.utmContent = utmContent
    // @ts-ignore
    if(utmSource) requestBody.data.utmSource = utmSource
    // @ts-ignore
    if(utmCampaign) requestBody.data.utmCampaign = utmCampaign
    // @ts-ignore
    if(utmMedium) requestBody.data.utmMedium = utmMedium


    api.post(EApi.forms, requestBody)
      .then((data) => {
        if (onSetStep) onSetStep(true)
        if(formType === 'ORDER') {
          dispatch(clearCart())
          ymPlacedAnOrder()
        } else if(formType === 'BECOME_PARTNER') {
          ymSubmitPartnership()
        } else if(formType === 'CALCULATION') {
          ymNeedCalculation()
        }
      })
      .catch(err => {
        if (onSetStep) onSetStep(false)
      })
  }

  return (

    <ModalFormWrapper id={formId} onSubmit={handleSubmit(onSubmit)}>

      <FormInput
        register={register(EFormInps.USERNAME, {
          required: true,
        })}
        type={'text'}
        label={'как вас зовут?'}
        errors={errors}
        name={EFormInps.USERNAME}
        placeholder={'Иван Иванов'}

      />
      <FormInput
        register={register(EFormInps.EMAIL, {
          required: true,
          pattern: {
            value:
              /^[a-z0-9\u007F-\uffff!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9\u007F-\uffff!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/,
            message: 'Некорректный email'
          }
        })}
        type={'email'}
        label={'ваша почта'}
        errors={errors}
        name={EFormInps.EMAIL}
        placeholder={'@mail.ru'}

      />

      <FormInput
        register={register(EFormInps.PHONE, {
          required: true,
          validate: (value) =>
            value.length === 16 ? true : 'Неполный номер',
          onChange: (e) => {
            // @ts-ignore
            setValue('Phone', formatPhoneNumber(e.target.value))
          },
        })}
        type={'tel'}
        label={'Ваш телефон'}
        errors={errors}
        name={EFormInps.PHONE}
        placeholder={'8 (999) 999-9999'}

      />


      {filialOrText === 'text' &&
        (<FormTextarea
          register={register(EFormInps.LETTER, {
          })}
          type={'email'}
          label={'Сопроводительное письмо'}
          errors={errors}
          name={EFormInps.LETTER}
          placeholder={'Введите текст'}

        />)
      }
      {filialOrText === 'filial' &&
        (<FormSelect
          register={register}
          label={'Выберите филиал'}
          errors={errors}
          name={EFormInps.FILIAL}
        />)
      }

      <FormCheckbox
        register={register(EFormInps.AGREEMENT, {
          required: true,
        })}
        type={'checkbox'}
        label={'Я даю согласие на обработку моих персональных данных'}
        errors={errors}
        name={EFormInps.AGREEMENT}
      />

    </ModalFormWrapper>
  );
};

