import React from "react"
import Header from "components/Header/Header"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { getRoutePath } from "services/routes"
import Login from "pages/Login/Login"

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path={getRoutePath("login")} component={Login} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
