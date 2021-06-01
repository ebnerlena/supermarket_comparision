"use strict";
exports.__esModule = true;
exports.lidl = void 0;
var lidlPages = [
    'https://www.lidl.at/angebote',
    'https://www.lidl.at/sortimente/neu-bei-lidl-oesterreich',
];
var lidlSelectors = {
    titles: '.product__text .product__title',
    quantity: '.pricebox__basic-quantity',
    prices: '.pricebox__price',
    images: '.product__image > picture > img',
    product: '.product'
};
exports.lidl = {
    title: 'lidl',
    pages: lidlPages,
    imagePath: './images/lidl/',
    selectors: lidlSelectors
};
exports["default"] = exports.lidl;
