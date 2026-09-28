import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>

    <header>
          <nav  className={`navbar navbar-expand-lg d-flex align-items-center justify-content-between px-5 shadow-lg p-3" ${styles.menu} py-4`}>
              <a className="navbar-brand ms-5" href="#">Navbar</a>
              <div className="d-flex align-items-center justify-content-center gap-4 me-5">
                <a className={`navbar-brand btn ${styles.btn}`} href="#">Cadastre-se</a>
                <a className={`navbar-brand btn ${styles.btn}`} href="#">Cadastre-se como profissional</a>
                <a className={`navbar-brand btn ${styles.btnEntrar}`} href="#">Entrar</a>
              </div>
        </nav>  
    </header>
    <main className="container mt-5">
      <h1 className="text-primary">ConectaPro</h1>

      <button className="btn btn-success">
        Teste Bootstrap
      </button>
    </main>
    </>
  );
}
