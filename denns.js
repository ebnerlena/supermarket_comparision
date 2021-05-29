const { Scraper, Root, DownloadContent, OpenLinks, CollectContent } = require('nodejs-web-scraper');
const fs = require('fs');

(async () => {

    const config = {
        baseSiteUrl: `https://www.denns-biomarkt.at/angebote/`,
        startUrl: `https://www.denns-biomarkt.at/angebote/`,
        filePath: './images/denns/',
        concurrency: 5,
        maxRetries: 10,    
        logPath: './logs/denns/'
    }

    
    const condition = (node) => {      
        let text = "";
 
        for(let i = 0; i < node.childNodes.length; i++) 
        {
            text += node.childNodes[i].text();
        }
        console.log(text)
        return text
    }

    const scraper = new Scraper(config);

    const denns = new Root();

 
    const image = new DownloadContent('.teaser__inner .teaser__figure .figure__wrapper img', { name: 'image' });

    const title = new CollectContent('.teaser__content-wrapper h3.teaser__headline', { name: 'title' });

    const price = new CollectContent('.teaser__inner .teaser__figure .figure__wrapper .figure__disturber-upper',{condition}, { name: 'price' });

    const amount = new CollectContent('.teaser__content .teaser__content-list-item', { name: 'amount' });


    denns.addOperation(image);
    denns.addOperation(title);
    denns.addOperation(price);
    denns.addOperation(amount);


    await scraper.scrape(denns)
    const data = denns.getData()
    fs.writeFile('./denns-data.json', JSON.stringify(data), () => { })

})();    

