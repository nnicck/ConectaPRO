"use client";

// Início do painel do profissional: /inicioProfissional
// Cartões de resumo (novas solicitações, em andamento, concluídos, saldo) e próximos atendimentos.

import Link from "next/link";
import AvisoSalvo from "@/components/ui/AvisoSalvo";
import StatusBadge from "@/components/ui/StatusBadge";
import { Vazio } from "@/components/ui/Mensagem";
import { formatarData, formatarPreco } from "@/lib/formatar";
import { combinaComBusca, usePainel } from "@/lib/painel";

// Cartão de número do painel (ex.: "Novas solicitações: 3")
function CardResumo({ titulo, valor, icone, link }) {
    return (
        <div className="col-6 col-xl-3">
            <Link href={link} className="card-cp card-cp-hover d-block p-4 h-100 text-decoration-none text-dark">
                <div className="d-flex align-items-center justify-content-between mb-2">
                    <span className="texto-suave">{titulo}</span>
                    <i className={`bi ${icone} fs-4 text-primary`}></i>
                </div>
                <div className="fs-2 fw-bold">{valor}</div>
            </Link>
        </div>
    );
}

export default function InicioProfissional() {
    const { profissional, contratos, busca } = usePainel();

    const contarStatus = (...status) => contratos.filter((c) => status.includes(c.status)).length;

    // próximos atendimentos: aceitos ou em andamento, do mais próximo para o mais distante
    const proximos = contratos
        .filter((c) => ["aceito", "em andamento", "pendente"].includes(c.status))
        .filter((c) => combinaComBusca(busca, c.servico.titulo, c.cliente.nome, c.local))
        .sort((a, b) => a.data_contrato.localeCompare(b.data_contrato));

    return (
        <>
            <AvisoSalvo />
            <h1 className="fw-bold h2 mb-1">Olá, {profissional.nome.split(" ")[0]}!</h1>
            <p className="texto-suave">
                Seu perfil está ativo para os clientes.{" "}
                <Link href={`/perfilProfissional/${profissional.id_profissional}`}>Ver como os clientes veem</Link>
            </p>

            <div className="row g-3 mb-5">
                <CardResumo titulo="Novas solicitações" valor={contarStatus("pendente")} icone="bi-envelope-paper" link="/inicioProfissional/solicitacoesProfissional" />
                <CardResumo titulo="Em andamento" valor={contarStatus("aceito", "em andamento")} icone="bi-hourglass-split" link="/inicioProfissional/agenda" />
                <CardResumo titulo="Concluídos" valor={contarStatus("concluído")} icone="bi-check2-circle" link="/inicioProfissional/agenda" />
                <CardResumo titulo="Saldo" valor={formatarPreco(profissional.saldo)} icone="bi-wallet2" link="/inicioProfissional/agenda" />
            </div>

            <div className="d-flex align-items-center justify-content-between mb-3">
                <div>
                    <h2 className="h4 fw-bold mb-0">Próximos atendimentos</h2>
                    <p className="texto-suave mb-0">Pedidos pendentes, aceitos e em andamento</p>
                </div>
                <Link href="/inicioProfissional/solicitacoesProfissional" className="btn btn-outline-primary">Ver solicitações</Link>
            </div>

            <div className="card-cp overflow-hidden">
                {proximos.length === 0 ? (
                    <Vazio icone="bi-calendar-check">Nenhum atendimento agendado.</Vazio>
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
                                {proximos.map((contrato) => (
                                    <tr key={contrato.id_contrato}>
                                        <td>{contrato.servico.titulo}</td>
                                        <td>{contrato.cliente.nome}</td>
                                        <td className="texto-suave">{formatarData(contrato.data_contrato)}</td>
                                        <td><StatusBadge status={contrato.status} /></td>
                                        <td className="text-end fw-semibold">{formatarPreco(contrato.servico.preco)}</td>
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
