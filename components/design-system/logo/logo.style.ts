import styled from "@emotion/styled";
import { Logo } from "../../../assets";
import { Colors, getCurrentFontSizeStyle, getCurrentFontStyle } from "../../../styles";

type LogoWrapperT = {
  size: 'footer' | 'header'
  logoIsBlack?: boolean
  isPhone?: boolean
  isOpen?: boolean
  addStyleIf?: boolean
}

export const LogoWrapper = styled.a<LogoWrapperT >`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${props => props.color};
  
  max-width: ${props => props.size === 'footer' ? '144px' : ''}
  ${props => props.size === 'footer' ?

          getCurrentFontSizeStyle('main') :
          getCurrentFontStyle('middle')};

  transform: ${props => props.size === 'footer' ? 'translateX(-8px)' : ''};

  @media screen and (min-width: 1920px) {
    font-size: ${({size}) => size === 'footer' && '48px'};
    font-size: ${({addStyleIf}) => addStyleIf && '48px'};
    font-size: ${({size}) => size === 'header' && '32px'};
  }
  @media screen and (max-width: 600px) {
    transform: ${props => props.size === 'footer' ? 'translateX(-4px)' : ''};
  }

  span {
    color: ${props => props.size === 'footer' ? `${Colors.black}` : ''};
  
  }

  @media screen and (max-width: 600px) {

    svg, path {
      width: ${props => props.size === 'footer' ? '52px' : ''};
      height: ${props => props.size === 'footer' ? 'fit-content' : ''};
      align-items: ${props => props.size === 'footer' ? 'start' : ''};
    }
  }
  color: ${({ size, logoIsBlack }) => size === 'header' && logoIsBlack ? '#000' : '#fff'};

  justify-content: ${props => props.size === 'header' ? 'center' : ''};


  i {
    font-weight: 700;
    font-style: italic;
  }
  font-weight: 700;
`;

export const LogoIcon = styled(Logo)`

  //width: 100%;
  height: 100%;

  width: ${props => props.size === 'footer' ? '120px' : '52px'};

  svg {
    width: ${props => props.size === 'footer' ? '120px' : '52px'};
  }

`;






