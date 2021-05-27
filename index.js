const { Scraper, Root, DownloadContent, OpenLinks, CollectContent } = require('nodejs-web-scraper');
const fs = require('fs');

(async () => {

    const config = {
        baseSiteUrl: `https://www.hofer.at/de/sortiment/neu-im-sortiment.html`,
        startUrl: `https://www.hofer.at/de/sortiment/neu-im-sortiment.html`,
        filePath: './images/',
        concurrency: 10,//Maximum concurrent jobs. More than 10 is not recommended.Default is 3.
        maxRetries: 3,//The scraper will try to repeat a failed request few times(excluding 404). Default is 5.       
        logPath: './logs/'//Highly recommended: Creates a friendly JSON for each operation object, with all the relevant data. 
    }
    

    const scraper = new Scraper(config);//Create a new Scraper instance, and pass config to it.

    const root = new Root();//The root object fetches the startUrl, and starts the process.  
 
    const image = new DownloadContent('div.plp_product__img img', { name: 'image' });//Downloads images.

    const title = new CollectContent('div.plp_product a h2.product-title', { name: 'title' });//"Collects" the text from each H1 element.

    const price = new CollectContent('div.plp_product__content .retail_price span', { name: 'price' });//"Collects" the the article body.

    const amount = new CollectContent('div.plp_product__content div div span.additional-product-info', { name: 'amount' });//"Collects" the the article body.

    //root.addOperation(article);//Then we create a scraping "tree":
      //root.addOperation(image);
       root.addOperation(image);
       root.addOperation(title);
       root.addOperation(price);
       root.addOperation(amount);

    await scraper.scrape(root);

    const data = root.getData()
    fs.writeFile('./data.json', JSON.stringify(data), () => { })//Will produce a formatted JSON containing all article pages and their selected data.

})();    