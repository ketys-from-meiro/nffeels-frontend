import React from "react"
import { State } from "./reducer"

type ContextType = {
  state: State
  toggle: () => void
}

const LoginModalContext = React.createContext<ContextType>({
  state: { open: false },
  toggle: () => {},
})

export default LoginModalContext
