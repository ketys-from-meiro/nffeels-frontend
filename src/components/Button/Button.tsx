import React, { ComponentProps, ReactNode } from "react"
import classnames from "classnames"
import styles from "./Button.module.scss"

type ButtonColor = "primary" | "secondary"
type ButtonSize = "sm" | "md" | "lg"
type ButtonProps = {
  children: ReactNode
  color?: ButtonColor
  size?: ButtonSize
} & Omit<ComponentProps<"button">, "size">

const Button = ({ children, className, size = "md", color = "primary", ...props }: ButtonProps) => {
  return (
    <button
      className={classnames(
        styles.button,
        className,
        styles[`${color}Color`],
        styles[`${size}Size`],
      )}
      {...props}
    >
      {children && <div className={styles.buttonContent}>{children}</div>}
    </button>
  )
}

export default Button
