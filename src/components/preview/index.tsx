import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { useSnapshot } from "valtio";
import { AppState } from "../../states/app";
import { RuntimeState } from "../../states/runtime";
import testEndpoint from "../../utils/test-endpoint";
import styles from "./index.module.css"

export default function Preview() {
  const { images, started } = useSnapshot(RuntimeState)
  return (
    <div className={clsx(styles["preview"], started && styles["open"])}>
      <div className={styles["card"]}>
        <h2>Preview Result</h2>
        <div className={styles["images"]}>
          {
            images && images.map((image, index) => {
              return (
                <img key={index} src={`data:image/png;base64,${image}`} alt={`Preview ${index}`} className={styles["image"]} />
              )
            })
          }
          {
            !images.length && (
              <div className={styles["empty"]}>
                <span>Pending...</span>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}