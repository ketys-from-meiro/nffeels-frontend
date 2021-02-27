import React from "react"
import Header from "components/Header/Header"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { getRoutePath } from "services/routes"
import Login from "pages/Login/Login"
import { Web3ReactProvider } from "@web3-react/core"
import { getLibrary } from "services/wallet"
import ProtectedArea from "./components/ProtectedArea"
import Dashboard from "pages/Dashboard/Dashboard"

const App = () => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path={getRoutePath("login")} component={Login} />
          <ProtectedArea>
            <Route path={getRoutePath("dashboard")} component={Dashboard} />
          </ProtectedArea>
        </Switch>
      </BrowserRouter>
    </Web3ReactProvider>
  )
}

export default App
