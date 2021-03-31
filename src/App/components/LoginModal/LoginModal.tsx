import Modal from "components/Modal/Modal"
import React, { useEffect } from "react"
import styles from "./LoginModal.module.scss"

import metamask from "./icons/metamask.png"
import walletconnect from "./icons/walletconnect.png"
import { useWeb3 } from "../../../contexts/useWeb3"
import { WALLET } from "../../../consts"
type LoginModalProps = {
  toggle: () => void
}

const LoginModal = ({ toggle }: LoginModalProps) => {
  const { status, connectWallet } = useWeb3()

  useEffect(() => {
    if (status === WALLET.STATUS.CONNECTED) {
      toggle()
    }
  }, [status, toggle])

  return (
    <Modal onClose={toggle} size="large" className={styles.loginModal}>
      <button onClick={() => connectWallet("injected")}>
        <img src={metamask} alt="" />
        <span>Metamask</span>
      </button>
      <button onClick={() => connectWallet("walletconnect")}>
        <img src={walletconnect} alt="" />
        <span>Walletconnect</span>
      </button>
    </Modal>
  )
}

export default LoginModal
