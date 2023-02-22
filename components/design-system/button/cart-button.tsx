import { CartBtn, CartOrderCount } from "./button.style";
import { useMatchQuery } from "../../../utils";
import { Breakpoints } from "../../../styles";
import cartMobile from '../../../assets/images/cartMb.png'
import { CartBrnMbWrapper, CartBtnMobileIcon } from "../../common/header/header.style";
import Image from 'next/image'
type CartBtnT = {
  children: string
  count?: number
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;

}
export const CartButton: React.FC<CartBtnT> = ({ children, count, onClick }) => {
  return (
    <>
      <CartBtn onClick={onClick}>
        <>
          { children}
          {count !== 0 ? <CartOrderCount key={count}>{count}</CartOrderCount> : null}
        </>
      </CartBtn>


        <CartBrnMbWrapper onClick={onClick}>
          <>
            <CartBtnMobileIcon>
              <svg width="28" height="30" viewBox="0 0 28 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.20854 12.1896C2.09671 11.0155 3.02004 10 4.19953 10H23.8005C24.98 10 25.9033 11.0154 25.7915 12.1896L24.4581 26.1896C24.3604 27.2161 23.4983 28 22.4671 28H5.53286C4.50174 28 3.63963 27.2161 3.54187 26.1896L2.20854 12.1896Z" stroke="white" stroke-width="3"/>
                <path d="M8 6C8 3.79086 9.79086 2 12 2H16C18.2091 2 20 3.79086 20 6V10H8V6Z" stroke="white" stroke-width="3"/>
              </svg>
            </CartBtnMobileIcon>
            {count !== 0 ? <CartOrderCount key={count}>{count}</CartOrderCount> : null}
          </>
        </CartBrnMbWrapper>

    </>

  );
};

