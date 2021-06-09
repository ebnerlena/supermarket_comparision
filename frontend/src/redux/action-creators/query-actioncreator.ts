import { ActionCreator, Dispatch } from "redux"
import { IResponseDoc, IProduct } from "../../types/query-types"
import { QueryDataType } from "../../types/query-types"

export const queryActionCreator: ActionCreator<void> =
  (queryData: QueryDataType) => async (dispatch: Dispatch) => {
    const queryUrl = `${process.env.REACT_APP_SOLR_URL}/${process.env.REACT_APP_SOLR_CORE}/browse`

    const postData = {
      query: queryData.searchText,
      filter: !!queryData.supermarket
        ? `supermarket_t_sort:${queryData.supermarket}`
        : "",
    }

    const queryResult = await fetch(queryUrl, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(postData),
    }).then((res) => res.json())

    const docsWithHighlights = queryResult.response.docs

    if (queryResult.response.numFound > 0) {
      docsWithHighlights.map((doc: IResponseDoc) => {
        return {
          ...doc,
          highlighting: queryResult.highlighting[doc.id],
        }
      })
    }
    const resultPayload = {
      query: queryResult,
      products: docsWithHighlights,
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
