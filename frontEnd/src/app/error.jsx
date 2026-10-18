'use client';
 
import styles from "./error.module.css";
 
export default function Error({ retry }) {
  return (
    <main className="d-flex flex-column align-items-center justify-content-center gap-3">
      <h2>Algo errado aconteceu!</h2>
      <button onClick={() => retry()} className={`btn ${styles.retry}`}>
        Tentar novamente
      </button>
    </main>
  )
}