import React from "react"
import Header from "components/Header/Header"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { getRoutePath } from "services/routes"
import Home from "pages/Home/Home"
import Gallery from "pages/Gallery/Gallery"
import { UseWalletProvider } from "use-wallet"

const App = () => {
  return (
    <UseWalletProvider
      chainId={1}
      connectors={{
        injected: {},
        walletconnect: { rpcUrl: "https://mainnet.eth.aragon.network/" },
      }}
    >
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path={getRoutePath("gallery")} component={Gallery} />
          <Route path={getRoutePath("home")} component={Home} exact />
        </Switch>
      </BrowserRouter>
    </UseWalletProvider>
  )
}

export default App
