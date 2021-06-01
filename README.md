# Supermarket Comparision Search

## Technologies
- Solr as search engine
- Node in Backend
- Frontend: React
- scrapen: https://playwright.dev/

## Supermarkets:
1. Hofer: full sortiment or only aktionen ✔️
2. Interspar: Angebote ✔️ 
3. Lidl: angebote ✔️
4. Penny: ✔️ - problems with late loaded images, only first 3 images are loaded
5. Denns Biomarkt: ❌ (haven't tried yet)

## Approach
1. Scrape Content of supermarket websites
2. Put scraped data on onto solr server
3. Build Frontend to query data

## Todo
- include all pages from supermarkets
- maybe store products as array instead of object
- test if price parsing is working

