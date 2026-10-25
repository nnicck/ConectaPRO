"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function InicioCliente() {
    const [usuario, setUsuario] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [listaContratos, setListaContratos] = useState([]);

    useEffect(() => {
        async function carregarDados() {
            try {
                // Verifica a sessão
                const respostaAutenticar = await fetch(
                    "http://localhost:3001/api/autenticar/me",
                    { credentials: "include" }
                );

                if (!respostaAutenticar.ok) {
                    setUsuario(null);
                    return;
                }

                const resultadoAutenticar = await respostaAutenticar.json();
                const usuarioLogado = resultadoAutenticar.dados;

                if (usuarioLogado.tipo !== "cliente") {
                    setUsuario(null);
                    return;
                }

                // Busca os dados completos do cliente
                const respostaCliente = await fetch(
                    `http://localhost:3001/api/cliente/${usuarioLogado.id}`,
                    { credentials: "include" }
                );

                if (!respostaCliente.ok) {
                    throw new Error("Não foi possível carregar os dados do cliente.");
                }

                const resultadoCliente = await respostaCliente.json();

                setUsuario({
                    ...usuarioLogado,
                    ...resultadoCliente.dados
                });

                const respostaContratos = await fetch(
                    "http://localhost:3001/api/contrato",
                    { credentials: "include" }
                );

                if (!respostaContratos.ok) {
                    throw new Error("Não foi possível carregar os contratos.");
                }

                const resultadoContratos = await respostaContratos.json();

                const contratosCliente = resultadoContratos.dados.filter(
                    contrato => contrato.id_cliente === usuarioLogado.id
                );

                setListaContratos(contratosCliente);
            } catch (erro) {
                console.error(erro);
                setUsuario(null);
            } finally {
                setCarregando(false);
            }
        }

        carregarDados();
    }, []);

    if (carregando) return <p>Verificando login...</p>;

    if (!usuario) return <p>Você não está logado.</p>;

    if (usuario.tipo !== "cliente") return <p>Esta página é exclusiva para clientes.</p>;
  
    return (
        <main className="d-flex flex-column gap-5 py-5">
            <section className="container-fluid d-flex align-items-center justify-content-start gap-4 px-5 w-75">
                <img src={usuario.foto ?? "avatar.png"} style={{ height: "200px", width: "200px" }} className="border border-2 border-dark rounded-circle"/>
                <div>
                    <h1>{usuario.nome}</h1>
                    <p>E-mail: {usuario.email}</p>
                    <p>Telefone: {usuario.telefone}</p>
                    <p>Endereço: {usuario.localizacao != "" && null ? usuario.localizacao : "Não informado"}</p>
                </div>
            </section>
            <section className="container-fluid d-flex flex-column px-5 gap-3 w-75">
                <h1>Atividade</h1>
                <div className="d-flex gap-5">
                    <div className="d-flex flex-column align-items-center">
                        <h1>{listaContratos.length}</h1>
                        <p>Serviços contratados</p>
                    </div>
                </div>
            </section>
            <section className="container-fluid d-flex flex-column px-5 gap-3 w-75 h-100">
                <h1>Serviços solicitados</h1>
                <div className="d-flex flex-wrap gap-4">
                    {listaContratos.map(contrato => (
                        <Link key={contrato.id_contrato} href={`/acompanharServico/${contrato.id_contrato}`} className="d-block text-decoration-none text-reset border border-1 border-dark rounded-5 overflow-hidden" style={{ width: "250px", minHeight: "250px" }}
                        >
                            <img src={contrato.foto ?? "imagem.png"} className="w-100 object-fit-contain" style={{ height: "160px" }}/>
                            <div className="p-3 border-top border-2 border-dark">
                                <h3 className="h5">{contrato.observacao}</h3>
                                <p className="mb-1">Status: {contrato.status}</p>
                                <p className="mb-0">
                                    Data: {new Date(contrato.data_contrato).toLocaleDateString("pt-BR", { timeZone: "UTC"})}
                                </p>
                            </div>
                        </Link>
                    ))}

                    {listaContratos.length === 0 && (
                        <p>Você ainda não solicitou nenhum serviço.</p>
                    )}
                </div>
                
            </section>
        </main>
    );
}