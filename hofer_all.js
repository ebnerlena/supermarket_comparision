const { Scraper, Root, DownloadContent, OpenLinks, CollectContent } = require('nodejs-web-scraper');
const fs = require('fs');

(async () => {

    const pages = [
    ];
   
    const getPageObject = (pageObject) => {                  
        pages.push(pageObject)
    } 

    const config = {
        baseSiteUrl: `https://www.hofer.at/de/sortiment/`,
        startUrl: `https://www.hofer.at/de/sortiment/`,
        filePath: './images/hofer_all/',
        concurrency: 10,
        maxRetries: 3,     
        logPath: './logs/hofer_all/'
    }

    const scraper = new Scraper(config);

    const hofer = new Root(); 

    const sortimentPages = new OpenLinks('.component_gallery .wrapper .item figure a', { name: 'Sortiment Page', getPageObject });

    const sortimentSubPages = new OpenLinks('.component_gallery .wrapper .item figure a', { name: 'Sortiment Page', getPageObject });
 
    const image = new DownloadContent('div.plp_product__img img', { name: 'image' });

    const title = new CollectContent('div.plp_product a h2.product-title', { name: 'title' });

    const price = new CollectContent('div.plp_product__content .retail_price span', { name: 'price' });

    const amount = new CollectContent('div.plp_product__content div div span.additional-product-info', { name: 'amount' });

        hofer.addOperation(sortimentPages);
        sortimentPages.addOperation(sortimentSubPages); //if again divided into categories
        sortimentPages.addOperation(image);
        sortimentPages.addOperation(title);
        sortimentPages.addOperation(price);
        sortimentPages.addOperation(amount);

        sortimentSubPages.addOperation(image);
        sortimentSubPages.addOperation(title);
        sortimentSubPages.addOperation(price);
        sortimentSubPages.addOperation(amount);


    await scraper.scrape(hofer);

    const data = hofer.getData()
    fs.writeFile('./data/hofer_all.json', JSON.stringify(data), () => { })

    fs.writeFile('./data/hofer_pages.json', JSON.stringify(pages), () => { })

})();    