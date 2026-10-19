"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./barraNavegacao.module.css";

export default function BarraNavegacao() {
    const [usuario, setUsuario] = useState(null);
    const [verificando, setVerificando] = useState(true);

    useEffect(() => {
        async function verificarSessao() {
            try {
                const resposta = await fetch(
                    "http://localhost:3001/api/autenticar/me",
                    { credentials: "include" }
                );

                if (!resposta.ok) {
                    setUsuario(null);
                    return;
                }

                const resultado = await resposta.json();
                
                setUsuario(resultado.dados ?? null);
            } catch (erro) {
                console.error("Erro ao verificar sessão:", erro);
                setUsuario(null);
            } finally {
                setVerificando(false);
            }
        }

        verificarSessao();
    }, []);

    async function sair() {
        try {
            const resposta = await fetch(
                "http://localhost:3001/api/autenticar/logout",
                {
                    method: "POST",
                    credentials: "include"
                }
            );

            if (!resposta.ok) {
                throw new Error("Não foi possível encerrar a sessão.");
            }

            setUsuario(null);
            window.location.href="/"
        } catch (erro) {
            console.error("Erro ao sair:", erro);
        }
    }

    return (
        <header>
            <nav className="navbar navbar-expand-lg d-flex align-items-center justify-content-between px-5 shadow-lg p-3 py-1">
                <Link href="/">
                    <img
                        className="navbar-brand ms-5"
                        src="/logo.png"
                        alt="ConectaPro"
                        style={{ width: "200px", height: "auto" }}
                    />
                </Link>

                <div className="d-flex align-items-center justify-content-center gap-4 me-5">
                    {!verificando && !usuario && (
                        <>
                            <Link href="/criarContaCliente" className={`navbar-brand btn ${styles.btnUm}`}>Cadastre-se</Link>
                            <Link href="/criarContaProfissional" className={`navbar-brand btn ${styles.btnDois}`}>Cadastre-se como profissional</Link>
                            <Link href="/login" className={`navbar-brand btn ${styles.btnTres}`}
                            >Entrar</Link>
                        </>
                    )}

                    {usuario?.tipo === "cliente" && (
                        <>
                            <Link href="/inicioCliente" className={`navbar-brand btn ${styles.btnUm}`}>Minha conta</Link>
                            <button onClick={sair} className={`navbar-brand btn ${styles.btnSair}`}>Sair</button>
                        </>
                    )}

                    {usuario?.tipo === "profissional" && (
                        <>
                            <Link href="/inicioProfissional" className={`navbar-brand btn ${styles.btnUm}`}>Meu painel</Link>
                            <button onClick={sair} className={`navbar-brand btn ${styles.btnSair}`}>Sair</button>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
}
