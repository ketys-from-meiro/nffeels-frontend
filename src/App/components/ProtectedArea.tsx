import React, { ReactNode, useEffect, useState } from "react"
import { Web3Provider } from "@ethersproject/providers"
import { useWeb3React } from "@web3-react/core"
import { Redirect, useLocation } from "react-router-dom"
import { getRoutePath } from "services/routes"
import { injectedConnector } from "services/wallet"
import { SESSION_STORAGE } from "consts"

type ProtectedAreaProps = {
  children: ReactNode
}

const ProtectedArea = ({ children }: ProtectedAreaProps) => {
  const { active, activate } = useWeb3React<Web3Provider>()
  const [logging, setLogging] = useState(true)
  const { pathname } = useLocation()

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
    if (sessionStorage.getItem(SESSION_STORAGE.AUTO_LOGIN)) {
      tryToLogin()
    } else {
      setLogging(false)
    }
  }, [activate])

  if (!active && logging) {
    return null
  }

  if (!active && !logging) {
    return <Redirect to={{ pathname: getRoutePath("login"), state: { from: pathname } }} />
  } else {
    return <>{children}</>
  }
}

export default ProtectedArea
