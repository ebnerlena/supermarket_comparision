import { Reducer } from "redux"
const initialstate = {}

const queryReducer: Reducer = (previousState = initialstate, action) => {
  switch (action.type) {
    case "query/success":
      return action.payload
    default:
      return previousState
  }
}

export default queryReducer
