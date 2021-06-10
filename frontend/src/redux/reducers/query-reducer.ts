import { Reducer } from "redux"
const initialstate = {
  query: {},
  products: [],
}

const queryReducer: Reducer = (previousState = initialstate, action) => {
  switch (action.type) {
    case "query/success":
      return {
        query: action.payload.query,
        products: [...previousState.products, ...action.payload.products],
      }
    case "clearProducts/success":
      return initialstate
    default:
      return previousState
  }
}

export default queryReducer
