import React, { useContext } from "react"

import styles from "./Home.module.scss"
import wojakImgSrc from "../../images/wojak-landing.png"
import Button from "components/Button/Button"

const Home = () => {
  return (
    <section className={styles.homePage}>
      <img src={wojakImgSrc} alt="Wojak" className={styles.wojakImg} />
      <Button className={styles.lotteryButton} color="secondary" size="lg">
        Enter lottery
      </Button>
    </section>
  )
}

export default Home
