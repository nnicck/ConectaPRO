"use client";

// Barra do topo do site. Os botões mudam conforme quem está logado
// (visitante, cliente ou profissional). No celular vira um menu "hambúrguer".

import { useState } from "react";
import Link from "next/link";
import { useSessao } from "@/lib/sessao";
import Avatar from "@/components/ui/Avatar";

export default function BarraNavegacao() {
    const { usuario, carregando, sair } = useSessao();
    const [menuAberto, setMenuAberto] = useState(false); // menu "hambúrguer" no celular

    return (
        <header className="bg-white border-bottom sticky-top py-3">
            <nav className="navbar navbar-expand-lg container-fluid px-3 px-lg-4 py-2">
                <Link href="/" className="navbar-brand">
                    <img src="/logo.png" alt="ConectaPRO" style={{ height: 44, width: "auto" }} />
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    aria-label="Abrir menu"
                    aria-expanded={menuAberto}
                    onClick={() => setMenuAberto(!menuAberto)}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={`collapse navbar-collapse justify-content-end ${menuAberto ? "show" : ""}`}>
                    <div className="d-flex flex-column flex-lg-row align-items-lg-center gap-2 gap-lg-3 py-2 py-lg-0" onClick={() => setMenuAberto(false)}>
                        <Link href="/buscarServicos" className="btn btn-link text-dark text-decoration-none">
                            <i className="bi bi-search me-1"></i> Buscar serviços
                        </Link>

                        {!carregando && !usuario && (
                            <>
                                <Link href="/criarContaCliente" className="btn btn-branco px-3">Cadastre-se</Link>
                                <Link href="/criarContaProfissional" className="btn btn-branco px-3">Cadastre-se como profissional</Link>
                                <Link href="/login" className="btn btn-primary fw-semibold px-5">Entrar</Link>
                            </>
                        )}

                        {usuario?.tipo === "cliente" && (
                            <>
                                <Link href="/inicioCliente" className="btn btn-branco d-flex align-items-center gap-2">
                                    <Avatar src={usuario.foto} nome={usuario.nome} tamanho={26} />
                                    Minha conta
                                </Link>
                                <button onClick={sair} className="btn btn-outline-danger">Sair</button>
                            </>
                        )}

                        {usuario?.tipo === "profissional" && (
                            <>
                                <Link href="/inicioProfissional" className="btn btn-branco d-flex align-items-center gap-2">
                                    <Avatar src={usuario.foto} nome={usuario.nome} tamanho={26} />
                                    Meu painel
                                </Link>
                                <button onClick={sair} className="btn btn-outline-danger">Sair</button>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
}
