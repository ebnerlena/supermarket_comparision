import { ActionCreator, Dispatch } from "redux"
import { QueryDataType } from "../../types/query-types"

export const setFormDataActionCreator: ActionCreator<void> =
  (data: QueryDataType) => (dispatch: Dispatch) => {
    dispatch({ type: "setFormData/initiated", payload: {} })
    try {
      dispatch({
        type: "setFormData/success",
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: "setFormData/error",
        payload: error,
      })
    }
  }
