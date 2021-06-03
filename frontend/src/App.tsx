import React from "react"
import Header from "./components/Header"
import "./assets/App.scss"
import Form from "./components/Form"

const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <Form />
    </div>
  )
}

export default App
