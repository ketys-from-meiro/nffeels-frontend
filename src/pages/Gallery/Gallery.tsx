import React, { useEffect, useState, useCallback } from "react"
import styles from "./Gallery.module.scss"
import Lines from "components/Lines/Lines"
//import Dropdown from "components/Dropdown/Dropdown"
import Slideover from "components/Slideover/Slideover"
import Button from "components/Button/Button"
import { useEthers } from "@usedapp/core"
import { getContract, getWojakEventsContract } from "services/contracts"

//const DROPDOWN_OPTIONS = ["Trait 1", "Trait 2"]

const Gallery = () => {
  // TODO: loading..., nothing found...
  // Gallery component is reneded only if a wallet is connected
  const web3Ethers = useEthers()
  const account = web3Ethers.account!
  const library = web3Ethers.library!
  const [isLoading, setIsLoading] = useState(true)
  const [userWojaks, setUserWojaks] = useState<{ id: number; base64: string }[] | null>(null)
  const [userBalance, setUserBalance] = useState(0)

  const erc721Contract = getContract("ERC721", library)
  const wojakEventsContract = getWojakEventsContract(library)
  const [isButtonShown, setIsButtonShown] = useState({ key: -1, state: false })
  const [isSideoverShown, setIsSideoverShown] = useState(false)
  // eslint-disable-next-line
  const [currentWojakId, setCurrentWojakId] = useState(0)
  //const [filterOption, setFilterOption] = useState("")

  const getUserWojaks = useCallback(async () => {
    const balance = await erc721Contract.balanceOf(account)

    if (balance.toNumber() > 0) {
      const logs = await library.getLogs({
        address: wojakEventsContract.address,
        topics: wojakEventsContract.filters.Wojak().topics,
      })

      const userWojaksBase64: { id: number; base64: string }[] = []
      logs.forEach(log => {
        const tokenId = wojakEventsContract.interface._abiCoder.decode(["uint256"], log.topics[1])
        const eventData = wojakEventsContract.interface.decodeEventLog("Wojak", log.data)
        userWojaksBase64.push({ id: tokenId[0].toNumber(), base64: eventData.data })
      })
      setUserBalance(balance.toNumber())
      setUserWojaks(userWojaksBase64)
      setIsLoading(false)
    }
  }, [account, erc721Contract, wojakEventsContract, library])

  useEffect(() => {
    getUserWojaks()
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <Slideover
        status={isSideoverShown}
        changeStatus={setIsSideoverShown}
        wojakId={currentWojakId}
      />
      <div>
        <div className={styles.galleryContainer}>
          <div className={styles.headerContainer}>
            <div>
              {/*
              <Dropdown
                options={DROPDOWN_OPTIONS}
                value={filterOption}
                onChange={option => {
                  console.log("setting filter: ", option)
                  setFilterOption(option)
                }}
              />
              */}
              {!isLoading && <div className={styles.myWojaksCounter}>My Wojaks: {userBalance}</div>}
            </div>

            <h2 className={styles.pageTitle}>My Wojak Gallery</h2>
          </div>
          <ul className={styles.galleryList}>
            {userWojaks?.map((wojak, index) => {
              return (
                <li
                  onMouseEnter={() => setIsButtonShown({ key: index, state: true })}
                  onMouseLeave={() => setIsButtonShown({ key: index, state: false })}
                  key={index}
                  className={styles.galleryListItemContainer}
                >
                  <div className={styles.galleryListItem}>
                    <div className={styles.linesContainer}>
                      <Lines />
                    </div>
                    <div
                      className={styles.itemPicker}
                      onClick={() => {
                        // don't show slideover for now
                        //setIsSideoverShown(true)
                        //setCurrentWojakId(index)
                      }}
                    >
                      <img
                        className={styles.imageStyles}
                        src={`data:image/png;base64,${wojak.base64}`}
                        alt=""
                      />
                    </div>

                    <div className={styles.legendContainer}>
                      <div className={styles.imageTitleContainer}>
                        <h3 className={styles.imageTitle}>#{wojak.id}</h3>
                      </div>
                      {isButtonShown.key === index && isButtonShown.state && (
                        <Button color="grey" type="button" className={styles.viewButton}>
                          View on Opensea
                        </Button>
                      )}
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </>
  )
}

export default Gallery
