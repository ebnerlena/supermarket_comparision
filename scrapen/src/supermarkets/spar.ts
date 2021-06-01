import { Supermarket } from "../type";

const sparPages = [
  "https://www.interspar.at/shop/lebensmittel/sales/F1/", // gemüse obst
  "https://www.interspar.at/shop/lebensmittel/sales/F2/", // kühlregal
  "https://www.interspar.at/shop/lebensmittel/sales/F3/", // weils wurscht ist
  "https://www.interspar.at/shop/lebensmittel/sales/F4/", // vorrat muss sein
  "https://www.interspar.at/shop/lebensmittel/sales/F5/", // knabbereien
  "https://www.interspar.at/shop/lebensmittel/sales/F6/", // brot
  "https://www.interspar.at/shop/lebensmittel/sales/F7/", // drinks
  "https://www.interspar.at/shop/lebensmittel/sales/F8/", // tiefkühlzeugs
];

const sparSelectors = {
  titles: ".productInfo .productTitle > a",
  quantity: ".productInfo .productSummary > a",
  prices: ".productBoxInfo .productBoxInfoPrice .actualPriceContainer",
  images: ".productBoxImage > a > img",
  product: ".productBox",
};

export const spar: Supermarket = {
  title: "spar",
  pages: sparPages,
  imagePath: "./images/spar/",
  selectors: sparSelectors,
};

export default spar;
