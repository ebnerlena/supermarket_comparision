import { ActionCreator, Dispatch } from "redux"

export const clearProductsActionCreator: ActionCreator<void> =
  () => (dispatch: Dispatch) => {
    dispatch({ type: "clearProducts/initiated", payload: {} })
    try {
      dispatch({
        type: "clearProducts/success",
        payload: null,
      })
    } catch (error) {
      dispatch({
        type: "clearProducts/error",
        payload: null,
      })
    }
  }
