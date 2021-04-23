import React, { useState } from "react"

import styles from "./Gallery.module.scss"
import Lines from "components/Lines/Lines"
import Dropdown from "components/Dropdown/Dropdown"
import Slideover from "components/Slideover/Slideover"
import classnames from "classnames"

const Gallery = () => {
  const [isButtonShown, setIsButtonShown] = useState({ key: -1, state: false })
  const [isSideoverShown, setIsSideoverShown] = useState(false)
  const [currentWojakId, setCurrentWojakId] = useState(0)

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
              <Dropdown />
              <div className={styles.counterContainer}>
                <div>
                  <button
                    type="button"
                    className={classnames(styles.dropdownButton, styles.countLabel)}
                    id="options-menu"
                  >
                    My Wojaks: 0
                  </button>
                </div>
              </div>
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
                  <img
                    onClick={() => {
                      setIsSideoverShown(true)
                      setCurrentWojakId(index)
                    }}
                    className={styles.imageStyles}
                    src="https://cdn.discordapp.com/attachments/812822477683818527/825861306283589652/native-human.png"
                    alt=""
                  />
                  <div className={styles.legendContainer}>
                    <div className={styles.imageTitleContainer}>
                      <h3 className={styles.imageTitle}>#{index}</h3>
                    </div>
                    <div className={styles.viewButtonContainer}>
                      {isButtonShown.key === index && isButtonShown.state && (
                        <button type="button" className={styles.viewButton}>
                          View on Opensea
                        </button>
                      )}
                    </div>
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
