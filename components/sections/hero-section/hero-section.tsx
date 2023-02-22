import React, { useContext } from 'react';
import {
  HeroDecorBadge,
  HeroDecorImg, HeroDecorImgInner,
  HeroDecorWrapper,
  HeroSectionWrapper, ThirdBlockSubTitle,
  ThirdBlockSubTitle2, ThirdBlockTitle
} from "./hero-section.style";
import { Star } from "../../../assets";
import Image from "next/image";
import { PropsContext } from "../../../store/propsContext/context";
import { ENavLinks } from "../../common/nav-header/nav-header";
import { addressSite } from "../../../api/endpoints";
import { Logo } from "../../design-system";

export const HeroSection = ({}) => {
  const { hero } = useContext(PropsContext)
  const {thirdBlockTitle,thirdBlockSubTitle2, thirdBlockSubTitle, showRoomImage } = hero
  return (
    <HeroSectionWrapper id={ENavLinks.ABOUT}>
      <HeroDecorWrapper>
        <HeroDecorImg>
          <HeroDecorImgInner>
            <Image
              src={`${showRoomImage ? addressSite + showRoomImage.attributes.url : '/emptySkeleton.jpg'}`}
              layout={"fill"}
              objectFit={"cover"}
              alt='Шоу-рум'/>
          </HeroDecorImgInner>
          <HeroDecorBadge>
            <Star/>
            <p>Шоурум со всем
              ассортиментом</p>
          </HeroDecorBadge>
        </HeroDecorImg>

      </HeroDecorWrapper>

      <Logo className={'footerLogo'} textColor={"black"} size={'footer'} addStyleIf={true} >
        <span>Тепло<i>Кварц</i></span>
      </Logo>
      <ThirdBlockTitle dangerouslySetInnerHTML={{__html: thirdBlockTitle}}/>
      <ThirdBlockSubTitle dangerouslySetInnerHTML={{__html: thirdBlockSubTitle}}/>
      <ThirdBlockSubTitle2 dangerouslySetInnerHTML={{__html: thirdBlockSubTitle2}}/>
    </HeroSectionWrapper>
  );
};

