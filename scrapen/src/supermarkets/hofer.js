"use strict";
exports.__esModule = true;
exports.hofer = void 0;
var hoferPages = [
    "https://www.hofer.at/de/angebote/aktionen.html",
    // https://www.hofer.at/de/sortiment/ -> full sortiment
];
var hoferSelectors = {
    titles: "figure figcaption > h3",
    quantity: "figure figcaption div",
    prices: "figure figcaption div b",
    images: "figure > img",
    product: ".item"
};
exports.hofer = {
    title: "hofer",
    pages: hoferPages,
    imagePath: "./images/hofer/",
    selectors: hoferSelectors
};
exports["default"] = exports.hofer;
