import Image from "next/image";
import styles from "./page.module.css";
import BarraNavegacao from "@/components/BarraNavegacao";

export default function Home() {
  return (
    <>
    <main style={{backgroundColor: "#eff2f4"}}>

    {/* <header>
          <nav  className={`navbar navbar-expand-lg d-flex align-items-center justify-content-between px-5 shadow-lg p-3" ${styles.menu} py-4`}>
              <a className="navbar-brand ms-5" href="#">Navbar</a>
              <div className="d-flex align-items-center justify-content-center gap-4 me-5">
                <a className={`navbar-brand btn ${styles.btn}`} href="#">Cadastre-se</a>
                <a className={`navbar-brand btn ${styles.btn}`} href="#">Cadastre-se como profissional</a>
                <a className={`navbar-brand btn ${styles.btnEntrar}`} href="#">Entrar</a>
              </div>
          </nav>  
    </header> */}

    <header>
      <BarraNavegacao botaoUm="Cadastre-se" botaoDois="Cadastre-se como profissional" botaoTres="Entrar"></BarraNavegacao>
    </header>

    {/* banner */}
    <div className="container-fluid" style={{height: "600px", backgroundColor: "#0F172A"}}>
      <div className="container py-5">
        <div className="row align-items-center mt-4">
          <div className="col-xl-7">
            <h1 className="display-5 fw-bold text-dark mb-4 text-white">Encontre o profissional ideal 
            para o que você precisa.</h1>
            <p className="fs-5 text-muted">
              Conectamos você a diaristas, eletricistas, pedreiros e diversos 
              autônomos verificados, com praticidade e segurança.
            </p>
              <form className="d-flex gap-3 mt-4">
                <div className="input-group w-100">

                <input
                  type="text"
                  className="form-control border-0 rounded-1 py-3 shadow"
                  placeholder="O que você precisa?"
                />

                <button
                  type="submit"
                  className="btn btn-primary fw-bold px-4 rounded-1 ms-3 shadow"
                >
                  Buscar
                </button>
              </div>
              
            </form>
          </div>
        </div>
      </div>
    </div>

    <div className="container py-4">
    <h3 className="text-center fw-bold mb-4">Serviços Disponíveis</h3>
        <div className="col-12 col-md-6 col-lg-3">
          <div className="card h-100 rounded-2">
            <div className="card-body">
              <div className="text-center mb-2">
                  <img src="/diarista.png" alt="Diarista" width="64" height="64"/>
              </div>
              <h5 className="card-title">Diarista</h5>
              <p className="text-primary small">Limpeza residencial e comercial</p>
              <p className="small mb-0"> A partir de <span className="text-primary fw-bold ms-1"> R$80,00</span></p>
            </div>
          </div>
        </div>
    </div>
    </main>


    </>
  );
}
