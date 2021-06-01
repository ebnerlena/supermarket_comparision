"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
/* eslint-disable consistent-return */
var playwright_1 = require("playwright");
var fs_1 = require("fs");
var index_1 = require("./supermarkets/index");
var data = {};
var productCnt = 0;
var scrapeSupermarketPage = function (_a) {
    var supermarketLabel = _a.supermarketLabel, url = _a.url, selectors = _a.selectors;
    return __awaiter(void 0, void 0, void 0, function () {
        var browser, page, allProducts, productsOffset;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, playwright_1.chromium.launch({
                        headless: true
                    })];
                case 1:
                    browser = _b.sent();
                    return [4 /*yield*/, browser.newPage()];
                case 2:
                    page = _b.sent();
                    return [4 /*yield*/, page.goto(url)];
                case 3:
                    _b.sent();
                    return [4 /*yield*/, page.waitForTimeout(5000)];
                case 4:
                    _b.sent();
                    return [4 /*yield*/, page.$$eval(selectors.product, function (products, object) {
                            var supermarketSelector = object.selectors;
                            return products.map(function (product) {
                                var singleProduct = {
                                    id: 0,
                                    title: '',
                                    quantity: '',
                                    price: 0,
                                    image: '',
                                    supermarket: ''
                                };
                                var titles = product.querySelectorAll(supermarketSelector.titles);
                                var text = '';
                                titles.forEach(function (title) {
                                    text = title.innerText.toLowerCase().trim();
                                    if (text !== 'spar' && !!text) {
                                        singleProduct.title = (singleProduct.title === '')
                                            ? title.innerText
                                            : singleProduct.title += " " + title.innerText;
                                    }
                                });
                                // for hofer site - for filialfinder and flugblätter item
                                if (singleProduct.title === '')
                                    return;
                                var price = product.querySelector(selectors.prices);
                                text = price === null || price === void 0 ? void 0 : price.innerText;
                                singleProduct.price = 0; // (text) || '0€';
                                if (supermarketLabel === 'hofer') {
                                    var possibleQuantityFields = product.querySelectorAll(supermarketSelector.quantity);
                                    possibleQuantityFields.forEach(function (field) {
                                        if (field.innerText.includes('per'))
                                            singleProduct.quantity = field.innerText.trim();
                                    });
                                }
                                else {
                                    var quantity = product.querySelector(supermarketSelector.quantity);
                                    text = quantity === null || quantity === void 0 ? void 0 : quantity.innerText.toLowerCase().trim();
                                    singleProduct.quantity = (text) || '';
                                }
                                var image = product.querySelector(supermarketSelector.images);
                                singleProduct.image = (image === null || image === void 0 ? void 0 : image.src) ? image === null || image === void 0 ? void 0 : image.src : '';
                                return singleProduct;
                            });
                        }, { selectors: selectors, supermarketLabel: supermarketLabel })];
                case 5:
                    allProducts = _b.sent();
                    return [4 /*yield*/, browser.close()];
                case 6:
                    _b.sent();
                    productsOffset = productCnt;
                    allProducts.forEach(function (product, index) {
                        if (product) {
                            data[(productsOffset + index)] = {
                                id: (productsOffset + index),
                                title: product.title,
                                price: product.price,
                                supermarket: supermarketLabel,
                                quantity: product.quantity,
                                image: product.image
                            };
                            productCnt++;
                        }
                    });
                    return [2 /*return*/];
            }
        });
    });
};
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var i, supermarket, finalProducts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < index_1.supermarkets.length)) return [3 /*break*/, 4];
                supermarket = index_1.supermarkets[i];
                // supermarket.pages foreach
                return [4 /*yield*/, scrapeSupermarketPage({
                        url: supermarket.pages[0],
                        supermarketLabel: supermarket.title,
                        selectors: supermarket.selectors
                    })];
            case 2:
                // supermarket.pages foreach
                _a.sent();
                _a.label = 3;
            case 3:
                i++;
                return [3 /*break*/, 1];
            case 4:
                finalProducts = JSON.stringify(data);
                fs_1.writeFileSync('./products.json', finalProducts);
                return [2 /*return*/];
        }
    });
}); })();
