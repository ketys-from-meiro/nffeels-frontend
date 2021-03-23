import React from "react"

import styles from "./Header.module.scss"

const Lines = () => {
  return (
    <div className={styles.lines}>
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className={styles.line} />
      ))}
    </div>
  )
}

const Header = () => {
  return (
    <section className={styles.header}>
      <Lines />
      <div className={styles.brand}>
        <h1>NFFEELS</h1>
      </div>
      <Lines />
    </section>
  )
}

export default Header
