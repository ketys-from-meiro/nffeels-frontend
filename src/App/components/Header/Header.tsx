import Button from "components/Button/Button"
import React, { useContext } from "react"
import { useEthers, shortenIfAddress } from "@usedapp/core"
import styles from "./Header.module.scss"
import LoginModalContext from "App/components/LoginModal/context"
import { NavLink } from "react-router-dom"
import { getRoutePath } from "services/routes"
import wojakImg from "images/wojak-landing.png"

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
  const { deactivate, account } = useEthers()
  const { toggle } = useContext(LoginModalContext)

  const onLogoutClick = () => {
    deactivate()
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
        {account && (
          <>
            <span className={styles.walletAddress}>{shortenIfAddress(account!)}</span>
            <Button color="primary" size="sm" onClick={onLogoutClick}>
              Logout
            </Button>
          </>
        )}
        {!account && (
          <Button color="primary" size="sm" onClick={toggle}>
            Connect wallet
          </Button>
        )}
      </div>
    </section>
  )
}

export default Header
