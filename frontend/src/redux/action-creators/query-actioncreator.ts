import { ActionCreator, Dispatch } from "redux";

export const queryActionCreator: ActionCreator<void> =
  (queryData) => (dispatch: Dispatch) => {
    const result = {};
    dispatch({ type: "query/initiated", payload: {} });
    try {
      dispatch({
        type: "query/success",
        payload: result,
      });
    } catch (error) {
      dispatch({
        type: "query/error",
        payload: error,
      });
    }
  };
