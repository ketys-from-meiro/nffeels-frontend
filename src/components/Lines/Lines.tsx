import React from "react"

import styles from "./Lines.module.scss"

const Lines = () => {
  return (
    <div className={styles.lines}>
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className={styles.line} />
      ))}
    </div>
  )
}

export default Lines
