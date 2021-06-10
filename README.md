# Supermarket Comparision Search

## Technologies

- Solr as search engine
- Node in Backend
- Frontend: React + Typescript
- Scrapen: using headless brower with https://playwright.dev/

## Supermarkets:

1. Hofer: full sortiment or only aktionen ✔️
2. Interspar: Angebote ✔️
3. Lidl: angebote ✔️
4. Penny: ✔️

## Approach

1. Scrape Content of supermarket websites
2. Put scraped data on onto solr server
3. Build frontend to query data
4. Deploy everything to VM

## Usage

- scrapen: `npm run start-scrapen`
- solr-import: `npm run start-solr-import`
- ui: `npm run start-ui`
- presentation: `npm run start-presentation`

## Team Members

- Simon Sölder
- Lena Ebner
