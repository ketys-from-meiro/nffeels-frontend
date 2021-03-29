import React, { useState } from "react"

import styles from "./Gallery.module.scss"
import classnames from "classnames"

const Lines = () => {
  return (
    <div className={styles.lines}>
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className={styles.line} />
      ))}
    </div>
  )
}

const Gallery = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  return (
    <>
      <div>
        <div className={styles.pageContainer}>
          <div className={styles.galleryContainer}>
            <div className={styles.headerContainer}>
              <div>
                <div className={styles.filterDropdownContainer}>
                  <div>
                    <button
                      type="button"
                      onClick={() => {
                        setIsFilterOpen(!isFilterOpen)
                      }}
                      className={styles.dropdownButton}
                      id="options-menu"
                      aria-expanded="true"
                      aria-haspopup="true"
                    >
                      Filter by trait
                      <svg
                        className={styles.arrowIcon}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                  <div
                    className={classnames(
                      styles.dropdownContentContainer,
                      styles.transform,
                      isFilterOpen ? styles.dropdownOpen : styles.dropdownClose,
                    )}
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="filter-menu"
                  >
                    <div className={styles.dropdownContent} role="none">
                      <button className={styles.dropdownContentItem} role="menuitem">
                        Trait 1
                      </button>
                    </div>
                  </div>
                </div>

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
                <li key={index} className={styles.galleryListItemContainer}>
                  <div className={styles.galleryListItem}>
                    <div className={styles.linesContainer}>
                      <Lines />
                    </div>
                    <img
                      className={styles.imageStyles}
                      src="https://cdn.discordapp.com/attachments/812822477683818527/825861306283589652/native-human.png"
                      alt=""
                    />
                    <div className={styles.legendContainer}>
                      <div className={styles.imageTitleContainer}>
                        <h3 className={styles.imageTitle}>#{index}</h3>
                      </div>
                      <button type="button" className={styles.viewButton}>
                        View on Opensea
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Gallery
