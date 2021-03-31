import React, { useReducer, useCallback } from "react"
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

import loginModalReducer from "./components/LoginModal/reducer"
import LoginModalContext from "./components/LoginModal/context"
import LoginModal from "./components/LoginModal/LoginModal"

const App = () => {
  const [state, dispatch] = useReducer(loginModalReducer, { open: false })
  const toggle = useCallback(() => dispatch({ type: "toggle" }), [])

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
          <LoginModalContext.Provider value={{ state, toggle }}>
            <Header />
            <Layout>
              <Switch>
                <Route path={getRoutePath("gallery")} component={Gallery} />
                <Route path={getRoutePath("council")} component={Council} />
                <Route path={getRoutePath("proposals")} component={Proposals} />
                <Route path={getRoutePath("home")} component={Home} exact />
              </Switch>
            </Layout>
          </LoginModalContext.Provider>
          {state.open && <LoginModal toggle={toggle} />}
        </Web3Provider>
      </BrowserRouter>
    </UseWalletProvider>
  )
}

export default App
