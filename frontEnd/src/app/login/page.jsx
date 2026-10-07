import styles from "./login.module.css";

import BarraNavegacao from "@/components/BarraNavegacao";
import Link from "next/link";

export default function Login() {
    return (
        <main style={{ backgroundColor: "#F8FAFC" }}>

            <BarraNavegacao
                botaoUm="Cadastre-se"
                botaoDois="Cadastre-se como profissional"
                botaoTres="Entrar"
            />

            <section className="d-flex">

                {/* Lado esquerdo */}
                <div className={`d-flex flex-column ${styles.sideBanner}`}>

                    <div className="d-flex flex-column gap-4">

                        <h1 className="text-center">
                            ConectaPRO
                        </h1>

                        <h2 className="w-75">
                            Conectando clientes aos melhores profissionais autônomos.
                        </h2>

                        <p className="w-75">
                            Encontre eletricistas, diaristas, pedreiros,
                            encanadores e muitos outros profissionais
                            verificados em um único lugar.
                        </p>

                    </div>

                    <div>
                        <p>✔️ Profissionais verificados.</p>
                        <p>⭐ Avaliações e histórico de serviços.</p>
                        <p>💬 Chat e acompanhamento da contratação.</p>
                    </div>

                </div>


                {/* Lado direito */}
                <div className={`d-flex flex-column gap-5 ${styles.loginForm}`}>

                    <div>
                        <h1 className="text-center">
                            Entrar
                        </h1>

                        <p className="text-center">
                            Faça login para acessar sua conta.
                        </p>
                    </div>


                    <div className="d-flex justify-content-between gap-5 w-100">

                        <Link
                            href=""
                            className={`btn w-50 py-3 fs-5 ${styles.btn}`}
                        >
                            Cliente
                        </Link>

                        <Link
                            href=""
                            className={`btn w-50 py-3 fs-5 ${styles.btn}`}
                        >
                            Profissional
                        </Link>

                    </div>


                    <div className="d-flex flex-column gap-4">

                        <div className="form-group">

                            <label htmlFor="nome">
                                Nome
                            </label>

                            <input
                                type="text"
                                className="form-control form-control-lg"
                                id="nome"
                                placeholder="Digite seu nome"
                            />

                        </div>


                        <div className="form-group">

                            <label htmlFor="senha">
                                Senha
                            </label>

                            <input
                                type="password"
                                className="form-control form-control-lg"
                                id="senha"
                                placeholder="Digite sua senha"
                            />

                            <p>
                                Ainda não tem uma conta?
                            </p>

                        </div>

                    </div>


                    <Link
                        href=""
                        className={`btn py-3 fs-5 ${styles.btn}`}
                    >
                        Acessar
                    </Link>

                </div>

            </section>

        </main>
    );
}