import { Web3Provider } from "@ethersproject/providers"
import { useWeb3React } from "@web3-react/core"
import React from "react"

import styles from "./Header.module.scss"

const Lines = () => {
  return (
    <div className={styles.Lines}>
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className={styles.Line} />
      ))}
    </div>
  )
}

const Header = () => {
  const { account } = useWeb3React<Web3Provider>()
  console.log(account)

  return (
    <section className={styles.Header}>
      <Lines />
      <div className={styles.Brand}>
        <h1>NFFEELS</h1>
      </div>
      <Lines />
    </section>
  )
}

export default Header
