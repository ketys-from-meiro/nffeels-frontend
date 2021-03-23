import React, { ComponentProps, useCallback, useEffect } from "react"
import classnames from "classnames"
import styles from "./Modal.module.scss"

type ModalSize = "small" | "medium" | "large"
type ModalProps = {
  onClose: () => void
  title?: string
  size?: ModalSize
} & ComponentProps<"div">

const Modal = ({ className, children, onClose, title, size = "medium" }: ModalProps) => {
  const escListener = useCallback(
    e => {
      if (e.key === "Escape") {
        onClose()
      }
    },
    [onClose],
  )

  useEffect(() => {
    window.addEventListener("keyup", escListener)
    return () => {
      window.removeEventListener("keyup", escListener)
    }
  }, [escListener])

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={classnames(styles.modal, styles[size], className)}>
        {title && <h3 className={styles.modalTitle}>{title}</h3>}
        {children}
      </div>
    </>
  )
}

export default Modal
