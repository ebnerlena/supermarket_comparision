const { Scraper, Root, DownloadContent, OpenLinks, CollectContent } = require('nodejs-web-scraper');
const fs = require('fs');

(async () => {

    const config = {
        baseSiteUrl: `https://www.penny.at/kategorie/alle-angebote-99000000`,
        startUrl: `https://www.penny.at/kategorie/alle-angebote-99000000`,
        filePath: './images/penny/',
        concurrency: 5,
        maxRetries: 10,    
        delay: 500,
        logPath: './logs/penny/'
    }

    const scraper = new Scraper(config);

    const penny = new Root({ pagination: { queryString: 'page', begin: 1, end: 10 } });
 
    const image = new DownloadContent('.ws-product-tile-image__picture--loaded', { name: 'image' });

    const title = new CollectContent('.pb-3 .ws-product-tile__info h1.ws-product-title > span', { name: 'title' });

    const price = new CollectContent('.pb-3 .ws-product-price .ws-product-price-amount > span', { name: 'price' });

    const amount = new CollectContent('.pb-3 .ws-product-description > div.caption.mt-2:first-child', { name: 'amount' });


    penny.addOperation(image);
    penny.addOperation(title);
    penny.addOperation(price);
    penny.addOperation(amount);


    await scraper.scrape(penny)
    const data = penny.getData()
    fs.writeFile('./data/penny-data.json', JSON.stringify(data), () => { })

})();    

