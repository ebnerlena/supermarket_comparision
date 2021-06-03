import fetch from "node-fetch";
import products from "./../../scrapen/public/products.json";

export const TITLE_FIELD = "title_t_sort";
export const QUANTITY_FIELD = "quantity_txt_de";
export const PRICE_FIELD = "price_f";
export const IMAGE_FIELD = "image_url_t";
export const SUPERMARKET_FIELD = "supermarket_t_sort";

const SOLR_URL = "https://vm-cyan.multimediatechnology.at/solr/products";

const buildDocument = (product) => {
    const document = {};
    document[TITLE_FIELD] = product.title;
    document[QUANTITY_FIELD] = product.quantity;
    document[PRICE_FIELD] = product.price;
    document[IMAGE_FIELD] = product.image;
  
    return document;
  }

const commit = async () => {
  await postSolrRequest("update?commit=true");
}

const postSolrRequest = async(url, body) => {
  const jsonResponse = await fetch(`${SOLR_URL}/${url}`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });

  if (!jsonResponse.ok) {
    throw new Error(jsonResponse.statusText);
  }

  const response = await jsonResponse.json();
  return response.response;
}

const deleteAll = async() => {
  await postSolrRequest("update?commit=true", {
      delete: {
          query: "*:*",
      },
  });
}

const addDocument = async (fields) => {
  await postSolrRequest("update?overwrite=true&commitWithin=1000", [
    { ...fields },
  ]);
}

(async () => {
  await deleteAll();

  for(let i = 0; i < products.length; i++)
  {
    await addDocument(buildDocument(products[i]));
  }

  await commit();
})();
