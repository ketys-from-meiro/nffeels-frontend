import React, { ComponentProps } from "react"
import styles from "./Layout.module.scss"

const Layout = ({ children }: ComponentProps<"div">) => {
  return <div className={styles.layout}>{children}</div>
}

export default Layout
