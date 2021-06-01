import { Supermarket } from '../type';

const lidlPages: string[] = [
  'https://www.lidl.at/angebote',
  'https://www.lidl.at/sortimente/neu-bei-lidl-oesterreich',
];

const lidlSelectors = {
  titles: '.product__text .product__title',
  quantity: '.pricebox__basic-quantity',
  prices: '.pricebox__price',
  images: '.product__image > picture > img',
  product: '.product',
};

export const lidl: Supermarket = {
  title: 'lidl',
  pages: lidlPages,
  imagePath: './images/lidl/',
  selectors: lidlSelectors,
};

export default lidl;
