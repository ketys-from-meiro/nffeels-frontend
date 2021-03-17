import React, { ComponentProps, ReactNode } from "react"
import classnames from "classnames"
import styles from "./Button.module.scss"

type ButtonProps = {
  children: ReactNode
} & Omit<ComponentProps<"button">, "size">

const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button className={classnames(styles.button, className)} {...props}>
      {children && <div className={styles.buttonContent}>{children}</div>}
    </button>
  )
}

export default Button
