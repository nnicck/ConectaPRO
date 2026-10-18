import Link from 'next/link';
import styles from "./not-found.module.css";
 
export default function NotFound() {
  return (
    <main className="d-flex flex-column align-items-center justify-content-center gap-3">
      <h1>Erro 404</h1>
      <p>Conteúdo não encontrado!</p>
      <Link href="/" className={`btn ${styles.back}`}>Voltar</Link>
    </main>
  )
}