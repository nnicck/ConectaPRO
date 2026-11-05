"use client";

// "Minha conta" do cliente: /inicioCliente
// Dados do cliente, quantos serviços contratou e a lista de pedidos com filtros.

import { useEffect, useState } from "react";
import Link from "next/link";
import Avatar from "@/components/ui/Avatar";
import AvisoSalvo from "@/components/ui/AvisoSalvo";
import ImagemServico from "@/components/ui/ImagemServico";
import StatusBadge from "@/components/ui/StatusBadge";
import { Alerta, Carregando, Vazio } from "@/components/ui/Mensagem";
import { api } from "@/lib/api";
import { formatarData, formatarPreco, formatarTelefone } from "@/lib/formatar";
import { useSessao } from "@/lib/sessao";

const FILTROS = [
    { id: "todos", rotulo: "Todos", status: null },
    { id: "abertos", rotulo: "Em aberto", status: ["pendente", "aceito", "em andamento"] },
    { id: "concluidos", rotulo: "Concluídos", status: ["concluído"] },
    { id: "encerrados", rotulo: "Cancelados/recusados", status: ["cancelado", "recusado"] }
];

export default function InicioCliente() {
    const { usuario, liberado } = useSessao("cliente");

    const [cliente, setCliente] = useState(null);
    const [contratos, setContratos] = useState([]);
    const [filtro, setFiltro] = useState("todos");
    const [erro, setErro] = useState("");

    useEffect(() => {
        if (!liberado) return;

        async function carregar() {
            try {
                const [dadosCliente, dadosContratos] = await Promise.all([
                    api(`/cliente/${usuario.id}`),
                    api("/contrato/meus")
                ]);
                setCliente(dadosCliente);
                setContratos(dadosContratos);
            } catch (e) {
                setErro(e.message);
            }
        }

        carregar();
    }, [liberado, usuario]);

    if (erro) return <main className="container py-5"><Alerta>{erro}</Alerta></main>;
    if (!cliente) return <main className="container py-5"><Carregando /></main>;

    const filtroAtual = FILTROS.find((f) => f.id === filtro);
    const lista = contratos.filter((c) => !filtroAtual.status || filtroAtual.status.includes(c.status));

    return (
        <main className="container py-4 py-md-5" style={{ maxWidth: 1100 }}>
            <AvisoSalvo />

            {/* Cabeçalho do perfil */}
            <section className="card-cp perfil-cabecalho mb-4">
                <div className="perfil-capa" />
                <div className="perfil-corpo">
                    <div className="d-flex flex-column flex-md-row align-items-center align-items-md-end gap-3 text-center text-md-start">
                        <div className="perfil-foto flex-shrink-0">
                            <Avatar src={cliente.foto} nome={cliente.nome} tamanho={110} />
                        </div>
                        <div className="flex-grow-1 min-w-0 pb-md-1">
                            <h1 className="h3 fw-bold mb-1">{cliente.nome}</h1>
                            <div className="texto-suave small">Conta de cliente</div>
                        </div>
                        <div className="d-flex gap-2 mb-md-1">
                            <Link href="/inicioCliente/editarPerfil" className="btn btn-branco"><i className="bi bi-pencil me-1"></i> Editar perfil</Link>
                            <Link href="/buscarServicos" className="btn btn-primary"><i className="bi bi-search me-1"></i> Contratar serviço</Link>
                        </div>
                    </div>

                    <div className="d-flex flex-wrap justify-content-center justify-content-md-start gap-2 mt-3">
                        <span className="info-chip text-break"><i className="bi bi-envelope"></i>{cliente.email}</span>
                        <span className="info-chip"><i className="bi bi-telephone"></i>{formatarTelefone(cliente.telefone)}</span>
                        <span className="info-chip text-break"><i className="bi bi-geo-alt"></i>{cliente.localizacao || "Endereço não informado"}</span>
                    </div>
                </div>
            </section>

            {/* Atividade */}
            <section className="row g-3 mb-5">
                <div className="col-12 col-sm-6 col-lg-4">
                    <div className="card-cp p-3 h-100 d-flex align-items-center gap-3">
                        <span className="rounded-3 d-flex align-items-center justify-content-center flex-shrink-0"
                            style={{ width: 44, height: 44, backgroundColor: "var(--cp-azul-claro)", color: "var(--cp-azul)" }}>
                            <i className="bi bi-bag-check fs-5"></i>
                        </span>
                        <div>
                            <div className="numero-resumo">{contratos.length}</div>
                            <div className="small texto-suave">Serviços contratados</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Serviços solicitados */}
            <section>
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-3">
                    <h2 className="h5 fw-bold mb-0">Serviços solicitados</h2>
                    <div className="d-flex flex-wrap gap-2">
                        {FILTROS.map((item) => (
                            <button key={item.id} className={`aba-pilula ${filtro === item.id ? "ativa" : ""}`} onClick={() => setFiltro(item.id)}>
                                {item.rotulo}
                            </button>
                        ))}
                    </div>
                </div>

                {lista.length === 0 ? (
                    <Vazio icone="bi-bag">
                        Nenhum serviço aqui. <Link href="/buscarServicos">Encontre um profissional</Link>
                    </Vazio>
                ) : (
                    <div className="row g-3">
                        {lista.map((contrato) => (
                            <div className="col-12 col-sm-6 col-lg-3" key={contrato.id_contrato}>
                                <Link href={`/acompanharServico/${contrato.id_contrato}`}
                                    className="card-cp card-cp-hover d-flex flex-column h-100 text-decoration-none text-dark overflow-hidden">
                                    <ImagemServico src={contrato.servico.imagem} categoria={contrato.servico.categoria} alt={contrato.servico.titulo} altura={120} />
                                    <div className="p-3 d-flex flex-column gap-1 flex-grow-1">
                                        <div className="d-flex justify-content-between align-items-start gap-2">
                                            <h3 className="h6 fw-bold mb-0">{contrato.servico.titulo}</h3>
                                            <StatusBadge status={contrato.status} />
                                        </div>
                                        <span className="small texto-suave">{contrato.profissional.nome}</span>
                                        <span className="small texto-suave">{formatarData(contrato.data_contrato)}</span>
                                        <span className="fw-semibold mt-auto">{formatarPreco(contrato.servico.preco)}</span>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}
