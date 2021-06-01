"use strict";
exports.__esModule = true;
exports.spar = void 0;
var sparPages = [
    'https://www.interspar.at/shop/lebensmittel/sales/F1/',
    'https://www.interspar.at/shop/lebensmittel/sales/F2/',
    'https://www.interspar.at/shop/lebensmittel/sales/F3/',
    'https://www.interspar.at/shop/lebensmittel/sales/F4/',
    'https://www.interspar.at/shop/lebensmittel/sales/F5/',
    'https://www.interspar.at/shop/lebensmittel/sales/F6/',
    'https://www.interspar.at/shop/lebensmittel/sales/F7/',
    'https://www.interspar.at/shop/lebensmittel/sales/F8/', // tiefkühlzeugs
];
var sparSelectors = {
    titles: '.productInfo .productTitle > a',
    quantity: '.productInfo .productSummary > a',
    prices: '.productBoxInfo .productBoxInfoPrice .actualPriceContainer',
    images: '.productBoxImage > a > img',
    product: '.productBox'
};
exports.spar = {
    title: 'spar',
    pages: sparPages,
    imagePath: './images/spar/',
    selectors: sparSelectors
};
exports["default"] = exports.spar;
