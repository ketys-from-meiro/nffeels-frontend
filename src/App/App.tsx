import React, { useReducer } from "react"
import Header from "components/Header/Header"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { getRoutePath } from "services/routes"
import Home from "pages/Home/Home"
import Gallery from "pages/Gallery/Gallery"
import { UseWalletProvider } from "use-wallet"
import loginModalReducer from "./components/LoginModal/reducer"
import LoginModalContext from "./components/LoginModal/context"
import LoginModal from "./components/LoginModal/LoginModal"

const App = () => {
  const [state, dispatch] = useReducer(loginModalReducer, { open: false })
  console.log("render App!")
  return (
    <UseWalletProvider
      chainId={1}
      connectors={{
        injected: {},
        walletconnect: { rpcUrl: "https://mainnet.eth.aragon.network/" },
      }}
    >
      <BrowserRouter>
        <LoginModalContext.Provider value={{ state, dispatch }}>
          <Header />
          <Switch>
            <Route path={getRoutePath("gallery")} component={Gallery} />
            <Route path={getRoutePath("home")} component={Home} exact />
          </Switch>
        </LoginModalContext.Provider>
        {state.open && (
          <LoginModal
            toggle={() => {
              dispatch({ type: "toggle" })
            }}
          />
        )}
      </BrowserRouter>
    </UseWalletProvider>
  )
}

export default App
