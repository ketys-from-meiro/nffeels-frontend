import Button from "components/Button/Button"
import { WALLET } from "consts"
import React, { useContext } from "react"
import { useWallet } from "use-wallet"
import { take, takeLast } from "ramda"

import styles from "./Header.module.scss"
import LoginModalContext from "App/components/LoginModal/context"

const Lines = () => {
  return (
    <div className={styles.lines}>
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className={styles.line} />
      ))}
    </div>
  )
}

const Header = () => {
  const { status, account, reset } = useWallet()
  const { toggle } = useContext(LoginModalContext)

  const onLogoutClick = () => {
    reset()
  }

  const shortenAddress = (address: string): string => {
    return `${take(4, address)}...${takeLast(4, address)}`
  }

  return (
    <section className={styles.header}>
      <Lines />
      <div className={styles.brand}>
        <h1>NFFEELS</h1>
      </div>
      <div className={styles.walletBlock}>
        {status === WALLET.STATUS.CONNECTED && (
          <>
            <span className={styles.walletAddress}>{shortenAddress(account!)}</span>
            <Button color="primary" size="sm" onClick={onLogoutClick}>
              Logout
            </Button>
          </>
        )}
        {status !== WALLET.STATUS.CONNECTED && (
          <Button color="primary" size="sm" onClick={toggle}>
            Connect wallet
          </Button>
        )}
      </div>
    </section>
  )
}

export default Header
