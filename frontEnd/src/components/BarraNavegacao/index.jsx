import Link from "next/link";
import styles from "./barraNavegacao.module.css";
import Link from "next/link";

export default function BarraNavegacao({botaoUm, botaoDois, botaoTres}){
    return(
        <>
            <nav className={"navbar navbar-expand-lg d-flex align-items-center justify-content-between px-5 shadow-lg p-3 py-3" }>
                <Link href="/"><img className="navbar-brand ms-5" src="/logo.png" style={{ width: "200px", height: "auto" }}></img></Link>
                <div className="d-flex align-items-center justify-content-center gap-4 me-5">
                    <Link href="" className={`navbar-brand btn ${styles.btnUm}`}>{botaoUm}</Link>
                    <Link href="" className={`navbar-brand btn ${styles.btnDois}`}>{botaoDois}</Link>
                    <Link href="" className={`navbar-brand btn ${styles.btnTres}`}>{botaoTres}</Link>
                </div>
            </nav>
        </>
    )
}