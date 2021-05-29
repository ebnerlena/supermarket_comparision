const { Scraper, Root, DownloadContent, OpenLinks, CollectContent } = require('nodejs-web-scraper');
const fs = require('fs');

(async () => {

    // const pages = [
    //     "https://www.interspar.at/shop/lebensmittel/sales/F1/", //von
    //     "https://www.interspar.at/shop/lebensmittel/sales/F14/" //bis
    // ];

    const config = {
        baseSiteUrl: `https://www.interspar.at/shop/lebensmittel/obst-gemuese/c/F1/`,
        startUrl: `https://www.interspar.at/shop/lebensmittel/obst-gemuese/c/F1/`,
        filePath: './images/interspar-obst/',
        concurrency: 5,
        maxRetries: 10,    
        logPath: './logs/interspar-obst/'
    }

    const scraper = new Scraper(config);

    const interspar = new Root();

 
    const image = new DownloadContent('.productBoxImage > a > img', { name: 'image' });

    const title = new CollectContent('.productBox .productInfo .productTitle > a', { name: 'title' });

    const price = new CollectContent('.productBox .productBoxInfo .productBoxInfoPrice .actualPriceContainer', { name: 'price' });

    const amount = new CollectContent('.productBox .productInfo .productSummary a', { name: 'amount' });


    interspar.addOperation(image);
    interspar.addOperation(title);
    interspar.addOperation(price);
    interspar.addOperation(amount);


    await scraper.scrape(interspar)
    const data = interspar.getData()
    fs.writeFile('./interspar-obst-data.json', JSON.stringify(data), () => { })

})();    

