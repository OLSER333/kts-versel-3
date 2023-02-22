// @ts-nocheck
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  BgImg,
  BgSectionWrapper,
  CustomSwiper,
  Overlay,
  Stub,
  SwiperText,
  SwiperTextWrapper,
} from "./bg-section.style";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper";
import { PropsContext } from "../../../store/propsContext/context";
import { addressSite } from "../../../api/endpoints";
import { Breakpoints } from "../../../styles";

export const BgSection = () => {
  const overlay = useRef();
  const [isActive, setIsActive] = useState(false);
  // const isPhone = useMatchQuery(`(max-width: ${Breakpoints.phone}`)
  // const isPhone = window.matchMedia(`(max-width: ${Breakpoints.phone}`).matches // not dynamic
  const { topslider } = useContext(PropsContext);



  useEffect(() => {
    setTimeout(() => {
      setIsActive(true);
    }, 0);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const opacity =
        -document.documentElement.getBoundingClientRect().top /
        document.documentElement.clientHeight;
      // @ts-ignore
      overlay.current.style.background = `rgba(234, 234, 234, ${opacity})`;
    };

    document.addEventListener("scroll", onScroll);

    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  });

  const getPath = (backgroundImage, mobileBackgroundImage) => {
    console.log('123123123', backgroundImage, mobileBackgroundImage)
    if(window.matchMedia('(max-width: 768px)').matches) { // isMobile
      if(mobileBackgroundImage.data) {
        return`${
          mobileBackgroundImage.data
            ? addressSite + mobileBackgroundImage.data.attributes.url
            : "/stubSliderMobile.jpeg"
        }`
      } else {
        return`${
          backgroundImage.data
            ? addressSite + backgroundImage.data.attributes.url
            : "/stubSliderMobile.jpeg"
        }`
      }

    } else { // pc
      return`${
        backgroundImage.data
          ? addressSite + backgroundImage.data.attributes.url
          : "/stubSliderMobile.jpeg"
      }`
    }
  }

  return (
    <>
      <BgSectionWrapper isActive={isActive}>
        <CustomSwiper
          modules={[Autoplay, Pagination]}
          autoplay={{
            delay: 33000,
            pauseOnMouseEnter: false,
            disableOnInteraction: false,
            reverseDirection: true,
          }}
          loop
          slidesPerView={"auto"}
          pagination={{
            clickable: true,
          }}
        >
          {topslider.map(({ backgroundImage, mobileBackgroundImage, corner, id, text }, idx) => {
            const htmlText = text
              .split(" ")
              .map((word, i) => `<div class="title-text">${word}</div>`)
              .join("");
            console.log(htmlText);
            return (
              <>
                {
                  <SwiperSlide className="pcStubSwiper" key={id}>
                    <>
                      <BgImg
                        layout={"fill"}
                        priority={idx === 0}
                        objectFit={"cover"}
                        src={getPath(backgroundImage, mobileBackgroundImage)}
                        alt={text}
                      />
                      <SwiperTextWrapper>
                        <SwiperText
                          corner={corner}
                          dangerouslySetInnerHTML={{ __html: htmlText }}
                        />
                      </SwiperTextWrapper>
                    </>
                  </SwiperSlide>
                }

                {/*// временная заглушка для max-width 768 */}
                {/*{(*/}
                {/*  <SwiperSlide key={5555555} className={"mobileStubSwiper"}>*/}
                {/*    <>*/}
                {/*      <BgImg*/}
                {/*        layout={"fill"}*/}
                {/*        priority={idx === 0}*/}
                {/*        objectFit={"cover"}*/}
                {/*        src={getPath}*/}
                {/*        alt={text}*/}
                {/*      />*/}
                {/*      <SwiperTextWrapper>*/}
                {/*        <SwiperText*/}
                {/*          corner={corner}*/}
                {/*          dangerouslySetInnerHTML={{ __html: htmlText }}*/}
                {/*        />*/}
                {/*      </SwiperTextWrapper>*/}
                {/*    </>*/}
                {/*  </SwiperSlide>*/}
                {/*)}*/}
              </>
            );
          })}
        </CustomSwiper>
        <Overlay ref={overlay} />
      </BgSectionWrapper>
      <Stub />
    </>
  );
};
