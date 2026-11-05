"use client";

// Meus serviços: /inicioProfissional/meusServicos
// CRUD completo dos serviços do profissional + fotos de cada serviço.

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Modal from "@/components/ui/Modal";
import { useConfirmar } from "@/components/ui/Confirmar";
import ImagemServico from "@/components/ui/ImagemServico";
import { Alerta, Carregando, Vazio } from "@/components/ui/Mensagem";
import { api, enviarImagem } from "@/lib/api";
import { CATEGORIAS, formatarPreco } from "@/lib/formatar";
import { combinaComBusca, usePainel } from "@/lib/painel";

// Valores iniciais do formulário de serviço (usado para "Novo serviço")
const SERVICO_VAZIO = {
    titulo: "",
    categoria: "",
    tipo_servico: "Presencial",
    tag: "",
    preco: "",
    tempo_prestacao: "",
    descricao: ""
};

// ==================== Formulário de criar/editar serviço ====================
function FormServico({ servico, aoSalvar, aoCancelar }) {
    const [dados, setDados] = useState(servico ?? SERVICO_VAZIO);
    const [salvando, setSalvando] = useState(false);
    const [erro, setErro] = useState("");

    function mudar(evento) {
        setDados({ ...dados, [evento.target.name]: evento.target.value });
    }

    async function salvar(evento) {
        evento.preventDefault();
        setErro("");
        setSalvando(true);

        try {
            // manda só os campos do formulário (o serviço da lista tem também foto, nome do profissional...)
            const corpo = {
                titulo: dados.titulo.trim(),
                categoria: dados.categoria,
                tipo_servico: dados.tipo_servico,
                tag: dados.tag?.trim() || null,
                preco: Number(dados.preco),
                tempo_prestacao: dados.tempo_prestacao?.trim() || null,
                descricao: dados.descricao?.trim() || null
            };

            if (servico) {
                await api(`/servico/${servico.id_servico}`, { metodo: "PUT", dados: corpo });   // UPDATE
            } else {
                await api("/servico", { metodo: "POST", dados: corpo });                         // CREATE
            }

            aoSalvar();
        } catch (e) {
            setErro(e.message);
        } finally {
            setSalvando(false);
        }
    }

    return (
        <form onSubmit={salvar}>
            <Alerta>{erro}</Alerta>

            <div className="row g-3">
                <div className="col-12">
                    <label htmlFor="titulo" className="form-label">Título do serviço *</label>
                    <input id="titulo" name="titulo" className="form-control" maxLength={150} required
                        placeholder="Ex.: Instalação de chuveiro" value={dados.titulo} onChange={mudar} />
                </div>

                <div className="col-md-6">
                    <label htmlFor="categoria" className="form-label">Categoria *</label>
                    <select id="categoria" name="categoria" className="form-select" required value={dados.categoria} onChange={mudar}>
                        <option value="" disabled>Selecione</option>
                        {/* mantém a categoria atual mesmo que ela não esteja na lista padrão */}
                        {[...new Set([...CATEGORIAS, dados.categoria].filter(Boolean))].map((categoria) => (
                            <option key={categoria} value={categoria}>{categoria}</option>
                        ))}
                    </select>
                </div>

                <div className="col-md-6">
                    <label htmlFor="tipo_servico" className="form-label">Modalidade *</label>
                    <select id="tipo_servico" name="tipo_servico" className="form-select" required value={dados.tipo_servico} onChange={mudar}>
                        <option value="Presencial">Presencial</option>
                        <option value="Online">Online</option>
                        <option value="Presencial ou online">Presencial ou online</option>
                    </select>
                </div>

                <div className="col-md-4">
                    <label htmlFor="preco" className="form-label">Preço (R$) *</label>
                    <input id="preco" name="preco" type="number" min="0" step="0.01" className="form-control" required
                        value={dados.preco} onChange={mudar} />
                </div>

                <div className="col-md-4">
                    <label htmlFor="tempo_prestacao" className="form-label">Duração</label>
                    <input id="tempo_prestacao" name="tempo_prestacao" className="form-control" maxLength={50}
                        placeholder="Ex.: 2 horas" value={dados.tempo_prestacao ?? ""} onChange={mudar} />
                </div>

                <div className="col-md-4">
                    <label htmlFor="tag" className="form-label">Palavra-chave</label>
                    <input id="tag" name="tag" className="form-control" maxLength={50}
                        placeholder="Ex.: Chuveiro" value={dados.tag ?? ""} onChange={mudar} />
                </div>

                <div className="col-12">
                    <label htmlFor="descricao" className="form-label">Descrição</label>
                    <textarea id="descricao" name="descricao" rows={4} className="form-control" maxLength={1000}
                        placeholder="O que está incluso? Separe os itens com ponto final para virarem uma lista."
                        value={dados.descricao ?? ""} onChange={mudar} />
                </div>
            </div>

            <div className="d-flex justify-content-end gap-2 mt-4">
                <button type="button" className="btn btn-branco" onClick={aoCancelar}>Cancelar</button>
                <button type="submit" className="btn btn-primary px-4" disabled={salvando}>
                    {salvando ? "Salvando..." : "Salvar serviço"}
                </button>
            </div>
        </form>
    );
}

// ==================== Fotos (mídias) de um serviço ====================
function MidiasServico({ servico }) {
    const [midias, setMidias] = useState(null);
    const [enviando, setEnviando] = useState(false);
    const [erro, setErro] = useState("");
    const [confirmar, janelaConfirmar] = useConfirmar();

    const carregar = useCallback(async () => {
        setMidias(await api(`/midia/servico/${servico.id_servico}`));
    }, [servico.id_servico]);

    useEffect(() => {
        carregar().catch((e) => setErro(e.message));
    }, [carregar]);

    async function adicionar(evento) {
        const arquivo = evento.target.files?.[0];
        evento.target.value = "";
        if (!arquivo) return;

        try {
            setErro("");
            setEnviando(true);
            const url = await enviarImagem(arquivo);
            await api("/midia", { metodo: "POST", dados: { tipo: "Imagem", midia: url, id_servico: servico.id_servico } });
            await carregar();
        } catch (e) {
            setErro(e.message);
        } finally {
            setEnviando(false);
        }
    }

    async function excluir(midia) {
        const ok = await confirmar({ titulo: "Excluir foto", mensagem: "Excluir esta foto do serviço?", botao: "Excluir foto" });
        if (!ok) return;

        try {
            await api(`/midia/${midia.id_midia}`, { metodo: "DELETE" });
            await carregar();
        } catch (e) {
            setErro(e.message);
        }
    }

    if (!midias) return <Carregando pequeno />;

    return (
        <>
            <Alerta>{erro}</Alerta>
            <p className="texto-suave">A primeira foto aparece como capa do serviço na busca.</p>

            <div className="row g-3 mb-3">
                {midias.map((midia, indice) => (
                    <div className="col-6 col-md-4" key={midia.id_midia}>
                        <div className="position-relative rounded-3 overflow-hidden border">
                            <ImagemServico src={midia.midia} alt={`Foto ${indice + 1}`} altura={110} />
                            {indice === 0 && <span className="badge bg-primary position-absolute top-0 start-0 m-2">Capa</span>}
                            <button type="button" className="btn btn-sm btn-danger position-absolute top-0 end-0 m-2"
                                onClick={() => excluir(midia)} aria-label="Excluir foto">
                                <i className="bi bi-trash"></i>
                            </button>
                        </div>
                    </div>
                ))}
                {midias.length === 0 && <p className="texto-suave">Nenhuma foto ainda.</p>}
            </div>

            <label className={`btn btn-primary ${enviando ? "disabled" : ""}`}>
                <i className="bi bi-plus-lg me-1"></i>{enviando ? "Enviando..." : "Adicionar foto"}
                <input type="file" accept="image/*" className="d-none" onChange={adicionar} disabled={enviando} />
            </label>

            {janelaConfirmar}
        </>
    );
}

// ==================== Página ====================
export default function MeusServicos() {
    const { profissional, busca, recarregar } = usePainel();

    const [servicos, setServicos] = useState(null);
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState("");
    const [editando, setEditando] = useState(null);   // null = fechado, {} = novo, objeto = editar
    const [fotosDe, setFotosDe] = useState(null);     // serviço com o modal de fotos aberto
    const [confirmar, janelaConfirmar] = useConfirmar();

    // READ
    const carregar = useCallback(async () => {
        try {
            setServicos(await api(`/servico/profissional/${profissional.id_profissional}`));
        } catch (e) {
            setErro(e.message);
        }
    }, [profissional.id_profissional]);

    useEffect(() => {
        carregar();
    }, [carregar]);

    // DELETE
    async function excluir(servico) {
        setSucesso("");
        const ok = await confirmar({
            titulo: "Excluir serviço",
            mensagem: `Excluir o serviço "${servico.titulo}"? As fotos e os pedidos ligados a ele também serão apagados.`,
            botao: "Excluir serviço"
        });
        if (!ok) return;

        try {
            await api(`/servico/${servico.id_servico}`, { metodo: "DELETE" });
            setSucesso(`Serviço "${servico.titulo}" excluído.`);
            await Promise.all([carregar(), recarregar()]); // pedidos do serviço somem do painel também
        } catch (e) {
            setErro(e.message);
        }
    }

    const lista = (servicos ?? []).filter((s) => combinaComBusca(busca, s.titulo, s.categoria, s.tag));

    return (
        <>
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
                <div>
                    <h1 className="fw-bold h2 mb-1">Meus serviços</h1>
                    <p className="texto-suave mb-0">Cadastre, edite e exclua os serviços que aparecem no seu perfil.</p>
                </div>
                <button className="btn btn-primary px-4" onClick={() => setEditando({})}>
                    <i className="bi bi-plus-lg me-1"></i> Novo serviço
                </button>
            </div>

            <Alerta>{erro}</Alerta>
            <Alerta tipo="success">{sucesso}</Alerta>

            {servicos === null ? <Carregando /> : (
                <div className="card-cp overflow-hidden">
                    {lista.length === 0 ? (
                        <Vazio icone="bi-tools">
                            {servicos.length === 0 ? "Você ainda não cadastrou nenhum serviço." : "Nenhum serviço encontrado na busca."}
                        </Vazio>
                    ) : (
                        <div className="table-responsive">
                            <table className="table tabela-cp mb-0">
                                <thead>
                                    <tr>
                                        <th>Serviço</th>
                                        <th>Categoria</th>
                                        <th>Duração</th>
                                        <th>Valor</th>
                                        <th className="text-end">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {lista.map((servico) => (
                                        <tr key={servico.id_servico}>
                                            <td>
                                                <div className="d-flex align-items-center gap-3">
                                                    <div style={{ width: 56 }} className="rounded-2 overflow-hidden flex-shrink-0">
                                                        <ImagemServico src={servico.imagem} categoria={servico.categoria} alt="" altura={42} />
                                                    </div>
                                                    <div>
                                                        <Link href={`/servico/${servico.id_servico}`} className="fw-semibold text-dark">{servico.titulo}</Link>
                                                        <div className="small texto-suave">{servico.tipo_servico}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{servico.categoria}</td>
                                            <td className="texto-suave">{servico.tempo_prestacao || "-"}</td>
                                            <td className="fw-semibold text-nowrap">{formatarPreco(servico.preco)}</td>
                                            <td className="text-end text-nowrap">
                                                <button className="btn btn-sm btn-branco me-1" onClick={() => setFotosDe(servico)} title="Fotos">
                                                    <i className="bi bi-images"></i>
                                                </button>
                                                <button className="btn btn-sm btn-branco me-1" onClick={() => setEditando(servico)} title="Editar">
                                                    <i className="bi bi-pencil"></i>
                                                </button>
                                                <button className="btn btn-sm btn-outline-danger" onClick={() => excluir(servico)} title="Excluir">
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}

            {editando && (
                <Modal titulo={editando.id_servico ? "Editar serviço" : "Novo serviço"} aoFechar={() => setEditando(null)}>
                    <FormServico
                        servico={editando.id_servico ? editando : null}
                        aoCancelar={() => setEditando(null)}
                        aoSalvar={() => {
                            setSucesso(editando.id_servico ? "Serviço atualizado com sucesso." : "Serviço cadastrado com sucesso.");
                            setErro("");
                            setEditando(null);
                            carregar();
                        }}
                    />
                </Modal>
            )}

            {fotosDe && (
                <Modal titulo={`Fotos: ${fotosDe.titulo}`} aoFechar={() => { setFotosDe(null); carregar(); }}>
                    <MidiasServico servico={fotosDe} />
                </Modal>
            )}

            {janelaConfirmar}
        </>
    );
}
