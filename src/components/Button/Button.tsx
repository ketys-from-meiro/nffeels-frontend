import React, { ComponentProps, ReactNode } from "react"
import classnames from "classnames"
import styles from "./Button.module.scss"

type ButonColor = "primary" | "secondary"
type ButtonProps = {
  children: ReactNode
  color?: ButonColor
} & Omit<ComponentProps<"button">, "size">

const Button = ({ children, className, color = "primary", ...props }: ButtonProps) => {
  return (
    <button className={classnames(styles.button, className, styles[`${color}Color`])} {...props}>
      {children && <div className={styles.buttonContent}>{children}</div>}
    </button>
  )
}

export default Button
