"use client";

// Solicitações recebidas: /inicioProfissional/solicitacoesProfissional
// O profissional aceita, recusa, inicia ou conclui os pedidos dos clientes.

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { useConfirmar } from "@/components/ui/Confirmar";
import Avatar from "@/components/ui/Avatar";
import StatusBadge from "@/components/ui/StatusBadge";
import { Alerta, Vazio } from "@/components/ui/Mensagem";
import { api } from "@/lib/api";
import { cidadeDoEndereco, formatarData, formatarPreco, formatarTelefone } from "@/lib/formatar";
import { combinaComBusca, usePainel } from "@/lib/painel";

// Abas do topo: quais status cada uma mostra
const ABAS = [
    { id: "todas", rotulo: "Todas", status: null },
    { id: "novas", rotulo: "Novas", status: ["pendente"] },
    { id: "aceitas", rotulo: "Aceitas", status: ["aceito", "em andamento", "concluído"] },
    { id: "recusadas", rotulo: "Recusadas", status: ["recusado", "cancelado"] }
];

// Pequeno bloco "rótulo / valor" do card (Cliente, Localização, Data)
function Info({ rotulo, valor }) {
    return (
        <div className="col-12 col-md-4">
            <div className="border rounded-3 px-3 py-2 h-100">
                <div className="small texto-suave">{rotulo}</div>
                <div className="fw-semibold text-truncate">{valor}</div>
            </div>
        </div>
    );
}

// Botões que aparecem conforme o status do pedido
function Acoes({ contrato, ocupado, aoExecutar, aoVerDetalhes }) {
    return (
        <div className="d-flex flex-wrap gap-2 mt-3">
            {contrato.status === "pendente" && (
                <>
                    <button className="btn btn-primary fw-semibold px-4" disabled={ocupado} onClick={() => aoExecutar(contrato, "aceitar")}>Aceitar pedido</button>
                    <button className="btn btn-dark fw-semibold px-4" disabled={ocupado} onClick={() => aoExecutar(contrato, "recusar")}>Recusar pedido</button>
                </>
            )}
            {contrato.status === "aceito" && (
                <button className="btn btn-primary fw-semibold px-4" disabled={ocupado} onClick={() => aoExecutar(contrato, "iniciar")}>Iniciar serviço</button>
            )}
            {["aceito", "em andamento"].includes(contrato.status) && (
                <button className="btn btn-success fw-semibold px-4" disabled={ocupado} onClick={() => aoExecutar(contrato, "concluir")}>Concluir serviço</button>
            )}
            {aoVerDetalhes && (
                <button className="btn btn-branco fw-semibold flex-grow-1" onClick={() => aoVerDetalhes(contrato)}>Ver detalhes</button>
            )}
        </div>
    );
}

export default function SolicitacoesProfissional() {
    const { contratos, busca, recarregar } = usePainel();

    const [aba, setAba] = useState("todas");
    const [detalhe, setDetalhe] = useState(null);
    const [processando, setProcessando] = useState(null);
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState("");
    const [confirmar, janelaConfirmar] = useConfirmar();

    // aceitar | recusar | iniciar | concluir
    async function executar(contrato, acao) {
        if (acao === "recusar") {
            const ok = await confirmar({
                titulo: "Recusar pedido",
                mensagem: `Recusar o pedido "${contrato.servico.titulo}" de ${contrato.cliente.nome}? O cliente verá o pedido como recusado.`,
                botao: "Recusar pedido",
                cancelar: "Voltar"
            });
            if (!ok) return;
        }

        try {
            setErro("");
            setProcessando(contrato.id_contrato);
            const resultado = await api(`/contrato/${contrato.id_contrato}/status`, { metodo: "PATCH", dados: { acao } });
            setSucesso(`Pedido "${contrato.servico.titulo}" agora está ${resultado.status}.`);
            setDetalhe(null);
            await recarregar();
        } catch (e) {
            setErro(e.message);
        } finally {
            setProcessando(null);
        }
    }

    const contarAba = (item) => contratos.filter((c) => !item.status || item.status.includes(c.status)).length;
    const abaAtual = ABAS.find((item) => item.id === aba);

    const lista = contratos
        .filter((c) => !abaAtual.status || abaAtual.status.includes(c.status))
        .filter((c) => combinaComBusca(busca, c.servico.titulo, c.cliente.nome, c.local, c.observacao));

    return (
        <>
            <h1 className="fw-bold h2 mb-1">Solicitação de Serviço</h1>
            <p className="mb-4">Gerencie os pedidos recebidos dos clientes</p>

            <div className="d-flex flex-wrap gap-2 mb-4">
                {ABAS.map((item) => (
                    <button key={item.id} className={`aba-pilula ${aba === item.id ? "ativa" : ""}`} onClick={() => setAba(item.id)}>
                        {item.rotulo}<span className="contador">{contarAba(item)}</span>
                    </button>
                ))}
            </div>

            <Alerta>{erro}</Alerta>
            <Alerta tipo="success">{sucesso}</Alerta>

            <div className="card-cp shadow-sm p-3 p-md-4" style={{ minHeight: 400 }}>
                {lista.length === 0 && <Vazio icone="bi-envelope-open">Nenhum pedido nesta aba.</Vazio>}

                <div className="d-flex flex-column gap-4">
                    {lista.map((contrato) => (
                        <article key={contrato.id_contrato} className="border rounded-3 p-3">
                            <div className="d-flex justify-content-between align-items-start gap-3">
                                <div>
                                    <h2 className="h4 fw-bold mb-1">{contrato.servico.titulo}</h2>
                                    <StatusBadge status={contrato.status} />
                                </div>
                                <div className="text-end">
                                    <div className="small texto-suave">Valor</div>
                                    <div className="fs-4 fw-bold text-nowrap">{formatarPreco(contrato.servico.preco)}</div>
                                </div>
                            </div>

                            <div className="row g-2 mt-2">
                                <Info rotulo="Cliente" valor={contrato.cliente.nome} />
                                <Info rotulo="Localização" valor={cidadeDoEndereco(contrato.local)} />
                                <Info rotulo="Data" valor={formatarData(contrato.data_contrato)} />
                            </div>

                            <Acoes contrato={contrato} ocupado={processando === contrato.id_contrato} aoExecutar={executar} aoVerDetalhes={setDetalhe} />
                        </article>
                    ))}
                </div>
            </div>

            {detalhe && (
                <Modal titulo="Detalhes do pedido" aoFechar={() => setDetalhe(null)}>
                    <div className="d-flex align-items-center gap-3 mb-3">
                        <Avatar src={detalhe.cliente.foto} nome={detalhe.cliente.nome} tamanho={64} />
                        <div>
                            <div className="fw-bold fs-5">{detalhe.cliente.nome}</div>
                            <div className="texto-suave small">
                                <i className="bi bi-telephone me-1"></i>{formatarTelefone(detalhe.cliente.telefone)}
                                <span className="mx-2">·</span>
                                <i className="bi bi-envelope me-1"></i>{detalhe.cliente.email}
                            </div>
                        </div>
                    </div>

                    <dl className="row mb-0">
                        <dt className="col-sm-4">Serviço</dt>
                        <dd className="col-sm-8">{detalhe.servico.titulo}</dd>
                        <dt className="col-sm-4">Status</dt>
                        <dd className="col-sm-8"><StatusBadge status={detalhe.status} /></dd>
                        <dt className="col-sm-4">Data</dt>
                        <dd className="col-sm-8">{formatarData(detalhe.data_contrato)}</dd>
                        <dt className="col-sm-4">Endereço</dt>
                        <dd className="col-sm-8">{detalhe.local || "Não informado"}</dd>
                        <dt className="col-sm-4">Observação</dt>
                        <dd className="col-sm-8">{detalhe.observacao || "-"}</dd>
                        <dt className="col-sm-4">Valor</dt>
                        <dd className="col-sm-8 fw-bold">{formatarPreco(detalhe.servico.preco)}</dd>
                        {detalhe.data_conclusao && (
                            <>
                                <dt className="col-sm-4">Concluído em</dt>
                                <dd className="col-sm-8">{formatarData(detalhe.data_conclusao)}</dd>
                            </>
                        )}
                    </dl>

                    <Acoes contrato={detalhe} ocupado={processando === detalhe.id_contrato} aoExecutar={executar} />
                </Modal>
            )}
            {janelaConfirmar}
        </>
    );
}
