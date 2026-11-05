"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./login.module.css";
import { useSessao } from "@/lib/sessao";

function FormLogin() {
    const router = useRouter();
    const parametros = useSearchParams();
    const { entrar } = useSessao();

    // ?tipo=cliente e ?voltar=/servico/3 vêm de páginas que exigem login
    const [tipoUsuario, setTipoUsuario] = useState(parametros.get("tipo") ?? "");
    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(false);

    async function fazerLogin(event) {
        event.preventDefault();
        setErro("");

        if (!tipoUsuario) {
            setErro("Selecione Cliente ou Profissional.");
            return;
        }

        const formulario = new FormData(event.currentTarget);

        try {
            setCarregando(true);
            await entrar(formulario.get("email"), formulario.get("senha"), tipoUsuario);

            const voltar = parametros.get("voltar");
            const destinoPadrao = tipoUsuario === "cliente" ? "/inicioCliente" : "/inicioProfissional";
            // só aceita caminhos internos ("/...") para evitar redirecionar para outro site
            router.push(voltar?.startsWith("/") && !voltar.startsWith("//") ? voltar : destinoPadrao);
        } catch (e) {
            setErro(e.message);
            setCarregando(false);
        }
    }

    return (
        <main className="d-flex flex-column flex-lg-row flex-grow-1">
            {/* Lado esquerdo */}
            <div className={`d-flex flex-column ${styles.sideBanner}`}>
                <div className="d-flex flex-column gap-4">
                    <h1 className="text-center">ConectaPRO</h1>
                    <h2 className={styles.textoBanner}>Conectando clientes aos melhores profissionais autônomos.</h2>
                    <p className={styles.textoBanner}>
                        Encontre eletricistas, diaristas, pedreiros, encanadores e muitos outros
                        profissionais verificados em um único lugar.
                    </p>
                </div>

                <div className="mt-4">
                    <p><i className="bi bi-patch-check-fill me-2"></i>Profissionais verificados.</p>
                    <p><i className="bi bi-clock-history me-2"></i>Histórico de todos os seus serviços.</p>
                    <p className="mb-0"><i className="bi bi-clipboard-check me-2"></i>Acompanhamento da contratação.</p>
                </div>
            </div>

            {/* Lado direito */}
            <div className={`d-flex align-items-center justify-content-center ${styles.loginForm}`}>
                <form onSubmit={fazerLogin} className="d-flex flex-column gap-4 w-100" style={{ maxWidth: 520 }}>
                    <div>
                        <h1 className="text-center">Entrar</h1>
                        <p className="text-center texto-suave">Faça login para acessar sua conta.</p>
                    </div>

                    <div className="d-flex gap-3 w-100" role="group" aria-label="Tipo de conta">
                        {["cliente", "profissional"].map((tipo) => (
                            <button
                                key={tipo}
                                type="button"
                                aria-pressed={tipoUsuario === tipo}
                                onClick={() => setTipoUsuario(tipo)}
                                className={`btn w-50 py-2 text-capitalize ${styles.btn} ${tipoUsuario === tipo ? styles.selecionado : ""}`}
                            >
                                {tipo}
                            </button>
                        ))}
                    </div>

                    <div>
                        <label htmlFor="email" className="form-label">E-mail</label>
                        <input type="email" name="email" id="email" className="form-control form-control-lg"
                            placeholder="Digite seu e-mail" autoComplete="email" required />
                    </div>

                    <div>
                        <label htmlFor="senha" className="form-label">Senha</label>
                        <input type="password" name="senha" id="senha" className="form-control form-control-lg"
                            placeholder="Digite sua senha" autoComplete="current-password" required />
                    </div>

                    {erro && <p className="text-danger mb-0" role="alert">{erro}</p>}

                    <button type="submit" disabled={carregando} className={`btn py-2 ${styles.selecionado}`}>
                        {carregando ? "Entrando..." : "Acessar"}
                    </button>

                    <p className="text-center mb-0">
                        Ainda não tem uma conta?{" "}
                        <Link href="/criarContaCliente">Cadastre-se</Link> ou{" "}
                        <Link href="/criarContaProfissional">seja um profissional</Link>
                    </p>
                </form>
            </div>
        </main>
    );
}

// useSearchParams precisa estar dentro de um <Suspense> para o "next build" funcionar
export default function Login() {
    return (
        <Suspense>
            <FormLogin />
        </Suspense>
    );
}
