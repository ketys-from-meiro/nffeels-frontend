export type State = {
  open: boolean
}

export type Action = { type: "toggle" }

const loginModalReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "toggle":
      return { open: !state.open }
    default:
      throw new Error("Undefined LoginModal reducer action called.")
  }
}

export default loginModalReducer
