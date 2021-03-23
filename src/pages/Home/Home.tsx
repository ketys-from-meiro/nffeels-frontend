import React, { useContext } from "react"

import styles from "./Home.module.scss"
import wojakImgSrc from "../../images/wojak-landing.png"
import Button from "components/Button/Button"
import LoginModalContext from "App/components/LoginModal/context"

const Home = () => {
  const { dispatch: loginModalToggle } = useContext(LoginModalContext)

  // TODO: loading, error handling
  /*
  const onLoginClick = (type: "injected" | "walletconnect") => () => {
    setRedirectAfterLogin(true)
    wallet.connect(type)
  }

  const onLogoutClick = () => {
    wallet.reset()
  }
  */

  return (
    <section className={styles.homePage}>
      <img src={wojakImgSrc} alt="Wojak" className={styles.wojakImg} />
      <Button
        className={styles.lotteryButton}
        onClick={() => loginModalToggle({ type: "toggle" })}
        color="secondary"
      >
        Enter lottery
      </Button>
    </section>
  )
}

export default Home
