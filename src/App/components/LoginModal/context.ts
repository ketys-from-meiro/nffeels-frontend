import React from "react"
import { Action, State } from "./reducer"

type ContextType = {
  state: State
  dispatch: (a: Action) => void
}

const LoginModalContext = React.createContext<ContextType>({
  state: { open: false },
  dispatch: () => {},
})

export default LoginModalContext
