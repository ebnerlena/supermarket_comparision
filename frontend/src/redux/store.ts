import { applyMiddleware, createStore, compose } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import queryReducer from "./reducers/query-reducer"

const store = createStore(
  queryReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store
