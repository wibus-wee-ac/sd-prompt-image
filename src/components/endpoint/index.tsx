import { useEffect, useRef, useState } from "react";
import { useSnapshot } from "valtio";
import { SD_APIS } from "../../constants/apis";
import { AppState } from "../../states/app";
import { Requester } from "../../utils/request";
import testEndpoint from "../../utils/test-endpoint";
import styles from "./index.module.css"

export default function Endpoint() {
  const [endpoint, setEndpoint] = useState("");
  const { options } = useSnapshot(AppState)
  const statusRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const endpoint = localStorage.getItem("endpoint");
    if (endpoint) {
      setEndpoint(endpoint);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("endpoint", endpoint);
    const statusEl = statusRef.current!;
    statusEl.innerText = "⏳";
    testEndpoint(endpoint).then((status) => {
      if (status) {
        statusEl.innerText = "✅";
      } else {
        statusEl.innerText = "❌";
      }
    }
    );
    // Requester(SD_APIS.GetOptions).then(setInfo);
  }, [endpoint]);

  return (
    <div className={styles["endpoint"]}>
      <div className={styles["card"]}>
        <h2>Endpoint</h2>
        <p className="">Enter the endpoint of the Stable Diffusion API</p>
        <input type="text" value={endpoint} onChange={(e) => setEndpoint(e.target.value)} style={{
          width: "200px",
        }} />
        <span className={styles["status"]} ref={statusRef} />
        <p className={styles["info"]}>
          <p>You are using <strong>{options?.sd_model_checkpoint}</strong> as the model checkpoint.</p>
        </p>
      </div>
    </div>
  )
}