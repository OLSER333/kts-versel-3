import React, { useContext, useEffect, useState } from 'react';
import {
  ModalCartAmountBLock, ModalCartCountAmount, ModalCartEmpty,
  ModalCartInner, ModalCartLabelAmount,
  ModalClose,
  ModalContent,
  ModalDivider,
  ModalHeader,
  ModalOverlay,
  ModalTitle,
  ModalWrapper
} from "./modal.style";
import { Close } from "../../../assets";
import { FogTranstiion } from "../../design-system/fog-transition";
import { ModalFormSend } from "../modal-form/modal-form.style";
import { getAllOrders, getAllPrice, getIsOpen } from "../../../utils";
import { Colors } from "../../../styles";
import { closeAllModals, openModal } from "../../../store/modalsSlice";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { EModalTypes, ModalTypesT } from "../../../store/types";
import { PropsContext } from "../../../store/propsContext/context";
import { CartOrder } from "../cart-order";
import { ymMovedToOrder } from "../../../utils/yandex-metrika";


type ModalT = {
  type: ModalTypesT

}
export const ModalCart: React.FC<ModalT> = ({ type }) => {
  const { modalList } = useAppSelector(state => state.modals)
  const { cartList } = useAppSelector(state => state.cart)
  const context = useContext(PropsContext)
  const dispatch = useAppDispatch()
  const [ isOpen, setIsOpen ] = useState<boolean>(getIsOpen(modalList, type))

  // useNoScroll(isOpen)
  useEffect(() => {
    setIsOpen(getIsOpen(modalList, type))
  }, [ modalList, type ])



  const [ allOrders, setAllOrders ] = useState(getAllOrders(context.products, cartList))


  const [ allPrice, setAllPrice ] = useState(getAllPrice(allOrders))


  useEffect(() => {
    setAllOrders(getAllOrders(context.products, cartList))
    setAllPrice(getAllPrice(allOrders))
  }, [ cartList, allPrice ])

  useEffect(() => {
    setAllPrice(getAllPrice(allOrders))
  }, [ allOrders ])


  return (

    <>
      <ModalOverlay isOpen={isOpen} onClick={() => dispatch(closeAllModals())}/>
      <ModalWrapper isOpen={isOpen} showTitle={true}>
        <ModalHeader showTitle={true}>
          <ModalClose onClick={() => dispatch(closeAllModals())} hoverBgColor={'white06'}>
            <Close/>
          </ModalClose>
          {/*  ModalTitle ????????, ???????? ???? ?????????????? ?????? popup ????????????*/}
          <ModalTitle color={Colors.orange}>
            <p>??????????????</p>
          </ModalTitle>
          {/*divider ???????????? ?? ??????????????*/}
        </ModalHeader>
        <ModalContent>
          <FogTranstiion direction={"top"}/>

          {allOrders.length ? (
            <>
              <ModalCartInner>
                <ModalDivider/>
                {/*@ts-ignore*/}
                {allOrders.map(({ id, attributes }, idx) => {
                  return (
                    <li key={idx}>
                      {/*// @ts-ignore*/}
                      <CartOrder id={id} attributes={attributes}/>
                      <ModalDivider/>
                    </li>
                  )
                })
                }
              </ModalCartInner>
              <ModalCartAmountBLock>
                <ModalCartLabelAmount>??????????</ModalCartLabelAmount>
                <ModalCartCountAmount>{allPrice}</ModalCartCountAmount>
              </ModalCartAmountBLock>
            </>

          ) :
            (
              <ModalCartEmpty>?????????????? ??????????</ModalCartEmpty>
            )}
          <ModalFormSend
            themeBgColor={Colors.white}
            themeColor={Colors.mainBlack}
            onClick={() => {
              dispatch(openModal(EModalTypes.CHECKOUT))
              ymMovedToOrder()
            }}
            disabled={cartList.length === 0}
          >
            ?????????????? ?? ????????????????????
          </ModalFormSend>


          <FogTranstiion direction={"bottom"}/>
        </ModalContent>

      </ModalWrapper>
    </>
  );
};

