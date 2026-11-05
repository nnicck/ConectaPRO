"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import ImagemServico from "@/components/ui/ImagemServico";
import { Alerta, Carregando } from "@/components/ui/Mensagem";
import { api } from "@/lib/api";
import { formatarPreco, hojeISO } from "@/lib/formatar";
import { useSessao } from "@/lib/sessao";

// Transforma a descrição em itens da lista de "✓" (separa por ponto final ou quebra de linha)
function itensDaDescricao(descricao) {
    return (descricao ?? "")
        .split(/\.\s+|\n|,\s(?=[a-záéíóú])/)
        .map((item) => item.trim().replace(/\.$/, ""))
        .filter((item) => item.length > 2)
        .map((item) => item[0].toUpperCase() + item.slice(1));
}

// ==================== Formulário de solicitação ====================
// O cliente escolhe a data e digita o endereço do atendimento à mão.
function FormSolicitar({ servico }) {
    const router = useRouter();

    const [dados, setDados] = useState({ data_contrato: "", local: "", observacao: "" });
    const [enviando, setEnviando] = useState(false);
    const [erro, setErro] = useState("");

    function mudar(evento) {
        setDados({ ...dados, [evento.target.name]: evento.target.value });
    }

    async function enviar(evento) {
        evento.preventDefault();
        setErro("");

        try {
            setEnviando(true);
            const contrato = await api("/contrato/solicitar", {
                metodo: "POST",
                dados: { ...dados, id_servico: servico.id_servico }
            });
            router.push(`/acompanharServico/${contrato.id_contrato}`);
        } catch (e) {
            setErro(e.message);
            setEnviando(false);
        }
    }

    return (
        <form onSubmit={enviar} className="card-cp p-4 mt-3">
            <h2 className="h5 fw-bold mb-3">Solicitar este serviço</h2>
            <Alerta>{erro}</Alerta>

            <div className="mb-3">
                <label htmlFor="data_contrato" className="form-label">Data desejada *</label>
                <input id="data_contrato" name="data_contrato" type="date" className="form-control" min={hojeISO()} required
                    value={dados.data_contrato} onChange={mudar} />
            </div>
            <div className="mb-3">
                <label htmlFor="local" className="form-label">Endereço do atendimento *</label>
                <input id="local" name="local" className="form-control" maxLength={200} required
                    value={dados.local} onChange={mudar} placeholder="Rua, número - bairro, cidade" />
            </div>
            <div className="mb-3">
                <label htmlFor="observacao" className="form-label">Detalhes do que você precisa</label>
                <textarea id="observacao" name="observacao" rows={3} className="form-control" maxLength={1000}
                    value={dados.observacao} onChange={mudar} placeholder="Ex.: o chuveiro é 220V e o disjuntor desarma" />
            </div>

            <button type="submit" className="btn btn-primary w-100 py-3 fw-semibold" disabled={enviando}>
                {enviando ? "Enviando..." : "Enviar solicitação"}
            </button>
        </form>
    );
}

// ==================== Página ====================
export default function DetalhesServico() {
    const { id } = useParams();
    const { usuario } = useSessao();

    const [servico, setServico] = useState(null);
    const [fotoAtual, setFotoAtual] = useState(0);
    const [mostrarForm, setMostrarForm] = useState(false);
    const [erro, setErro] = useState("");

    useEffect(() => {
        api(`/servico/${id}/detalhes`).then(setServico).catch((e) => setErro(e.message));
    }, [id]);

    if (erro) {
        return (
            <main className="container py-5">
                <Alerta>{erro}</Alerta>
                <Link href="/buscarServicos">Voltar para a busca</Link>
            </main>
        );
    }

    if (!servico) return <main className="container py-5"><Carregando /></main>;

    const { profissional } = servico;
    const fotos = servico.midias.filter((m) => m.tipo === "Imagem");
    const itens = itensDaDescricao(servico.descricao);

    return (
        <main className="container py-4 py-md-5" style={{ maxWidth: 1100 }}>
            <div className="row g-4 g-lg-5">
                {/* Fotos */}
                <div className="col-lg-5">
                    <div className="rounded-4 overflow-hidden border bg-white">
                        <ImagemServico src={fotos[fotoAtual]?.midia} categoria={servico.categoria} alt={servico.titulo} altura={360} />
                    </div>

                    {fotos.length > 1 && (
                        <div className="d-flex gap-3 mt-3">
                            {fotos.map((foto, indice) => (
                                <button key={foto.id_midia} type="button" onClick={() => setFotoAtual(indice)}
                                    className={`p-0 border-0 rounded-2 overflow-hidden flex-fill ${indice === fotoAtual ? "" : "opacity-75"}`}
                                    style={{ outline: indice === fotoAtual ? "3px solid var(--cp-azul)" : "none" }}
                                    aria-label={`Ver foto ${indice + 1}`}>
                                    <ImagemServico src={foto.midia} alt="" altura={80} />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Informações */}
                <div className="col-lg-7">
                    <span className="badge bg-primary-subtle text-primary-emphasis mb-2">{servico.categoria}</span>
                    <h1 className="h3 fw-bold mb-2">{servico.titulo}</h1>
                    <p className="mb-3 texto-suave">
                        por <Link href={`/perfilProfissional/${profissional.id_profissional}`} className="text-dark fw-semibold">{profissional.nome}</Link>
                        <span className="mx-2">·</span>
                        {profissional.profissao}
                    </p>

                    <div className="card-cp p-3 mb-4 d-inline-flex align-items-baseline gap-2">
                        <span className="texto-suave small">A partir de</span>
                        <strong className="fs-3 text-primary">{formatarPreco(servico.preco)}</strong>
                    </div>

                    <ul className="list-unstyled d-flex flex-column gap-2 mb-4">
                        {itens.map((item) => (
                            <li key={item}><i className="bi bi-check-circle-fill text-success me-2"></i>{item}</li>
                        ))}
                        <li className="texto-suave small mt-2">
                            <i className="bi bi-geo-alt me-2"></i>{servico.tipo_servico}
                            {servico.tempo_prestacao && <><i className="bi bi-clock ms-4 me-2"></i>Duração: {servico.tempo_prestacao}</>}
                        </li>
                    </ul>

                    {/* O botão muda conforme quem está vendo a página */}
                    {!usuario && (
                        <Link href={`/login?tipo=cliente&voltar=/servico/${servico.id_servico}`} className="btn btn-primary w-100 py-3 fw-semibold">
                            Entre para solicitar orçamento
                        </Link>
                    )}

                    {usuario?.tipo === "profissional" && (
                        <div className="alert alert-secondary mb-0">
                            Você está logado como profissional. Para contratar, entre com uma conta de cliente.
                        </div>
                    )}

                    {usuario?.tipo === "cliente" && !mostrarForm && (
                        <button className="btn btn-primary w-100 py-3 fw-semibold" onClick={() => setMostrarForm(true)}>
                            Solicitar orçamento
                        </button>
                    )}

                    {usuario?.tipo === "cliente" && mostrarForm && <FormSolicitar servico={servico} />}
                </div>
            </div>
        </main>
    );
}
