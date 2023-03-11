import { ofetch } from "ofetch";
import { memo, useEffect, useRef, useState } from "react";
import { SD_APIS } from "../../constants/apis";
import testEndpoint from "../../utils/test-endpoint";
import styles from "./index.module.css"

export default function Endpoint() {
  const [endpoint, setEndpoint] = useState("");
  const [info, setInfo] = useState<{
    memory: string;
  }>({
    memory: "0",
  });
  const statusRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const endpoint = localStorage.getItem("endpoint");
    if (endpoint) {
      setEndpoint(endpoint);
    }
    const interval = setInterval(() => {
      const endpoint = localStorage.getItem("endpoint");
      ofetch(`${endpoint}/${SD_APIS.GetMemory}`).then((res) => {
        setInfo({
          memory: (res.ram.total / res.ram.free).toFixed(2),
        })
      });
    }, 5000);
    return () => {
      clearInterval(interval);
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
          <div>Using memory: {info.memory}%</div>
        </p>
      </div>
    </div>
  )
}