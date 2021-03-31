import React, { useState } from "react"

import styles from "./Dropdown.module.scss"
import classnames from "classnames"

const Dropdown = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  return (
    <div className={styles.filterDropdownContainer} onMouseLeave={() => setIsFilterOpen(false)}>
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
  )
}

export default Dropdown
