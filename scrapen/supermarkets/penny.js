"use strict";
exports.__esModule = true;
exports.penny = void 0;
var pennyPages = [
    'https://www.penny.at/kategorie/alle-angebote-99000000',
    'https://www.penny.at/kategorie/alle-angebote-99000000?page=2',
    'https://www.penny.at/kategorie/alle-angebote-99000000?page=3',
    'https://www.penny.at/kategorie/alle-angebote-99000000?page=4',
    'https://www.penny.at/kategorie/alle-angebote-99000000?page=5',
    'https://www.penny.at/kategorie/alle-angebote-99000000?page=6',
    'https://www.penny.at/kategorie/alle-angebote-99000000?page=7',
    'https://www.penny.at/kategorie/alle-angebote-99000000?page=8',
    'https://www.penny.at/kategorie/alle-angebote-99000000?page=9',
    'https://www.penny.at/kategorie/alle-angebote-99000000?page=10',
    'https://www.penny.at/kategorie/alle-angebote-99000000?page=11',
    'https://www.penny.at/kategorie/alle-angebote-99000000?page=12',
    'https://www.penny.at/kategorie/alle-angebote-99000000?page=13',
    'https://www.penny.at/kategorie/alle-angebote-99000000?page=14',
    'https://www.penny.at/kategorie/alle-angebote-99000000?page=15',
    'https://www.penny.at/kategorie/alle-angebote-99000000?page=16',
    'https://www.penny.at/kategorie/alle-angebote-99000000?page=17',
    'https://www.penny.at/kategorie/alle-angebote-99000000?page=18',
];
var pennySelectors = {
    titles: '.ws-product-tile__info h1.ws-product-title > span',
    quantity: '.ws-product-description > div.caption.mt-2:first-child',
    prices: '.ws-product-price .ws-product-price-amount > span',
    images: '.ws-product-tile-image__picture--loaded',
    product: '.ws-product-item-base > div'
};
exports.penny = {
    title: 'penny',
    pages: pennyPages,
    imagePath: './images/penny/',
    selectors: pennySelectors
};
exports["default"] = exports.penny;
