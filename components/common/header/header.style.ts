import styled from "@emotion/styled";
import { Breakpoints, Colors, Duration, getCurrentPaddingStyle, Radiuses, ZIndex } from "../../../styles";
import { Button } from "../../design-system/button/common-button";
type HeaderWrapperT = {
  isPhone: boolean
  hasBackground: boolean
}
export const HeaderWrapper = styled.header<HeaderWrapperT>`
  position: fixed;
  right: 0;
  left: 0;
  top: 0;

  width: 100vw;
  height: 100px;
  max-width: ${Breakpoints.desktopXXLG};
  margin: 0 auto;
  
  transition: background-color ${Duration.lgHover};
  background:  ${({hasBackground}) => hasBackground ? `${Colors.back}`: ''};
  

  z-index: ${ZIndex.header};

  ${getCurrentPaddingStyle('cat', 'vertical')}
  ${getCurrentPaddingStyle('pig', 'horizontal')}
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: ${Breakpoints.tabletLG}) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: ${Breakpoints.phone}) {
    padding-right: 12px;
    padding-left: 12px;
  }
  
`;


export const CartBrnMbWrapper = styled(Button)`
  width: 56px;
  height: 56px;
  background: #000;
  position: relative;
  border-radius: 16px;
  margin-left: auto;
  @media screen and (min-width: ${Breakpoints.tabletLG}) {
    display: none;
  }
`;
export const CartBtnMobileIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  
  
`;
