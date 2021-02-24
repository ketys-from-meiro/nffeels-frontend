import React from "react"

import styles from "./Login.module.scss"
import wojakImgSrc from "../../images/wojak-landing.png"
import Button from "components/Button/Button"

export default function Login() {
  return (
    <section className={styles.LoginPage}>
      <img src={wojakImgSrc} alt="Wojak" className={styles.WojakImg} />
      <Button className={styles.LoginButton}>Connect wallet</Button>
    </section>
  )
}
