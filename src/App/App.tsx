import React from "react"
import Header from "./components/Header/Header"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { getRoutePath } from "services/routes"
import Home from "pages/Home/Home"
import Gallery from "pages/Gallery/Gallery"
import { UseWalletProvider } from "use-wallet"
import { Web3Provider } from "../contexts/useWeb3"

import Council from "pages/Council/Council"
import Proposals from "pages/Proposals/Proposals"
import Layout from "./components/Layout/Layout"

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
        <Web3Provider>
          <Header />
          <Layout>
            <Switch>
              <Route path={getRoutePath("gallery")} component={Gallery} />
              <Route path={getRoutePath("council")} component={Council} />
              <Route path={getRoutePath("proposals")} component={Proposals} />
              <Route path={getRoutePath("home")} component={Home} exact />
            </Switch>
          </Layout>
        </Web3Provider>
      </BrowserRouter>
    </UseWalletProvider>
  )
}

export default App
