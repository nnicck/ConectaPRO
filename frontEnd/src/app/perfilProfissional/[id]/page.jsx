"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import InfoPrimaria from "@/components/perfilProfissional-comp/infoPrimaria";
import Servicos from "@/components/perfilProfissional-comp/servicos";
import { Alerta, Carregando } from "@/components/ui/Mensagem";
import { api } from "@/lib/api";
import { formatarData, formatarTelefone } from "@/lib/formatar";

// Abas do perfil
const ABAS = [
    { id: "visao", rotulo: "Visão geral" },
    { id: "servicos", rotulo: "Serviços" },
    { id: "sobre", rotulo: "Sobre" }
];

// Perfil público do profissional: /perfilProfissional/[id]
export default function PerfilProfissional() {
    const { id } = useParams();

    const [profissional, setProfissional] = useState(null);
    const [listaServicos, setListaServicos] = useState([]);
    const [aba, setAba] = useState("visao");
    const [msgErro, setMsgErro] = useState("");

    // Carrega o profissional e os serviços dele (as duas buscas rodam ao mesmo tempo)
    useEffect(() => {
        async function carregar() {
            try {
                const [dadosProfissional, dadosServicos] = await Promise.all([
                    api(`/profissional/${id}`),
                    api(`/servico/profissional/${id}`)
                ]);

                setProfissional(dadosProfissional);
                setListaServicos(dadosServicos);
            } catch (erro) {
                setMsgErro(erro.message);
            }
        }

        carregar();
    }, [id]);

    if (msgErro) {
        return (
            <main className="container py-5">
                <Alerta>{msgErro}</Alerta>
                <Link href="/buscarServicos">Voltar para a busca</Link>
            </main>
        );
    }

    if (!profissional) {
        return <main className="container py-5"><Carregando texto="Carregando perfil..." /></main>;
    }

    return (
        <main className="container py-4 py-md-5" style={{ maxWidth: 1100 }}>
            <InfoPrimaria profissional={profissional} aoVerServicos={() => setAba("servicos")} />

            {/* Abas */}
            <nav className="d-flex flex-wrap gap-2 my-4" aria-label="Seções do perfil">
                {ABAS.map((item) => (
                    <button key={item.id} type="button" className={`aba-pilula ${aba === item.id ? "ativa" : ""}`}
                        aria-pressed={aba === item.id} onClick={() => setAba(item.id)}>
                        {item.rotulo}
                        {item.id === "servicos" && <span className="contador">{listaServicos.length}</span>}
                    </button>
                ))}
            </nav>

            {/* Aba: Visão geral (apresentação + até 4 serviços) */}
            {aba === "visao" && (
                <>
                    <section className="card-cp p-4 mb-4">
                        <h2 className="titulo-secao">Sobre o profissional</h2>
                        <p className="mb-0 texto-suave" style={{ whiteSpace: "pre-line", lineHeight: 1.7 }}>
                            {profissional.visao_geral || "Este profissional ainda não escreveu uma apresentação."}
                        </p>
                    </section>

                    <div className="d-flex align-items-center justify-content-between mb-3">
                        <h2 className="titulo-secao mb-0">Serviços oferecidos</h2>
                        {listaServicos.length > 4 && (
                            <button className="btn btn-link btn-sm px-0" onClick={() => setAba("servicos")}>
                                Ver todos ({listaServicos.length}) <i className="bi bi-arrow-right"></i>
                            </button>
                        )}
                    </div>
                    <Servicos listaServicos={listaServicos.slice(0, 4)} resumido />
                </>
            )}

            {/* Aba: Serviços (todos, com preço) */}
            {aba === "servicos" && <Servicos listaServicos={listaServicos} />}

            {/* Aba: Sobre (dados de contato) */}
            {aba === "sobre" && (
                <div className="card-cp p-4" style={{ maxWidth: 640 }}>
                    <h2 className="titulo-secao">Informações</h2>
                    <dl className="row mb-0 small">
                        <dt className="col-sm-5 texto-suave fw-normal">Profissão</dt>
                        <dd className="col-sm-7 fw-semibold">{profissional.profissao}</dd>
                        <dt className="col-sm-5 texto-suave fw-normal">Localização</dt>
                        <dd className="col-sm-7 fw-semibold">{profissional.localizacao || "Não informada"}</dd>
                        <dt className="col-sm-5 texto-suave fw-normal">Idiomas</dt>
                        <dd className="col-sm-7 fw-semibold">{profissional.idioma || "Não informado"}</dd>
                        <dt className="col-sm-5 texto-suave fw-normal">Membro desde</dt>
                        <dd className="col-sm-7 fw-semibold">{formatarData(profissional.data_ingresso)}</dd>
                        <dt className="col-sm-5 texto-suave fw-normal">Serviços cadastrados</dt>
                        <dd className="col-sm-7 fw-semibold">{listaServicos.length}</dd>
                        <dt className="col-sm-5 texto-suave fw-normal">Contato</dt>
                        <dd className="col-sm-7 fw-semibold mb-0">{formatarTelefone(profissional.telefone)}<br />{profissional.email}</dd>
                    </dl>
                </div>
            )}
        </main>
    );
}
