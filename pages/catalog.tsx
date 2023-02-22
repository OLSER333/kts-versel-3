import Head from "next/head";
import type { NextPage } from "next";
import React, { useState } from "react";
import { MainContainer } from "../components/design-system";
import { Header } from "../components/common";
import { DeliverySection } from "../components/sections";
import { ProductsPreview } from "../components/sections/products-preview";
import { CalcSection } from "../components/sections/calc-section";
import { Footer } from "../components/common/footer";
import { FaqSection } from "../components/sections/faq-section";
import { ModalsSection } from "../components/sections/modals";
import { PropsContext } from "../store/propsContext/context";
import { EApi } from "../api/endpoints";
import api from "../api/httpConfig";
import { MapSection } from "../components/sections/map";
import { YMaps } from "@pbe/react-yandex-maps";
import { Info } from "../components/common/Info";

export type serverPropsT = {
  products: {
    id: number;
    attributes: {
      description: string;
      isNew: boolean;
      isSale: boolean;
      name: string;
      originalPrice: number;
      price: number;
      showOnMain: boolean;
    };
  }[];
  landing: any;
  categories: any;
};

const Catalog: NextPage = (props: any) => {
  const [hideBtnFixed, setHideBtnFixed] = useState(false);
  const handleHideFixed = (hideTo) => {
    setHideBtnFixed(hideTo);
  };

  return (
    <div>
      <Head>
        <title>{props.seo.ogTitle}</title>
        <meta name="description" content={props.seo.ogDescription} />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          href="https://teplokvarc.ru/favicon-32x32.png"
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href="https://teplokvarc.ru/favicon-16x16.png"
          sizes="16x16"
        />
        <meta property="og:title" content={`${props.seo.ogTitle}`} />
        <meta property="og:description" content={`${props.seo.ogDescription}`} />
        <meta property="og:image" content={`${props.seo.ogImage.data.attributes.url}`} />
        <meta property="og:site_name" content="ТеплоКварц" />
        <meta property="og:locale" content="ru_RU" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://teplokvarc.ru/" />
        <meta name="yandex-verification" content="f95be001447f3aa1" />
      </Head>

      <PropsContext.Provider value={props}>
        <Header isCatalogPage={true} />
        {/*// @ts-ignore*/}
        <MainContainer isCatalogPage={true}>
          {/*// @ts-ignore*/}
          <ProductsPreview isCatalogPage={true} />
          <CalcSection onNeedHide={(hideTo) => handleHideFixed(hideTo)} />
          <Info>
            <DeliverySection />
            <FaqSection />
          </Info>
          <YMaps>
            <MapSection filialies={props.filialies} />
          </YMaps>
          <ModalsSection />
          <Footer />
        </MainContainer>
      </PropsContext.Provider>
    </div>
  );
};
export default Catalog;

export async function getServerSideProps() {
  try {
    const requests = [
      api.get(EApi.productsOnMain),
      api.get(EApi.lending),
      api.get(EApi.categories),
      api.get(EApi.filiales),
    ];
    const response = await Promise.all(requests);
    return {
      props: {
        // @ts-ignore
        products: response[0].data.data,
        // @ts-ignore
        faq: response[1].data.data.attributes.faq,
        landing: response[1].data.data.attributes,
        topslider: response[1].data.data.attributes.topslider,
        orderCards: response[1].data.data.attributes.orderProcessTiles,
        advantage: {
          secondBlockTitle: response[1].data.data.attributes.secondBlockTitle,
          secondBlockDescription: response[1].data.data.attributes.secondBlockDescription,
          cards: response[1].data.data.attributes.qualitytiles,
        },
        hero: {
          thirdBlockTitle: response[1].data.data.attributes.thirdBlockTitle,
          thirdBlockSubTitle: response[1].data.data.attributes.thirdBlockSubTitle,
          thirdBlockSubTitle2: response[1].data.data.attributes.thirdBlockSubTitle2,
          showRoomImage: response[1].data.data.attributes.showRoomImage.data,
        },
        // @ts-ignore
        categories: response[2].data.data,
        // @ts-ignore
        filialies: response[3].data.data,
        seo: {
          ogTitle: response[1].data.data.attributes.ogTitle,
          ogDescription: response[1].data.data.attributes.ogDescription,
          ogImage: response[1].data.data.attributes.ogImage,
        },
        footer: {
          phone: response[1].data.data.attributes.phone,
          email: response[1].data.data.attributes.email,
        },

        socialLinks: response[1].data.data.attributes.socialNetworks,
      },
    };
  } catch (e) {
    console.log("inError", e);
  }
  return {
    props: {},
  };
}
