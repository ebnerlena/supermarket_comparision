import { Reducer } from "redux"
const initialstate = {
  query: {},
  products: [],
  formData: {},
}

const queryReducer: Reducer = (previousState = initialstate, action) => {
  switch (action.type) {
    case "query/success":
      return {
        ...previousState,
        query: action.payload.query,
        products: [...previousState.products, ...action.payload.products],
      }
    case "clearProducts/success":
      return initialstate
    case "setFormData/success":
      return {
        ...previousState,
        formData: action.payload,
      }
    default:
      return previousState
  }
}

export default queryReducer
