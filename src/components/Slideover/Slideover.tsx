import { useCallback, useEffect } from "react"
import styles from "./Slideover.module.scss"

export default function Slideover(props: { status: boolean; changeStatus: any; wojakId: number }) {
  const { status, changeStatus, wojakId } = props

  const escListener = useCallback(
    e => {
      if (e.key === "Escape") {
        changeStatus(false)
      }
    },
    [changeStatus],
  )

  useEffect(() => {
    window.addEventListener("keyup", escListener)
    return () => {
      window.removeEventListener("keyup", escListener)
    }
  }, [escListener])

  return (
    <>
      {status ? (
        <section className={styles.slideoverSection} role="dialog" aria-modal="true">
          <div className={styles.bgOverlayContainer} onClick={() => changeStatus(false)}>
            <div className={styles.bgOverlay} aria-hidden="true" />
            <div className={styles.slideoverContainer}>
              <div className={styles.slideover}>
                <div className={styles.slideoverPanel}>
                  <div className={styles.closeButtonContainer}>
                    <button onClick={() => changeStatus(false)} className={styles.closeButton}>
                      <span className={styles.screenReaderOnly}>Close panel</span>
                      <p className={styles.closeButtonText}>Close [x]</p>
                    </button>
                  </div>
                  <div className={styles.wojakInfoContainer}>
                    <div>
                      <div className={styles.wojakImgContainer}>
                        <img
                          src="https://cdn.discordapp.com/attachments/812822477683818527/825861306283589652/native-human.png"
                          alt=""
                          className={styles.wojakImg}
                        />
                      </div>
                      <div className={styles.wojakImgInfoContainer}>
                        <div>
                          <h2 className={styles.wojakImgId}>
                            <span className={styles.screenReaderOnly}>Details for </span>#{wojakId}
                          </h2>
                          <p className={styles.wojakImgArtist}>Created by Artist</p>
                        </div>
                      </div>
                    </div>
                    <div className={styles.wojakTraitsContainer}>
                      <h3 className={styles.wojakInfoTitle}>Traits</h3>
                      <dl className={styles.wojakTraitsDl}>
                        <div className={styles.wojakTraitContainer}>
                          <dt className={styles.wojakTraitDt}>Trait</dt>
                          <dd className={styles.wojakTraitDd}>#1</dd>
                        </div>
                        <div className={styles.wojakTraitContainer}>
                          <dt className={styles.wojakTraitDt}>Trait</dt>
                          <dd className={styles.wojakTraitDd}>#2</dd>
                        </div>
                        <div className={styles.wojakTraitContainer}>
                          <dt className={styles.wojakTraitDt}>Trait</dt>
                          <dd className={styles.wojakTraitDd}>#3</dd>
                        </div>
                      </dl>
                    </div>
                    <div className={styles.wojakTraitsContainer}>
                      <h3 className={styles.wojakInfoTitle}>History</h3>
                      <ul className={styles.historyList}>
                        <li className={styles.historyListItem}>
                          <div className={styles.historyListItemContent}>
                            <p className={styles.historyListItemText}>[BID] 3.5 ETH</p>
                          </div>
                          <button type="button" className={styles.historyListItemButton}>
                            0xhd...1357
                            <span className={styles.screenReaderOnly}> [BID] 3.5 ETH</span>
                          </button>
                        </li>
                        <li className={styles.historyListItem}>
                          <div className={styles.historyListItemContent}>
                            <p className={styles.historyListItemText}>[TRANSFER] 3.5 ETH</p>
                          </div>
                          <button type="button" className={styles.historyListItemButton}>
                            0xhd...1357
                            <span className={styles.screenReaderOnly}> [TRANSFER] 3.5 ETH</span>
                          </button>
                        </li>
                        <li className={styles.historyListItem}>
                          <div className={styles.historyListItemContent}>
                            <p className={styles.historyListItemText}>[SALE] 305 ETH</p>
                          </div>
                          <button type="button" className={styles.historyListItemButton}>
                            0xhd...1357
                            <span className={styles.screenReaderOnly}> [SALE] 305 ETH</span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </>
  )
}
