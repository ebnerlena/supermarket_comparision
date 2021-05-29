# Supermarket Comparision Search

## Technologies
- Solr as search engine
- Node in Backend
- Frontend: React ? Vue ? Next.js?
- Website Scraper: https://www.npmjs.com/package/nodejs-web-scraper#get-an-entire-html-file

## Supermarkets:
1. Hofer: full sortiment or only aktionen ✔️
2. Interspar: Angebote ❌ (fails i think because the page loads a little late)
3. Lidl: angebote ✔️, neu im sortiment - some prices are missing e.g. melon ...
4. Penny: ✔️ - problems with late loaded images
5. Denns Biomarkt: ❌ (fails i think because the page loads a little late)

## Approach
1. Scrape Content of supermarket websites
2. Parse scraped data and load into solr server
3. Build Frontend to query data

