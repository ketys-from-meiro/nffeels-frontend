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

export default function Header() {
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
