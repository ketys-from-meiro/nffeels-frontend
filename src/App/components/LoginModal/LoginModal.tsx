import Modal from "components/Modal/Modal"
import React from "react"

type LoginModalProps = {
  toggle: () => void
}

const LoginModal = ({ toggle }: LoginModalProps) => {
  return (
    <Modal onClose={toggle} size="large">
      Login here!
    </Modal>
  )
}

export default LoginModal
