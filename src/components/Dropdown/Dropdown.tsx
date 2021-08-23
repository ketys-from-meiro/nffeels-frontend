import React, { useState } from "react"

import styles from "./Dropdown.module.scss"
import classnames from "classnames"
import Button from "components/Button/Button"

type DropdownProps = {
  onChange: (option: string) => void
  value: string
  options: string[]
}

const Dropdown = ({ onChange, value, options }: DropdownProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const selectOption = (option: string) => () => {
    onChange(option)
    setIsFilterOpen(false)
  }

  return (
    <div className={styles.filterDropdownContainer} onMouseLeave={() => setIsFilterOpen(false)}>
      <div>
        <Button
          type="button"
          onClick={() => {
            setIsFilterOpen(!isFilterOpen)
          }}
          id="options-menu"
          aria-expanded="true"
          aria-haspopup="true"
          size="md"
          className={styles.dropdownButton}
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
        </Button>
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
          {options.map(option => (
            <button
              key={option}
              className={styles.dropdownContentItem}
              role="menuitem"
              onClick={selectOption(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dropdown
