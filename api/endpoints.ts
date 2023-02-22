export const baseURL = `https://teplokvarc.ru/api`;
export const addressSite = "https://teplokvarc.ru/";
export enum EApi {
  productsOnMain = `/tovaries?populate=image,attributes,kategorii`, // ?showOnMain=true
  forms = "/forms",
  lending = "/landing-content?populate=topslider,topslider.backgroundImage,topslider.mobileBackgroundImage,faq,qualitytiles,qualitytiles.icon,orderProcessTiles,orderProcessTiles.imageUrl,showRoomImage,socialNetworks,socialNetworks.networkLogo,ogImage",
  categories = "/kategoriis",
  filiales = "/filialies",
}
