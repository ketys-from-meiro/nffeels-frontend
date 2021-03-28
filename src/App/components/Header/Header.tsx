import Button from "components/Button/Button"
import React, { useContext, useState } from "react"
import { useWallet } from "use-wallet"
import { useWeb3 } from "../../../contexts/useWeb3"
import styles from "./Header.module.scss"
import { NavLink } from "react-router-dom"
import { getRoutePath } from "services/routes"
import wojakImg from "images/wojak-landing.png"
import LoginModal from "../../components/LoginModal/LoginModal"

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
  const { status, account, disconnectWallet } = useWeb3()
  const [state, setState] = useState(false)

  const toggle = () => {
    console.log("Toggle")
    setState(!state)
  }

  const shortenAddress = (address: string): string => {
    return `${address.slice(0, 4)}...${address.slice(-4, -1)}`
  }

  return (
    <section className={styles.header}>
      <nav className={styles.navigation}>
        <NavLink to={getRoutePath("home")}>
          <img src={wojakImg} alt="" className={styles.wojak} />
          Home
        </NavLink>
        <NavLink to={getRoutePath("gallery")}>Gallery</NavLink>
        <NavLink to={getRoutePath("council")}>Council</NavLink>
        <NavLink to={getRoutePath("proposals")}>Proposals</NavLink>
      </nav>
      <Lines />
      <div className={styles.brand}>
        <h1>NFFEELS</h1>
      </div>
      <div className={styles.walletBlock}>
        {account ? (
          <>
            <span className={styles.walletAddress}>{shortenAddress(account!)}</span>
            <Button color="primary" size="sm" onClick={() => disconnectWallet()}>
              Logout
            </Button>
          </>
        ) : (
          <Button color="primary" size="sm" onClick={toggle}>
            Connect wallet
          </Button>
        )}
      </div>
      {state && !account ? <LoginModal toggle={toggle} /> : null}
    </section>
  )
}

export default Header
