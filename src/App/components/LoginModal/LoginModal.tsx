import Modal from "components/Modal/Modal"
import React, { useEffect } from "react"
import styles from "./LoginModal.module.scss"

import metamask from "./icons/metamask.png"
import walletconnect from "./icons/walletconnect.png"
import { useEthers } from "@usedapp/core"
import { WalletConnectConnector } from "@web3-react/walletconnect-connector"
// import { WALLET } from "consts"

type LoginModalProps = {
  toggle: () => void
}

const walletconnectConnector = new WalletConnectConnector({ rpc: { 1: "..." } })

const LoginModal = ({ toggle }: LoginModalProps) => {
  // const { error } = useEthers()
  const { activate, activateBrowserWallet, account } = useEthers()

  const onConnectClick = (type: "injected" | "walletconnect") => async () => {
    // connect(type)
    switch (type) {
      case "injected":
        activateBrowserWallet()
        break
      case "walletconnect":
        activate(walletconnectConnector)
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
