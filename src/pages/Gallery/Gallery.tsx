import React, { useEffect, useState, useCallback } from "react"
import styles from "./Gallery.module.scss"
import Lines from "components/Lines/Lines"
import Dropdown from "components/Dropdown/Dropdown"
import Slideover from "components/Slideover/Slideover"
import Button from "components/Button/Button"
import { useEthers } from "@usedapp/core"
import { CONTRACT, getContract, getWojakEventsContract } from "services/contracts"

const DROPDOWN_OPTIONS = ["Trait 1", "Trait 2"]

const Gallery = () => {
  // Page is reneder only if wallet is connected
  const web3Ethers = useEthers()
  const account = web3Ethers.account!
  const library = web3Ethers.library!

  const erc721Contract = getContract("ERC721", library)
  const dropContract = getContract("Drop", library)
  const wojakEventsContract = getWojakEventsContract(library)
  const [isButtonShown, setIsButtonShown] = useState({ key: -1, state: false })
  const [isSideoverShown, setIsSideoverShown] = useState(false)
  const [currentWojakId, setCurrentWojakId] = useState(0)
  const [filterOption, setFilterOption] = useState("")

  const getUserTokens = useCallback(async () => {
    if (erc721Contract && library && wojakEventsContract) {
      const balance = await erc721Contract.balanceOf(account)
      if (balance.toNumber() > 0) {
        const logs = await library.getLogs({
          address: CONTRACT,
        })
        console.log(logs)
        const decodedEvents = logs.map(log =>
          wojakEventsContract.interface.decodeEventLog("Wojak", log.data),
        )
        console.log(decodedEvents)
      }
    }
  }, [account, erc721Contract, wojakEventsContract, library])

  const redeem = async () => {
    const tokenURI = "56660740342816081431743222872731117427526580551422435935884080137676694505177"
    const data =
      "iVBORw0KGgoAAAANSUhEUgAAAG4AAABuCAMAAADxhdbJAAAAPFBMVEUAAAD///+enp4AAAD+/gD9AboA/hDKEFsAwgwAXvz9mAAL797Uav76DhDQJO0fTO8h7TD/6xipA/3/phpjwDyBAAAAAXRSTlMAQObYZgAABKRJREFUaN7s1duOqyAUgGErCIhe+f4Pu9eRBTgttOnVTv9kPE3i1+VQZ/n169evX/9DcduWGGEb47JBXwdaCykODgj9XimEsFisIBhCSgWFvsQlBPHGOARBW0hcCGhG5LVveAk9ljbULPG0z8HsYcNjMBgxw5JER2SZ+BkHlfsKYlKWZEB5oiR+yGFKGJiz98B4SA7pt9WiidsnHHhcKjMxZslZwGLlvT+gzz5jyJEj+dbDPI1evo2R0Dc5HSN7dV6VYHgBCcPD6cEkEAqSS/VJIyadkH7mJyx30kXx92h2XfGAII03/ReUd5Z6bfnVBfZSIk+ae2ktaVmYG5UbOyX1ZLzZdxbtqg+f7cFSxnReQg/Bec6+aLTwgwihRKrWzoqezAZNeyxy4ZZ/XoKAmv+6/2Uo358jcP9GRPWIG3sGVrBdvNU8VuCwGW7fjwM2exFT0EOSnkwtBSJXjMERh9QBJe2g9u5yz8kOmOwf1Dr+736SJ7dWzNrLQapDRnpIBrpXHHgq6lRdd7Bl+mY4VlqsBxVzde95p3j9WBd3nlfvqrBSf9luoFHk6eM8q9pPYk+xVtUeceSd1yUezMNdHB+rZ1qZq7VHHtzrlIjWYmnDzoOCoStqxXpxPN5Vj0Rb0/pEMALPrSHHknJMbtszrb6nidzk0oRQvQqM2FZlD/UxyrxBuFjs1qyopb4OUK3/+5TCjTOsTi8dx6o3rZzKqz+Be8nQVv9/1JCOhqtSZxNKM032Yw+Kmlm69/5gbpR6Aw7ALp6KKML6t4njPl8rwoglDxUsfm13nFu51pt8b1qA5DrVjqPT7LlZbuq96XPmvfckSHx6yHsb7tJqCWPPro7Xyo6eRYjtAePumnNOPLsasZdrBT56NUwzWa8ZR9oDUeFUc86x95wD8F/zdbebMAxDAXj4DO4GQ7z/u85N3J1mjhxVO5N2JC4wEl+dnzYNh+nd9YF0yxKHxuHINe2yoQX3/v1MPb55H49iNuFuwd0GLooF517/2yD9E9JetUjiPCN3De66Fall7yDycERtwt26ljjPivPs4g5TY46ce10buGvXKs6zTVeDBs37pEaO3o2atZp7XSs5Tyz97nEm35C4vKODC8/DfVeDHf0+qns1c/N7pqVroFeS/X7WsIob78Zm6RrInQkSl0KO16DgUHP8ueDW3pozKUdNz2Xvv3H7MoKAo4dCk3L0Co0eOXV71OhR03MGUKOn4AwTzSxxSdNz1P6eM0lz5CoPXgSoCbjCY6DRyIFcESFnEGs1N3pAdqhJuNH7AAYTWi48clteT0SoSbjLDw/dez6fn5+Px+N+B6RceCDX0jh6kGjOhWf0di7au0s4GjbzXu4FpxzLlh9fEueahOtA9px7kZNo5Ojl9pyjJuOGBTqMppijF2DiFBpHL4Nm41oRcxkMLiZPrGUwcWKNSZxHrzGGzOk1cgYRBxCjNvFcO3LYctpavJWTs517dK6VT5AIi1iVOZfJmiK2yLDNqZFcUGsMmHLuUWOmYFDZKkCDZ+ToFeCyrRxcYncUHIMBO0VxVi5rLntnsbwT4uxHrvDwG4ztBVd4Ai04T3Cl9wWSF3LxC0gwpAAAAABJRU5ErkJggg=="
    const proof = ["0x18e67b5f24754608ca84b406001f48ac2da85648ede3f5dc62e994014a4de2a0"]
    const signer = dropContract.connect(library!.getSigner())
    const r = await signer.redeem(account, 0, tokenURI, data, proof)
    console.log(signer)
    console.log(r)
    const res = await dropContract.redeem(account, 0, tokenURI, data, proof)
    console.log(res)
  }

  useEffect(() => {
    getUserTokens()
    //redeem()
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
              <Dropdown
                options={DROPDOWN_OPTIONS}
                value={filterOption}
                onChange={option => {
                  console.log("setting filter: ", option)
                  setFilterOption(option)
                }}
              />
              <div className={styles.myWojaksCounter}>My Wojaks: 0</div>
            </div>

            <h2 className={styles.pageTitle}>Wojak Gallery</h2>
          </div>
          <ul className={styles.galleryList}>
            {Array.from({ length: 6 }).map((_, index) => (
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
                      setIsSideoverShown(true)
                      setCurrentWojakId(index)
                    }}
                  >
                    <img
                      className={styles.imageStyles}
                      src="https://cdn.discordapp.com/attachments/812822477683818527/825861306283589652/native-human.png"
                      alt=""
                    />
                  </div>

                  <div className={styles.legendContainer}>
                    <div className={styles.imageTitleContainer}>
                      <h3 className={styles.imageTitle}>#{index}</h3>
                    </div>
                    {isButtonShown.key === index && isButtonShown.state && (
                      <Button color="grey" type="button" className={styles.viewButton}>
                        View on Opensea
                      </Button>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default Gallery
