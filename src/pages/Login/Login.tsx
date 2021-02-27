import React, { useEffect } from "react"

import styles from "./Login.module.scss"
import wojakImgSrc from "../../images/wojak-landing.png"
import Button from "components/Button/Button"
import { useWeb3React } from "@web3-react/core"
import { Web3Provider } from "@ethersproject/providers"
import { injectedConnector } from "services/wallet"
import { useHistory, useLocation } from "react-router-dom"
import { getRoutePath } from "services/routes"

const Login = () => {
  const { activate, active } = useWeb3React<Web3Provider>()
  const history = useHistory()
  const location = useLocation<{ from: Location } | undefined>()
  const redirectTo = location.state?.from

  const onLoginClick = () => {
    // TODO: loading, error handling
    activate(injectedConnector)
  }

  useEffect(() => {
    if (active) {
      history.push(redirectTo ?? getRoutePath("dashboard"))
    }
  }, [active, history, redirectTo])

  return (
    <section className={styles.LoginPage}>
      <img src={wojakImgSrc} alt="Wojak" className={styles.WojakImg} />
      <Button className={styles.LoginButton} onClick={onLoginClick}>
        Connect wallet
      </Button>
    </section>
  )
}

export default Login
