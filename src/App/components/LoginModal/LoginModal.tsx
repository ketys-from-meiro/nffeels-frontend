import Modal from "components/Modal/Modal"
import React, { useEffect } from "react"
import styles from "./LoginModal.module.scss"

import metamask from "./icons/metamask.png"
import walletconnect from "./icons/walletconnect.png"
import { useEthers } from "@usedapp/core"
import { WalletConnectConnector } from "@web3-react/walletconnect-connector"

type LoginModalProps = {
  toggle: () => void
}

const LoginModal = ({ toggle }: LoginModalProps) => {
  const { activate, activateBrowserWallet, account } = useEthers()

  const onConnectClick = (type: "injected" | "walletconnect") => async () => {
    const walletconnectConnector = new WalletConnectConnector({
      rpc: { 31337: "http://127.0.0.1:8545/" },
    })

    switch (type) {
      case "injected":
        activateBrowserWallet()
        break
      case "walletconnect":
        activate(walletconnectConnector, (error: Error) => console.log(error))
        break
    }
  }

  useEffect(() => {
    if (account) {
      toggle()
    }
  }, [account, toggle])

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
