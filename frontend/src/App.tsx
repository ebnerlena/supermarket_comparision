import React from "react"
import Header from "./components/Header"
import "./assets/App.scss"
import Form from "./components/Form"
import Results from "./components/Results"
import store from "./redux/store"
import { Provider } from "react-redux"

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="app">
        <Header />
        <Form />
        <Results />
      </div>
    </Provider>
  )
}

export default App
