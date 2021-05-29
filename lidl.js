const { Scraper, Root, DownloadContent, OpenLinks, CollectContent } = require('nodejs-web-scraper');
const fs = require('fs');

(async () => {

    const pages = [
    ];
   
    const getPageObject = (pageObject) => {                  
        pages.push(pageObject)
    } 

    const config = {
        baseSiteUrl: `https://www.lidl.at/angebote`,
        startUrl: `https://www.lidl.at/angebote`,
        filePath: './images/lidl/',
        concurrency: 5,
        maxRetries: 10,    
        logPath: './logs/lidl/'
    }

    const condition = (node) => {      
    
       const text = node.text().trim();
       if(text === 'Sortimente'){
       // will be "opened".
           return true
       }
   } 

    const scraper = new Scraper(config);

    const lidl = new Root();

    const sortimentPages = new OpenLinks('.navigation--main .navigation__link', {condition}, { name: 'Sortiment Page', getPageObject });
 
    const image = new DownloadContent('.product .product__image > picture  img', { name: 'image' });

    const title = new CollectContent('.product .product__text .product__title', { name: 'title' });

    const price = new CollectContent('.product .product__price .pricebox .pricebox__price', { name: 'price' });

    const amount = new CollectContent('.product .product__price .pricebox .pricebox__basic-quantity', { name: 'amount' });


    lidl.addOperation(image);
    lidl.addOperation(title);
    lidl.addOperation(price);
    lidl.addOperation(amount);

    lidl.addOperation(sortimentPages);
    sortimentPages.addOperation(image);
    sortimentPages.addOperation(title);
    sortimentPages.addOperation(price);
    sortimentPages.addOperation(amount);



    await scraper.scrape(lidl)
    const data = lidl.getData()
    fs.writeFile('./lidl-data.json', JSON.stringify(data), () => { })

})();    

