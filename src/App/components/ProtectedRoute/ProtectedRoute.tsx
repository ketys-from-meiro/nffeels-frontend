import React, { useContext } from "react"
import { Route, RouteProps } from "react-router-dom"
import { useEthers } from "@usedapp/core"
import LoginModalContext from "../LoginModal/context"
import styles from "./ProtectedRoute.module.scss"
import Button from "components/Button/Button"

const LoginContent = () => {
  const { toggle } = useContext(LoginModalContext)

  return (
    <section className={styles.loginPage}>
      <Button onClick={toggle} color="secondary" size="lg">
        Connect wallet
      </Button>
    </section>
  )
}

export default function ProtectedRoute({ ...routeProps }: RouteProps) {
  const { account } = useEthers()
  if (!account) {
    return <Route {...routeProps} component={LoginContent} />
  }
  return <Route {...routeProps} />
}
