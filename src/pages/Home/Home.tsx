import React, { useContext, useState } from "react"

import styles from "./Home.module.scss"
import wojakImgSrc from "../../images/wojak-landing.png"
import Button from "components/Button/Button"
import LoginModalContext from "App/components/LoginModal/context"
import { useEthers } from "@usedapp/core"
import wojaks from "../../wojaks.json"
import MerkleTree from "merkletreejs"
import { hashToken } from "utils/token"
import keccak256 from "keccak256"
import { Buffer } from "buffer"
import { getContract } from "services/contracts"

const Home = () => {
  const { account, library } = useEthers()
  const { toggle } = useContext(LoginModalContext)
  const [isClaiming, setIsClaiming] = useState(false)

  const claim = async (account: string) => {
    if (library) {
      // @ts-ignore
      window.Buffer = Buffer
      const merkleTree = new MerkleTree(
        Object.entries(wojaks).map(wojak => hashToken(...wojak)),
        keccak256,
        { sortPairs: true },
      )

      // @ts-ignore
      const wojak: string[] = wojaks[account]
      const proof = merkleTree.getHexProof(hashToken(account, wojak))
      const dropContract = getContract("Drop", library)
      const signer = dropContract.connect(library.getSigner())
      try {
        // TODO: something after success -> button label 'claimed' or maybe just transition to gallery page
        // TODO: claim multiple wojaks
        setIsClaiming(true)
        const transaction = await signer.redeem(account, 0, wojak[0], wojak[1], proof)
        console.log(transaction)
        const receipt = await transaction.wait()
        if (receipt.status) {
          console.log(receipt)
        } else {
          console.log("error!!!!")
        }
        setIsClaiming(false)
      } catch (err) {
        console.log(err)
        setIsClaiming(false)
      }
    }
  }

  // @ts-ignore
  const canClaim = account && wojaks[account]
  const cannotClaim = account && !canClaim
  let buttonLabel = "Connect"
  if (isClaiming) {
    buttonLabel = "Claiming..."
  } else if (canClaim) {
    buttonLabel = "Claim"
  } else if (cannotClaim) {
    buttonLabel = ":( Nothing to claim"
  }

  return (
    <section className={styles.homePage}>
      <img src={wojakImgSrc} alt="Wojak" className={styles.wojakImg} />
      <Button
        className={styles.claimButton}
        onClick={() => {
          if (!account) {
            toggle()
          } else if (canClaim && !isClaiming) {
            claim(account)
          }
        }}
        color="secondary"
        size="lg"
        disabled={Boolean(cannotClaim)}
      >
        {buttonLabel}
      </Button>
    </section>
  )
}

export default Home
