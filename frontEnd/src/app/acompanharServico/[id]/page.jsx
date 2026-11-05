"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import EtapasServico from "@/components/EtapasServico";
import Avatar from "@/components/ui/Avatar";
import StatusBadge from "@/components/ui/StatusBadge";
import { useConfirmar } from "@/components/ui/Confirmar";
import { Alerta, Carregando } from "@/components/ui/Mensagem";
import { api } from "@/lib/api";
import { formatarData, formatarPreco, formatarTelefone } from "@/lib/formatar";
import { useSessao } from "@/lib/sessao";

// Etapas mostradas na barra de progresso
const ETAPAS = ["Solicitado", "Aceito pelo profissional", "Em andamento", "Concluído"];

// Quantas etapas já foram cumpridas em cada status do contrato
const ETAPAS_CUMPRIDAS = {
    "pendente": 1,
    "aceito": 2,
    "em andamento": 3,
    "concluído": 4,
    "recusado": 1,
    "cancelado": 1
};

// Nestes status o cliente não pode mais cancelar
const STATUS_NAO_CANCELAVEIS = ["concluído", "cancelado", "recusado"];

// Acompanhamento de um pedido: /acompanharServico/[id]
// Pode ser aberto pelo cliente que pediu ou pelo profissional que recebeu o pedido.
export default function AcompanharServico() {
    const { id } = useParams();
    const { usuario, liberado } = useSessao();

    const [acompanhamento, setAcompanhamento] = useState(null);
    const [msgErro, setMsgErro] = useState("");
    const [cancelando, setCancelando] = useState(false);
    const [msgCancelamento, setMsgCancelamento] = useState("");
    const [confirmar, janelaConfirmar] = useConfirmar();

    // Busca os dados do pedido (contrato + serviço + profissional + cliente)
    const carregar = useCallback(async () => {
        try {
            setAcompanhamento(await api(`/contrato/${id}/acompanhamento`));
            setMsgErro("");
        } catch (erro) {
            setMsgErro(erro.message);
        }
    }, [id]);

    useEffect(() => {
        if (liberado) carregar();
    }, [liberado, carregar]);

    // Cliente cancela o pedido (pergunta antes com o pop-up)
    async function cancelarServico() {
        const ok = await confirmar({
            titulo: "Cancelar serviço",
            mensagem: "Tem certeza que deseja cancelar este serviço? O pedido aparecerá como cancelado para o profissional e não poderá ser reaberto.",
            botao: "Cancelar serviço",
            cancelar: "Manter pedido"
        });
        if (!ok) return;

        try {
            setCancelando(true);
            setMsgCancelamento("");
            await api(`/contrato/${id}/cancelar`, { metodo: "PATCH" });
            await carregar();
        } catch (erro) {
            setMsgCancelamento(erro.message);
        } finally {
            setCancelando(false);
        }
    }

    // ---------- Estados da tela antes de ter os dados ----------
    if (liberado && !usuario) {
        return (
            <main className="container py-5">
                <p>Você precisa entrar para acompanhar este serviço.</p>
                <Link href={`/login?voltar=/acompanharServico/${id}`} className="btn btn-primary">Entrar</Link>
            </main>
        );
    }

    const ehCliente = usuario?.tipo === "cliente";
    const voltar = ehCliente ? "/inicioCliente" : "/inicioProfissional/solicitacoesProfissional";

    if (msgErro) {
        return (
            <main className="container py-5">
                <Alerta>{msgErro}</Alerta>
                <Link href={voltar}>Voltar</Link>
            </main>
        );
    }

    if (!acompanhamento) {
        return <main className="container py-5"><Carregando texto="Carregando serviço..." /></main>;
    }

    // ---------- Dados prontos ----------
    const { servico, profissional, cliente } = acompanhamento;
    const encerrado = ["cancelado", "recusado"].includes(acompanhamento.status);
    const podeCancelar = ehCliente && !STATUS_NAO_CANCELAVEIS.includes(acompanhamento.status);

    // O cliente vê os dados do profissional; o profissional vê os dados do cliente
    const outraPessoa = ehCliente ? profissional : cliente;

    return (
        <main className="container py-5" style={{ maxWidth: "960px" }}>
            <Link href={voltar} className="text-decoration-none texto-suave"><i className="bi bi-arrow-left me-1"></i>Voltar</Link>

            <h1 className="text-center fw-bold h3 my-4">Acompanhamento do serviço</h1>

            {encerrado && (
                <div className="alert alert-secondary text-center" role="status">
                    Este serviço foi {acompanhamento.status}.
                </div>
            )}

            {/* Barra de etapas */}
            <div className={`card-cp p-4 mb-4 ${encerrado ? "opacity-50" : ""}`}>
                <EtapasServico etapas={ETAPAS} cumpridas={ETAPAS_CUMPRIDAS[acompanhamento.status] ?? 0} />
            </div>

            <div className="row g-4 mb-4">
                {/* Quem está do outro lado do pedido */}
                <section className="col-md-6">
                    <div className="card-cp p-4 h-100">
                        <h2 className="titulo-secao">{ehCliente ? "Profissional contratado" : "Cliente"}</h2>

                        <div className="d-flex align-items-center gap-3">
                            <Avatar src={outraPessoa.foto} nome={outraPessoa.nome} tamanho={72} />
                            <div className="min-w-0">
                                {ehCliente ? (
                                    <>
                                        <Link href={`/perfilProfissional/${profissional.id_profissional}`} className="fw-semibold text-dark">{profissional.nome}</Link>
                                        <div className="small text-primary">{profissional.profissao}</div>
                                    </>
                                ) : (
                                    <div className="fw-semibold">{cliente.nome}</div>
                                )}
                            </div>
                        </div>

                        <div className="d-flex flex-column gap-1 small texto-suave mt-3">
                            <span><i className="bi bi-telephone me-2"></i>{formatarTelefone(outraPessoa.telefone)}</span>
                            <span className="text-break"><i className="bi bi-envelope me-2"></i>{outraPessoa.email}</span>
                        </div>
                    </div>
                </section>

                {/* Dados do pedido */}
                <section className="col-md-6">
                    <div className="card-cp p-4 h-100">
                        <h2 className="titulo-secao d-flex align-items-center justify-content-between gap-2">
                            Serviço solicitado <StatusBadge status={acompanhamento.status} />
                        </h2>
                        <div className="fw-semibold mb-1">{servico.titulo}</div>
                        {acompanhamento.observacao && <p className="small texto-suave mb-2">&ldquo;{acompanhamento.observacao}&rdquo;</p>}

                        <dl className="row small mb-0">
                            <dt className="col-5 texto-suave fw-normal">Agendado para</dt>
                            <dd className="col-7 mb-1">{formatarData(acompanhamento.data_contrato)}</dd>
                            {acompanhamento.data_conclusao && (
                                <>
                                    <dt className="col-5 texto-suave fw-normal">Concluído em</dt>
                                    <dd className="col-7 mb-1">{formatarData(acompanhamento.data_conclusao)}</dd>
                                </>
                            )}
                            <dt className="col-5 texto-suave fw-normal">Endereço</dt>
                            <dd className="col-7 mb-1">{acompanhamento.local || "Não informado"}</dd>
                            <dt className="col-5 texto-suave fw-normal">Valor</dt>
                            <dd className="col-7 mb-0 fw-bold">{formatarPreco(servico.preco)}</dd>
                        </dl>
                    </div>
                </section>
            </div>

            {/* Botão de cancelar (só para o cliente, enquanto o pedido estiver aberto) */}
            {podeCancelar && (
                <div className="mx-auto text-center" style={{ maxWidth: "420px" }}>
                    <button type="button" className="btn btn-outline-danger w-100 py-2" onClick={cancelarServico} disabled={cancelando}>
                        {cancelando ? "Cancelando..." : "Cancelar serviço"}
                    </button>
                    {msgCancelamento && <p className="text-danger mt-3 mb-0">{msgCancelamento}</p>}
                </div>
            )}

            {janelaConfirmar}
        </main>
    );
}
