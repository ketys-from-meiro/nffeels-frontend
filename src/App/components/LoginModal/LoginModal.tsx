import Modal from "components/Modal/Modal"
import React, { useEffect } from "react"
import styles from "./LoginModal.module.scss"

import metamask from "./icons/metamask.png"
import walletconnect from "./icons/walletconnect.png"
import { useWallet } from "use-wallet"
import { WALLET } from "consts"

type LoginModalProps = {
  toggle: () => void
}

const LoginModal = ({ toggle }: LoginModalProps) => {
  const { connect, status } = useWallet()

  const onConnectClick = (type: "injected" | "walletconnect") => async () => {
    connect(type)
  }

  useEffect(() => {
    if (status === WALLET.STATUS.CONNECTED) {
      toggle()
    }
  }, [status, toggle])

  return (
    <Modal onClose={toggle} size="large" className={styles.loginModal}>
      <button onClick={onConnectClick("injected")}>
        <img src={metamask} alt="" />
        <span>Metamask</span>
      </button>
      <button onClick={onConnectClick("walletconnect")}>
        <img src={walletconnect} alt="" />
        <span>Walletconnect</span>
      </button>
    </Modal>
  )
}

export default LoginModal
