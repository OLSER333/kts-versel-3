import styled from "@emotion/styled";
import {
  applyBGHoverColors,
  Color,
  getCurrentBackgroundColor,
  getCurrentColor,
} from "../../../styles";

type SocialIconWrapperPropsT = {
  bgColor: Color;
  hoverBgColor: Color;
};
export const SocialIconWrapper = styled.a<SocialIconWrapperPropsT>`
  ${(props) => getCurrentBackgroundColor(props.bgColor)};
  &:hover {
    ${(props) => getCurrentBackgroundColor(props.hoverBgColor)};
  }

  cursor: pointer;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
  }
`;
