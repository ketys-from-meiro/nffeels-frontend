import React, { useReducer, useCallback } from "react"
import Header from "./components/Header/Header"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { getRoutePath } from "services/routes"
import Home from "pages/Home/Home"
import Gallery from "pages/Gallery/Gallery"
import { ChainId, DAppProvider, MULTICALL_ADDRESSES } from "@usedapp/core"
import loginModalReducer from "./components/LoginModal/reducer"
import LoginModalContext from "./components/LoginModal/context"
import LoginModal from "./components/LoginModal/LoginModal"
import Council from "pages/Council/Council"
import Layout from "./components/Layout/Layout"
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"

/*
const config = {
  readOnlyChainId: ChainId.Mainnet,
  readOnlyUrls: {
    [ChainId.Mainnet]: "https://mainnet.eth.aragon.network/",
  },
}
*/

const config = {
  readOnlyChainId: ChainId.Hardhat,
  readOnlyUrls: {
    [ChainId.Hardhat]: "http://127.0.0.1:8545/",
  },
  multicallAddresses: {
    [ChainId.Hardhat]: "http://localhost:8545",
    ...MULTICALL_ADDRESSES,
  },
  supportedChains: [ChainId.Hardhat],
}

const App = () => {
  const [state, dispatch] = useReducer(loginModalReducer, { open: false })
  const toggle = useCallback(() => dispatch({ type: "toggle" }), [])

  return (
    <DAppProvider config={config}>
      <BrowserRouter>
        <LoginModalContext.Provider value={{ state, toggle }}>
          <Header />
          <Layout>
            <Switch>
              <ProtectedRoute path={getRoutePath("gallery")} component={Gallery} />
              <Route path={getRoutePath("council")} component={Council} />
              <Route path={getRoutePath("home")} component={Home} exact />
            </Switch>
          </Layout>
        </LoginModalContext.Provider>
        {state.open && <LoginModal toggle={toggle} />}
      </BrowserRouter>
    </DAppProvider>
  )
}

export default App
