"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import EtapasServico from "@/components/EtapasServico";

const API = "http://localhost:3001/api";

const ETAPAS = ["Pagamento confirmado", "Serviço confirmado", "A caminho", "Chegou", "Concluído"];

// Quantas etapas já foram cumpridas em cada status do contrato.
// "a caminho" e "chegou" ainda não são definidos por nenhuma tela: precisam ser marcados pelo profissional.
const ETAPAS_CUMPRIDAS = {
    "pendente": 0,
    "em andamento": 2,
    "a caminho": 3,
    "chegou": 4,
    "concluído": 5,
    "cancelado": 0,
};

const STATUS_NAO_CANCELAVEIS = ["concluído", "cancelado"];

function formatarData(data) {
    return new Date(data).toLocaleDateString("pt-BR", { timeZone: "UTC" });
}

function formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function Estrelas({ media, total }) {
    if (total === 0 || media === null) {
        return <span className="text-muted">Sem avaliações</span>;
    }

    return (
        <span className="d-flex align-items-center gap-2">
            <span aria-hidden="true">
                {[1, 2, 3, 4, 5].map((numero) => (
                    <span
                        key={numero}
                        style={{ fontSize: "30px", color: numero <= Math.round(media) ? "#000" : "#ccc" }}
                    >
                        ★
                    </span>
                ))}
            </span>
            <span className="fs-5">
                {media.toFixed(1)} ({total})
            </span>
        </span>
    );
}

export default function AcompanharServico() {
    const params = useParams();

    const [acompanhamento, setAcompanhamento] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [msgErro, setMsgErro] = useState("");

    const [cancelando, setCancelando] = useState(false);
    const [msgCancelamento, setMsgCancelamento] = useState("");

    useEffect(() => {
        async function carregar() {
            try {
                const resposta = await fetch(`${API}/contrato/${params.id}/acompanhamento`, {
                    credentials: "include",
                });
                const resultado = await resposta.json();

                if (!resposta.ok) {
                    throw new Error(resultado.erro || "Não foi possível carregar o serviço.");
                }

                setAcompanhamento(resultado.dados);
                setMsgErro("");
            } catch (erro) {
                setMsgErro(
                    erro instanceof TypeError
                        ? "Não foi possível conectar ao servidor. Tente novamente mais tarde."
                        : erro.message
                );
            } finally {
                setCarregando(false);
            }
        }

        if (params.id) {
            carregar();
        }
    }, [params.id]);

    async function cancelarServico() {
        if (!window.confirm("Tem certeza que deseja cancelar este serviço?")) {
            return;
        }

        try {
            setCancelando(true);
            setMsgCancelamento("");

            const resposta = await fetch(`${API}/contrato/${params.id}/cancelar`, {
                method: "PATCH",
                credentials: "include",
            });
            const resultado = await resposta.json();

            if (!resposta.ok) {
                throw new Error(resultado.erro || "Não foi possível cancelar o serviço.");
            }

            setAcompanhamento((atual) => ({ ...atual, status: resultado.dados.status }));
        } catch (erro) {
            setMsgCancelamento(
                erro instanceof TypeError
                    ? "Não foi possível conectar ao servidor. Tente novamente mais tarde."
                    : erro.message
            );
        } finally {
            setCancelando(false);
        }
    }

    if (carregando) {
        return <p className="container mt-4">Carregando serviço...</p>;
    }

    if (msgErro) {
        return (
            <main className="container py-4">
                <p className="text-danger">{msgErro}</p>
                <Link href="/inicioCliente">Voltar para minha conta</Link>
            </main>
        );
    }

    const { servico, profissional } = acompanhamento;
    const cancelado = acompanhamento.status === "cancelado";
    const podeCancelar = !STATUS_NAO_CANCELAVEIS.includes(acompanhamento.status);
    const cumpridas = ETAPAS_CUMPRIDAS[acompanhamento.status] ?? 0;

    return (
        <main className="container py-4" style={{ maxWidth: "960px" }}>
            <Link href="/inicioCliente" className="text-decoration-none text-dark fs-5">
                ‹ Voltar
            </Link>

            <h1 className="text-center fw-bold h2 my-4">Acompanhamento do Serviço</h1>

            {cancelado && (
                <div className="alert alert-secondary text-center" role="status">
                    Este serviço foi cancelado.
                </div>
            )}

            <div className="my-5">
                <EtapasServico etapas={ETAPAS} cumpridas={cumpridas} />
            </div>

            <section className="mb-5">
                <h2 className="h5 fw-bold mb-4">Profissional contratado</h2>

                <div className="d-flex flex-wrap align-items-start gap-4">
                    <div className="position-relative" style={{ width: "216px", height: "216px" }}>
                        <img
                            src={profissional.foto || "/avatar.png"}
                            alt={profissional.nome}
                            className="rounded-circle w-100 h-100"
                            style={{ objectFit: "cover" }}
                        />
                        <span
                            className="position-absolute d-flex align-items-center justify-content-center rounded-circle bg-dark text-white"
                            style={{ width: "40px", height: "40px", right: "0", bottom: "0" }}
                            aria-hidden="true"
                        >
                            ✓
                        </span>
                    </div>

                    <div className="d-flex flex-column gap-2 fs-5">
                        <span className="fs-4">{profissional.nome}</span>
                        <span>{profissional.profissao}</span>
                        <div className="d-flex flex-wrap column-gap-5">
                            <span>Telefone: {profissional.telefone}</span>
                            <span>E-mail: {profissional.email}</span>
                        </div>
                        <Estrelas media={profissional.media_estrelas} total={profissional.total_avaliacoes} />
                    </div>
                </div>
            </section>

            <section className="mb-5">
                <h2 className="h5 fw-bold mb-4">Serviço solicitado</h2>

                <div className="d-flex flex-column gap-3 fs-5">
                    <span>{servico.titulo}</span>
                    {acompanhamento.observacao && (
                        <span className="text-secondary fs-6">{acompanhamento.observacao}</span>
                    )}
                    <span>Agendado para {formatarData(acompanhamento.data_contrato)}</span>
                    <span>Endereço: {acompanhamento.local || "Não informado"}</span>
                    <span>
                        Valor do serviço: <strong>{formatarPreco(servico.preco)}</strong>
                    </span>
                </div>
            </section>

            {podeCancelar && (
                <div className="mx-auto text-center" style={{ maxWidth: "600px" }}>
                    <button
                        type="button"
                        className="btn text-white w-100 py-3 fs-5"
                        style={{ backgroundColor: "#10182c" }}
                        onClick={cancelarServico}
                        disabled={cancelando}
                    >
                        {cancelando ? "Cancelando..." : "Cancelar serviço"}
                    </button>

                    {msgCancelamento && <p className="text-danger mt-3 mb-0">{msgCancelamento}</p>}
                </div>
            )}
        </main>
    );
}
