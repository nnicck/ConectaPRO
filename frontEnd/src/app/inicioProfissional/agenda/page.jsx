"use client";

// Agenda e financeiro do profissional: /inicioProfissional/agenda
// Saldo, quanto recebeu no mês, quanto tem a receber e a lista de todos os atendimentos.

import { useState } from "react";
import StatusBadge from "@/components/ui/StatusBadge";
import { Vazio } from "@/components/ui/Mensagem";
import { STATUS, formatarData, formatarPreco, hojeISO } from "@/lib/formatar";
import { combinaComBusca, usePainel } from "@/lib/painel";

function Resumo({ titulo, valor, detalhe, destaque = false }) {
    return (
        <div className="col-12 col-md-4">
            <div className={`card-cp p-4 h-100 ${destaque ? "bg-marinho text-white border-0" : ""}`}>
                <div className={destaque ? "text-white-50" : "texto-suave"}>{titulo}</div>
                <div className="fs-2 fw-bold">{valor}</div>
                <div className={`small ${destaque ? "text-white-50" : "texto-suave"}`}>{detalhe}</div>
            </div>
        </div>
    );
}

export default function AgendaFinanceiro() {
    const { profissional, contratos, busca } = usePainel();
    const [filtroStatus, setFiltroStatus] = useState("");

    // "2026-11" no horário do computador (toISOString sozinho usa UTC e virava o mês às 21h do último dia)
    const mesAtual = hojeISO().slice(0, 7);
    const soma = (lista) => lista.reduce((total, c) => total + c.servico.preco, 0);

    const concluidosNoMes = contratos.filter((c) => c.status === "concluído" && c.data_conclusao?.startsWith(mesAtual));
    const aReceber = contratos.filter((c) => ["aceito", "em andamento"].includes(c.status));

    const lista = contratos
        .filter((c) => !filtroStatus || c.status === filtroStatus)
        .filter((c) => combinaComBusca(busca, c.servico.titulo, c.cliente.nome))
        .sort((a, b) => b.data_contrato.localeCompare(a.data_contrato));

    return (
        <>
            <h1 className="fw-bold h2 mb-1">Agenda e financeiro</h1>
            <p className="texto-suave mb-4">Todos os seus atendimentos e quanto você já recebeu.</p>

            <div className="row g-3 mb-4">
                <Resumo destaque titulo="Saldo disponível" valor={formatarPreco(profissional.saldo)} detalhe="Somado a cada serviço concluído" />
                <Resumo titulo="Recebido neste mês" valor={formatarPreco(soma(concluidosNoMes))} detalhe={`${concluidosNoMes.length} serviço(s) concluído(s)`} />
                <Resumo titulo="A receber" valor={formatarPreco(soma(aReceber))} detalhe={`${aReceber.length} serviço(s) aceito(s) ou em andamento`} />
            </div>

            <div className="d-flex justify-content-between align-items-center gap-3 mb-3">
                <h2 className="h4 fw-bold mb-0">Atendimentos</h2>
                <select className="form-select w-auto" value={filtroStatus} onChange={(e) => setFiltroStatus(e.target.value)} aria-label="Filtrar por status">
                    <option value="">Todos os status</option>
                    {Object.entries(STATUS).map(([valor, info]) => (
                        <option key={valor} value={valor}>{info.rotulo}</option>
                    ))}
                </select>
            </div>

            <div className="card-cp overflow-hidden">
                {lista.length === 0 ? (
                    <Vazio icone="bi-calendar3">Nenhum atendimento encontrado.</Vazio>
                ) : (
                    <div className="table-responsive">
                        <table className="table tabela-cp mb-0">
                            <thead>
                                <tr>
                                    <th>Serviço</th>
                                    <th>Cliente</th>
                                    <th>Data</th>
                                    <th>Status</th>
                                    <th className="text-end">Valor</th>
                                </tr>
                            </thead>
                            <tbody>
                                {lista.map((contrato) => (
                                    <tr key={contrato.id_contrato}>
                                        <td className="text-truncate" style={{ maxWidth: 280 }}>{contrato.servico.titulo}</td>
                                        <td>{contrato.cliente.nome}</td>
                                        <td className="texto-suave text-nowrap">
                                            {formatarData(contrato.data_contrato)}
                                            {contrato.data_conclusao && <div className="small">concluído {formatarData(contrato.data_conclusao)}</div>}
                                        </td>
                                        <td><StatusBadge status={contrato.status} /></td>
                                        <td className="text-end fw-semibold text-nowrap">{formatarPreco(contrato.servico.preco)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </>
    );
}
