import styles from "./login.module.css";
import BarraNavegacao from "@/components/BarraNavegacao";
import Link from "next/link";

export default function login(){
    return (
        <>
            <main style={{backgroundColor: "#F8FAFC"}}>
                <BarraNavegacao botaoUm="Cadastre-se" botaoDois="Cadastre-se como profissional" botaoTres="Entrar"></BarraNavegacao>

                <section className="d-flex">
                    <div className={`d-flex flex-column justify-content-around ${styles.sideBanner}`}>
                        <div className="d-flex flex-column gap-4">
                            <h1 className="text-center">ConectaPRO</h1>
                            <h2 className="w-75">Conectando clientes aos melhores profissionais autônomos.</h2>
                            <p className="w-75">Encontre eletricistas, diaristas, pedreiros, encanadores e muitos outros profissionais verificados em um único lugar.</p>
                        </div>
                        <div>
                            <p>✔️ Profissionais verificados.</p>
                            <p>⭐ Avaliações e histórico de serviços.</p>
                            <p>💬 Chat e acompanhamento da contratação.</p>
                        </div>
                    </div>

                    <div className={`d-flex flex-column ${styles.loginForm}`}>
                        <div>
                            <h1 className="text-center">Entrar</h1>
                            <p className="text-center">Faça login para acessar sua conta.</p>
                        </div>
                        <div className="d-flex justify-content-around">
                            <Link href="" className={`btn ${styles.btn}`}>Cliente</Link>
                            <Link href="" className={`btn ${styles.btn}`}>Profissional</Link>
                        </div>
                        <div>
                            
                        </div>
                        <Link href="" className={`btn ${styles.btn}`}>Acessar</Link>
                    </div>
                </section>
            </main>
        </>
    )
}