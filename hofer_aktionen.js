const { Scraper, Root, DownloadContent, OpenLinks, CollectContent } = require('nodejs-web-scraper');
const fs = require('fs');

(async () => {

    const config = {
        baseSiteUrl: `https://www.hofer.at/de/angebote/aktionen.html`,
        startUrl: `https://www.hofer.at/de/angebote/aktionen.html`,
        filePath: './images/hofer_aktionen',
        concurrency: 10,
        maxRetries: 3,       
        logPath: './logs/hofer_aktionen/'
    }

    const condition = (node) => {                
       const text = node.text().trim();

       if(text !== "" && text.includes("per")) {
        return text
       }
       
   }  

    const scraper = new Scraper(config);

    const hofer = new Root();

    const image = new DownloadContent('div.wrapper figure > img', { name: 'image' });

    const title = new CollectContent('div.wrapper div.item figure figcaption > h3', { name: 'title' });

    const price = new CollectContent('div.wrapper .item figure figcaption div b', { name: 'price' });

    const amount = new CollectContent('div.wrapper .item figure figcaption div', {condition}, { name: 'amount' });

        hofer.addOperation(image);
        hofer.addOperation(title);
        hofer.addOperation(price);
        hofer.addOperation(amount);



    await scraper.scrape(hofer);

    const data = hofer.getData()
    fs.writeFile('./hofer_aktionen.json', JSON.stringify(data), () => { })

})();    