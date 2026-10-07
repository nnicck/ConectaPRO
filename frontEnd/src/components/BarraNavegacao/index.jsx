import Link from "next/link";
import styles from "./barraNavegacao.module.css";
export default function BarraNavegacao({botaoUm, botaoDois, botaoTres}){
    return(
        <>
        <nav  className={"navbar navbar-expand-lg d-flex align-items-center justify-content-between px-5 shadow-lg p-3 py-1" }>
            <img className="navbar-brand ms-5" src="/logo.png" style={{ width: "200px", height: "auto" }}></img>
            <div className="d-flex align-items-center justify-content-center gap-4 me-5">
                <a className={`navbar-brand btn ${styles.btnUm}`}  href="#">{botaoUm}</a>
                <a className={`navbar-brand btn ${styles.btnDois}`} href="#">{botaoDois}</a>
                <a className={`navbar-brand btn ${styles.btnTres}`} href="#">{botaoTres}</a>
            </div>
        </nav> 
        </>
    )
}