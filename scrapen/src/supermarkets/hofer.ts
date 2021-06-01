import { Supermarket } from '../type';

const hoferPages = [
  'https://www.hofer.at/de/angebote/aktionen.html',
  // https://www.hofer.at/de/sortiment/ -> full sortiment
];

const hoferSelectors = {
  titles: 'figure figcaption > h3',
  quantity: 'figure figcaption div',
  prices: 'figure figcaption div b',
  images: 'figure > img',
  product: '.item',
};

export const hofer: Supermarket = {
  title: 'hofer',
  pages: hoferPages,
  imagePath: './images/hofer/',
  selectors: hoferSelectors,
};

export default hofer;
