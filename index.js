const { Scraper, Root, DownloadContent, OpenLinks, CollectContent } = require('nodejs-web-scraper');
const fs = require('fs');

(async () => {

    const pages = [
        // "https://www.hofer.at/de/sortiment/getraenke/alkoholfreie-getraenke.html",
        // "https://www.hofer.at/de/sortiment/getraenke/wein-und-sekt.html",
        // "https://www.hofer.at/de/sortiment/sortiment-grillen.html",
        // "https://www.hofer.at/de/sortiment/neu-im-sortiment.html"
    ];

    //pageObject will be formatted as {title,phone,images}, becuase these are the names we chose for the scraping operations below.
    const getPageObject = (pageObject, address) => {                  
        pages.push(pageObject)
    }

    const config = {
        baseSiteUrl: `https://www.hofer.at/de/sortiment/`,
        startUrl: `https://www.hofer.at/de/sortiment/`,
        filePath: './images/',
        concurrency: 10,//Maximum concurrent jobs. More than 10 is not recommended.Default is 3.
        maxRetries: 3,//The scraper will try to repeat a failed request few times(excluding 404). Default is 5.       
        logPath: './logs/'//Highly recommended: Creates a friendly JSON for each operation object, with all the relevant data. 
    }


    

    const scraper = new Scraper(config);//Create a new Scraper instance, and pass config to it.

    const hofer = new Root();//The root object fetches the startUrl, and starts the process.  

    const sortimentPages = new OpenLinks('.component_gallery .wrapper .item figure a', { name: 'Sortiment Page', getPageObject });

    const sortimentSubPages = new OpenLinks('.component_gallery .wrapper .item figure a', { name: 'Sortiment Page', getPageObject });
    //Opens every job ad, and calls the getPageObject, passing the formatted object.
 
    const image = new DownloadContent('div.plp_product__img img', { name: 'image' });//Downloads images.

    const title = new CollectContent('div.plp_product a h2.product-title', { name: 'title' });//"Collects" the text from each H1 element.

    const price = new CollectContent('div.plp_product__content .retail_price span', { name: 'price' });//"Collects" the the article body.

    const amount = new CollectContent('div.plp_product__content div div span.additional-product-info', { name: 'amount' });//"Collects" the the article body.

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
    fs.writeFile('./data.json', JSON.stringify(data), () => { })//Will produce a formatted JSON containing all article pages and their selected data.

    fs.writeFile('./pages.json', JSON.stringify(pages), () => { })//Will produce a formatted JSON containing all article pages and their selected data.

})();    