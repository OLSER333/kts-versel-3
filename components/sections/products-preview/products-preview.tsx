import { ProductsPreviewWrapper } from "./products-preview.style";
import { TagList } from "../../common";
import { ProductCardList } from "../../common/product-card-list";
import { ENavLinks } from "../../common/nav-header/nav-header";
import { ToAllProductsButton } from "../../design-system/button/button.style";
import { ERoutes } from "../../../routes/routes";
import Link from "next/link";
import { HeaderText } from "../../design-system/header-text/header-text";
import { useContext, useState } from "react";
import { ProductAbout } from "../../common/product-full-info/product-full-info.style";
import { PropsContext } from "../../../store/propsContext/context";

type ProductsPreviewT = {
  isCatalogPage?: boolean
}
export const ProductsPreview: React.FC<ProductsPreviewT> = ({ isCatalogPage = false }) => {
  const { products } = useContext(PropsContext)
  const [ curFilter, setCurFilter ] = useState<number>(-1)
  const isPhone = window.matchMedia('(max-width: 600px)').matches
  const isTablet = window.matchMedia('(max-width: 1024px)').matches
  const setInitialCurrentShow = () => {
    if (isPhone) return 4
    else if (isTablet) return 8
    else if (!isPhone && !isTablet) return 12

  }

  // @ts-ignore
  const [ curShown, setCurShown ] = useState<number>(setInitialCurrentShow())
  const addCurrentShown = () => {

    if (curShown + 4 <= products.length) {
      setCurShown(prev => prev + 4)
    } else {
      setCurShown(products.length)
    }


  }


  return (
    <ProductsPreviewWrapper id={ENavLinks.CATALOG}>
      {isCatalogPage &&
          <Link href={ERoutes.LANDING} style={{ textAlign: 'center' }}>
              <ProductAbout style={{cursor: 'pointer'}} as='a'>назад</ProductAbout>
          </Link>
      }

      <HeaderText className={'productsHeader'}>{isCatalogPage ? 'Каталог' : 'Список лучших товаров'}</HeaderText>
      <TagList isCatalogPage={isCatalogPage} curFilter={curFilter} onTag={(id) => setCurFilter(id)}/>
      <ProductCardList curShown={curShown} isCatalogPage={isCatalogPage} curFilter={curFilter}/>

      {!isCatalogPage &&
          <Link href={ERoutes.CATALOG}>
              <ToAllProductsButton as='a'>Ко всем</ToAllProductsButton>
          </Link>}
      {isCatalogPage && curShown < products.length &&
          <ToAllProductsButton onClick={() => addCurrentShown()}
                               as='button'>Показать ещё</ToAllProductsButton>
      }

    </ProductsPreviewWrapper>
  );
};

