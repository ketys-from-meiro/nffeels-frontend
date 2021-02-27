import React, { ReactNode, useEffect, useState } from "react"
import { Web3Provider } from "@ethersproject/providers"
import { useWeb3React } from "@web3-react/core"
import { Redirect, useLocation } from "react-router-dom"
import { getRoutePath } from "services/routes"
import { injectedConnector } from "services/wallet"

type ProtectedAreaProps = {
  children: ReactNode
}

const ProtectedArea = ({ children }: ProtectedAreaProps) => {
  const { active, activate } = useWeb3React<Web3Provider>()
  const [logging, setLogging] = useState(true)

  // TODO: error handling...
  useEffect(() => {
    const tryToLogin = async () => {
      try {
        await activate(injectedConnector)
        setLogging(false)
      } catch (_) {
        setLogging(false)
      }
    }
    tryToLogin()
  }, [activate])

  const { pathname } = useLocation()
  if (!active && !logging) {
    return <Redirect to={{ pathname: getRoutePath("login"), state: { from: pathname } }} />
  } else {
    return <>{children}</>
  }
}

export default ProtectedArea
