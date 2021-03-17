import React, { useEffect, useState } from "react"

import styles from "./Home.module.scss"
import wojakImgSrc from "../../images/wojak-landing.png"
import Button from "components/Button/Button"
import { useHistory, useLocation } from "react-router-dom"
import { getRoutePath } from "services/routes"
import { useWallet } from "use-wallet"
import { WALLET } from "consts"

const Home = () => {
  const [redirectAfterLogin, setRedirectAfterLogin] = useState(false)
  const wallet = useWallet()
  const history = useHistory()
  const location = useLocation<{ from: Location } | undefined>()
  const redirectTo = location.state?.from

  // TODO: loading, error handling
  const onLoginClick = (type: "injected" | "walletconnect") => () => {
    setRedirectAfterLogin(true)
    wallet.connect(type)
  }

  const onLogoutClick = () => {
    wallet.reset()
  }

  useEffect(() => {
    if (wallet.status === WALLET.STATUS.CONNECTED && redirectAfterLogin) {
      history.push(redirectTo ?? getRoutePath("gallery"))
    }
  }, [wallet, history, redirectTo, redirectAfterLogin])

  const renderButtons = () => {
    console.log(wallet.status)
    if (wallet.status !== WALLET.STATUS.CONNECTED) {
      return (
        <>
          <Button className={styles.loginButton} onClick={onLoginClick("injected")}>
            Connect wallet MM
          </Button>
          <Button className={styles.loginButton} onClick={onLoginClick("walletconnect")}>
            Connect WC
          </Button>
        </>
      )
    } else {
      return (
        <Button className={styles.loginButton} onClick={onLogoutClick}>
          Logout
        </Button>
      )
    }
  }

  return (
    <section className={styles.homePage}>
      <img src={wojakImgSrc} alt="Wojak" className={styles.wojakImg} />
      {renderButtons()}
    </section>
  )
}

export default Home
