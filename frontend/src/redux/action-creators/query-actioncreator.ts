import { ActionCreator, Dispatch } from "redux"
import { QueryDataType } from "../../types/query-types"

export const queryActionCreator: ActionCreator<void> =
  (queryData: QueryDataType) => async (dispatch: Dispatch) => {
    const queryUrl = `${process.env.REACT_APP_SOLR_URL}/${process.env.REACT_APP_SOLR_CORE}/spell`

    const postData = {
      query: "title_t_sort:" + queryData.searchText,
    }

    const result = await fetch(queryUrl, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(postData),
    }).then((res) => res.json())

    dispatch({ type: "query/initiated", payload: {} })
    try {
      dispatch({
        type: "query/success",
        payload: result,
      })
    } catch (error) {
      dispatch({
        type: "query/error",
        payload: error,
      })
    }
  }
