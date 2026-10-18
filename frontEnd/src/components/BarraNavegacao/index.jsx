import styles from "./barraNavegacao.module.css";
import Link from "next/link";

export default function BarraNavegacao(){
    return(
        <header>                                 
            <nav className={"navbar navbar-expand-lg d-flex align-items-center justify-content-between px-5 shadow-lg p-3 py-1" }>
                <Link href="/"><img className="navbar-brand ms-5" src="/logo.png" style={{ width: "200px", height: "auto" }}></img></Link>
                <div className="d-flex align-items-center justify-content-center gap-4 me-5">
                    <Link href="/criarContaCliente" className={`navbar-brand btn ${styles.btnUm}`}>Cadastre-se</Link>
                    <Link href="/criarContaProfissional/dadosPessoais" className={`navbar-brand btn ${styles.btnDois}`}>Cadastre-se como profissional</Link>
                    <Link href="/login" className={`navbar-brand btn ${styles.btnTres}`}>Entrar</Link>
                </div>
            </nav>
        </header>
    )
}