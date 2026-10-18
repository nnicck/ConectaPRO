"use client";

import { useState } from "react";
import styles from "./login.module.css";
import Link from "next/link";

export default function Login() {
    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(false);
    const [tipoUsuario, setTipoUsuario] = useState("");

    async function fazerLogin(event) {
        event.preventDefault();
        setErro("");
        setCarregando(true);

        const formulario = new FormData(event.currentTarget);

        try {
            const resposta = await fetch(
                "http://localhost:3001/api/autenticar/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        email: formulario.get("email"),
                        senha: formulario.get("senha"),
                    }),
                }
            );

            const resultado = await resposta.json();

            if (!resposta.ok) {
                throw new Error(
                    resultado.erro || resultado.mensagem ||
                    "Não foi possível realizar o login."
                );
            }

            if (!tipoUsuario) {
                setErro("Selecione Cliente ou Profissional.");
                return;
            }

            if (resultado.dados.tipo !== tipoUsuario) {
                setErro("O e-mail informado não pertence a esse tipo de conta.");
                return;
            }

            if (tipoUsuario === "cliente") {
                window.location.href = "/inicioCliente";
            } else {
                window.location.href = "/inicioProfissional";
            }
        } catch (erro) {
            setErro(erro.message || "Erro ao conectar com o servidor.");
        } finally {
            setCarregando(false);
        }
    }

    return (
        <main className="d-flex">

            {/* Lado esquerdo */}
            <div className={`d-flex flex-column ${styles.sideBanner}`}>
                <div className="d-flex flex-column gap-4">
                    <h1 className="text-center">ConectaPRO</h1>
                    <h2 className="w-75">Conectando clientes aos melhores profissionais autônomos.</h2>
                    <p className="w-75">
                        Encontre eletricistas, diaristas, pedreiros,
                        encanadores e muitos outros profissionais verificados
                        em um único lugar.
                    </p>
                </div>

                <div>
                    <p>✔️ Profissionais verificados.</p>
                    <p>⭐ Avaliações e histórico de serviços.</p>
                    <p>💬 Chat e acompanhamento da contratação.</p>
                </div>
            </div>

            {/* Lado direito */}
            <div className={`d-flex align-items-center justify-content-center ${styles.loginForm}`}>
                <form onSubmit={fazerLogin} className="d-flex flex-column gap-5 w-100">
                    <div>
                        <h1 className="text-center">Entrar</h1>
                        <p className="text-center">Faça login para acessar sua conta.</p>
                    </div>
                    <div className="d-flex justify-content-between gap-5 w-100">
                        <button 
                            type="button" 
                            onClick={() => setTipoUsuario("cliente")} 
                            className={`btn w-50 py-3 fs-5 ${styles.btn} ${tipoUsuario === "cliente" ? styles.selecionado : ""}`}
                        >
                            Cliente
                        </button>
                        <button
                            type="button"
                            onClick={() => setTipoUsuario("profissional")}
                            className={`btn w-50 py-3 fs-5 ${styles.btn} ${tipoUsuario === "profissional" ? styles.selecionado : ""}`}
                        >
                            Profissional
                        </button>
                    </div>
                    <div className="d-flex flex-column gap-4">
                        <div className="form-group">
                            <label htmlFor="email">E-mail</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control form-control-lg"
                                id="email"
                                placeholder="Digite seu e-mail"
                                autoComplete="email"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="senha">Senha</label>
                            <input
                                type="password"
                                name="senha"
                                className="form-control form-control-lg"
                                id="senha"
                                placeholder="Digite sua senha"
                                autoComplete="current-password"
                                required
                            />
                        </div>
                        <p>Ainda não tem uma conta? <Link href="/cadastro">Cadastre-se</Link></p>

                        {erro && (
                            <p className="text-danger" role="alert">
                                {erro}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={carregando}
                        className={`btn py-3 fs-5 ${styles.selecionado}`}
                    >
                        {carregando ? "Entrando..." : "Acessar"}
                    </button>
                </form>
            </div>
        </main>
    );
}