/* eslint-disable consistent-return */
import { chromium } from "playwright";
import { writeFileSync } from "fs";
import supermarkets from "./supermarkets/index";
import { Selectors } from "./type";

interface Product {
  id: number;
  price: number;
  title: string;
  quantity: string;
  image: string;
  supermarket: string;
}

const data: Product[] = [];
let productCnt = 0;

const scrapeSupermarketPage = async ({ supermarketLabel, url, selectors }) => {
  const browser = await chromium.launch({
    headless: true,
  });

  const page = await browser.newPage();

  await page.goto(url);
  await page.waitForTimeout(5000);

  const allProducts = await page.$$eval(
    selectors.product,
    (products, object) => {
      const supermarketSelector: Selectors = object.selectors;

      return products.map((product) => {
        const singleProduct: Product = {
          id: 0,
          title: "",
          quantity: "",
          price: 0,
          image: "",
          supermarket: "",
        };

        const titles = product.querySelectorAll(supermarketSelector.titles);
        let text: string;

        titles.forEach((title: HTMLElement) => {
          text = title.innerText.toLowerCase().trim();
          if (text !== "spar" && !!text) {
            singleProduct.title =
              singleProduct.title === ""
                ? title.innerText
                : (singleProduct.title += ` ${title.innerText}`);
          }
        });

        // for hofer site - for filialfinder and flugblätter item
        if (singleProduct.title === "") return;

        const price = product.querySelector(supermarketSelector.prices);
        let nr: number;
        text = price?.innerText
          .trim()
          .replace(/\g+|\,/, ".")
          .replace(/\€+|\-/, "");
        nr = text ? parseFloat(text) : 0;
        singleProduct.price = nr;

        if (object.supermarketLabel === "hofer") {
          const possibleQuantityFields = product.querySelectorAll(
            supermarketSelector.quantity
          );
          possibleQuantityFields.forEach((field: HTMLElement) => {
            if (field.innerText.includes("per"))
              singleProduct.quantity = field.innerText.trim();
          });
        } else {
          const quantity = product.querySelector(supermarketSelector.quantity);
          text = quantity?.innerText.toLowerCase().trim();
          singleProduct.quantity = text || "";
        }

        const image = product.querySelector(supermarketSelector.images);
        singleProduct.image = image?.src ? image?.src : "";

        return singleProduct;
      });
    },
    { selectors, supermarketLabel }
  );

  await browser.close();

  // save products
  const productsOffset = productCnt;
  allProducts.forEach((product, index) => {
    if (product) {
      data.push({
        id: productsOffset + index,
        title: product.title,
        price: product.price,
        supermarket: supermarketLabel,
        quantity: product.quantity,
        image: product.image,
      });
      productCnt++;
    }
  });
};

(async () => {
  for (let i = 0; i < supermarkets.length; i++) {
    const supermarket = supermarkets[i];

    for (let j = 0; j < supermarket.pages.length; j++) {
      await scrapeSupermarketPage({
        url: supermarket.pages[j],
        supermarketLabel: supermarket.title,
        selectors: supermarket.selectors,
      });
    }
  }

  const finalProducts = JSON.stringify(data);
  writeFileSync("./public/products.json", finalProducts);
})();
