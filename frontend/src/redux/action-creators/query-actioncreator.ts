import { ActionCreator, Dispatch } from "redux"
import { IProduct, IResponseDoc } from "../../types/query-types"
import { QueryDataType } from "../../types/query-types"

export const queryActionCreator: ActionCreator<void> =
  (queryData: QueryDataType) => async (dispatch: Dispatch) => {
    const queryUrl = `${process.env.REACT_APP_SOLR_URL}/${process.env.REACT_APP_SOLR_CORE}/browse`

    const postData = {
      query: queryData.searchText,
      filter: !!queryData.supermarket
        ? `supermarket_t_sort:${queryData.supermarket}`
        : "",
      offset: queryData.startIndex,
      sort: `${queryData.sorting.sortType} ${queryData.sorting.sortOrder}`,
    }

    const queryResult = await fetch(queryUrl, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(postData),
    }).then((res) => res.json())

    const products: IProduct[] = []

    if (queryResult.response.numFound > 0) {
      queryResult.response.docs.forEach((doc: IResponseDoc) => {
        const highlighting = queryResult.highlighting[doc.id]
        const highlightString =
          `<span>${highlighting.title_t_sort || ""} ${
            highlighting.quantity_t_de || ""
          } ${highlighting.supermarket_t_sort || ""}</span>` || ""

        products.push({
          ...doc,
          highlighting: highlighting,
          highlightString: highlightString,
        })
      })
    }
    const resultPayload = {
      query: queryResult,
      products: products,
    }

    dispatch({ type: "query/initiated", payload: {} })
    try {
      dispatch({
        type: "query/success",
        payload: resultPayload,
      })
    } catch (error) {
      dispatch({
        type: "query/error",
        payload: error,
      })
    }
  }
