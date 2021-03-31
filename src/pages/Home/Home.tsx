import React, { useContext } from "react"

import styles from "./Home.module.scss"
import wojakImgSrc from "../../images/wojak-landing.png"
import Button from "components/Button/Button"
import LoginModalContext from "../../App/components/LoginModal/context"
import { useWeb3 } from "../../contexts/useWeb3"

const Home = () => {
  const { account } = useWeb3()
  const { toggle } = useContext(LoginModalContext)

  return (
    <section className={styles.homePage}>
      <img src={wojakImgSrc} alt="Wojak" className={styles.wojakImg} />

      {account ? (
        <Button className={styles.lotteryButton} color="secondary" size="lg">
          Enter lottery
        </Button>
      ) : (
        <Button className={styles.lotteryButton} color="secondary" size="lg" onClick={toggle}>
          Connect Wallet
        </Button>
      )}
    </section>
  )
}

export default Home
