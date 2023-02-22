import { SocialIconWrapper } from "./social-icon.style";
import { Color } from "../../../styles";

export type SocialIconPropsT = {
  bgColor: Color
  hoverBgColor: Color
  icon: React.ReactElement
  link: string
}
export const SocialIcon: React.FC<SocialIconPropsT> = ({icon,link, ...props}) => {
  return (
    <SocialIconWrapper href={link} {...props}>
      {icon}
    </SocialIconWrapper>
  );
};

