"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CampoImagem from "@/components/ui/CampoImagem";
import CamposEndereco from "@/components/ui/CamposEndereco";
import { Alerta } from "@/components/ui/Mensagem";
import { useConfirmar } from "@/components/ui/Confirmar";
import { api } from "@/lib/api";
import { lerEndereco, montarEndereco } from "@/lib/formatar";
import { useSessao } from "@/lib/sessao";

// Formulário "Editar Perfil" usado pelo cliente e pelo profissional.
//   tipo: "cliente" | "profissional"
//   registro: dados atuais vindos da API (GET /cliente/:id ou /profissional/:id)
//   aoSalvar: chamado depois de salvar (para recarregar os dados do painel)
// Depois de salvar, volta para o perfil (cliente: /inicioCliente, profissional: /inicioProfissional)
// com ?perfil=salvo, que mostra o aviso "Alterações salvas" lá.
export default function FormPerfil({ tipo, registro, aoSalvar }) {
    const router = useRouter();
    const { atualizarSessao, sair } = useSessao();
    const [confirmar, janelaConfirmar] = useConfirmar();
    const ehProfissional = tipo === "profissional";
    const paginaPerfil = ehProfissional ? "/inicioProfissional" : "/inicioCliente";
    const id = ehProfissional ? registro.id_profissional : registro.id_cliente;

    const [dados, setDados] = useState({
        nome: registro.nome ?? "",
        email: registro.email ?? "",
        telefone: registro.telefone ?? "",
        foto: registro.foto ?? "",
        profissao: registro.profissao ?? "",
        idioma: registro.idioma ?? "",
        visao_geral: registro.visao_geral ?? "",
        senha: "",
        confirmarSenha: ""
    });
    const [endereco, setEndereco] = useState(() => ({ cep: "", ...lerEndereco(registro.localizacao) }));
    const [salvando, setSalvando] = useState(false);
    const [mensagem, setMensagem] = useState({ tipo: "", texto: "" });

    function mudar(evento) {
        setDados({ ...dados, [evento.target.name]: evento.target.value });
    }

    async function salvar(evento) {
        evento.preventDefault();
        setMensagem({ tipo: "", texto: "" });

        if (dados.senha && dados.senha.length < 8) {
            return mostrarErro("A nova senha deve ter pelo menos 8 caracteres.");
        }

        if (dados.senha !== dados.confirmarSenha) {
            return mostrarErro("As senhas não coincidem.");
        }

        const corpo = {
            nome: dados.nome,
            email: dados.email,
            telefone: dados.telefone,
            foto: dados.foto || null,
            localizacao: montarEndereco(endereco) || null,
            senha: dados.senha // vazio = o back-end mantém a senha atual
        };

        if (ehProfissional) {
            corpo.profissao = dados.profissao;
            corpo.idioma = dados.idioma || null;
            corpo.visao_geral = dados.visao_geral || null;
        }

        try {
            setSalvando(true);
            await api(`/${tipo}/${id}`, { metodo: "PUT", dados: corpo });
            await atualizarSessao({ nome: corpo.nome, email: corpo.email, foto: corpo.foto });
            await aoSalvar?.();
            router.push(`${paginaPerfil}?perfil=salvo`); // volta para o perfil
        } catch (e) {
            mostrarErro(e.message);
            setSalvando(false);
        }
    }

    // o aviso fica no topo do formulário, então rola a tela até ele
    function mostrarErro(texto) {
        setMensagem({ tipo: "danger", texto });
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    async function excluirConta() {
        const confirmado = await confirmar({
            titulo: "Excluir conta",
            mensagem: "Tem certeza que deseja excluir sua conta? Todos os seus dados, serviços e pedidos serão apagados. Esta ação não pode ser desfeita.",
            botao: "Excluir minha conta"
        });
        if (!confirmado) return;

        try {
            await api(`/${tipo}/${id}`, { metodo: "DELETE" });
            await sair();
        } catch (e) {
            mostrarErro(e.message);
        }
    }

    return (
        <>
        <form onSubmit={salvar} className="card-cp p-4 p-md-5 mx-auto" style={{ maxWidth: 900 }}>
            <Alerta tipo={mensagem.tipo}>{mensagem.texto}</Alerta>

            <div className="mb-4">
                <p className="mb-2 fw-semibold">Foto de perfil</p>
                <CampoImagem valor={dados.foto} aoMudar={(url) => setDados({ ...dados, foto: url })} />
            </div>

            <h2 className="h5 fw-bold my-4 pb-2 border-bottom">Informações Pessoais</h2>
            <div className="row g-3">
                <div className="col-md-6">
                    <label htmlFor="nome" className="form-label">Nome completo *</label>
                    <input id="nome" name="nome" className="form-control" maxLength={100} required value={dados.nome} onChange={mudar} />
                </div>
                <div className="col-md-6">
                    <label htmlFor="email" className="form-label">E-mail *</label>
                    <input id="email" name="email" type="email" className="form-control" maxLength={100} required value={dados.email} onChange={mudar} />
                </div>
                <div className="col-md-6">
                    <label htmlFor="telefone" className="form-label">Telefone *</label>
                    <input id="telefone" name="telefone" type="tel" className="form-control" maxLength={20} required value={dados.telefone} onChange={mudar} />
                </div>

                {ehProfissional && (
                    <>
                        <div className="col-md-6">
                            <label htmlFor="profissao" className="form-label">Profissão *</label>
                            <input id="profissao" name="profissao" className="form-control" maxLength={100} required value={dados.profissao} onChange={mudar} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="idioma" className="form-label">Idiomas</label>
                            <input id="idioma" name="idioma" className="form-control" maxLength={50} placeholder="Ex.: Português e Inglês" value={dados.idioma} onChange={mudar} />
                        </div>
                        <div className="col-12">
                            <label htmlFor="visao_geral" className="form-label">Sobre você</label>
                            <textarea id="visao_geral" name="visao_geral" rows={4} className="form-control" maxLength={700}
                                placeholder="Conte sua experiência e como você trabalha" value={dados.visao_geral} onChange={mudar} />
                            <div className="form-text text-end">{dados.visao_geral.length}/700</div>
                        </div>
                    </>
                )}
            </div>

            <h2 className="h5 fw-bold my-4 pb-2 border-bottom">Endereço</h2>
            <CamposEndereco endereco={endereco} aoMudar={setEndereco} />

            <h2 className="h5 fw-bold my-4 pb-2 border-bottom">Alterar senha</h2>
            <div className="row g-3">
                <div className="col-md-6">
                    <label htmlFor="senha" className="form-label">Nova senha</label>
                    <input id="senha" name="senha" type="password" className="form-control" autoComplete="new-password"
                        placeholder="Deixe em branco para manter a atual" value={dados.senha} onChange={mudar} />
                </div>
                <div className="col-md-6">
                    <label htmlFor="confirmarSenha" className="form-label">Confirmar nova senha</label>
                    <input id="confirmarSenha" name="confirmarSenha" type="password" className="form-control" autoComplete="new-password"
                        value={dados.confirmarSenha} onChange={mudar} />
                </div>
            </div>

            <div className="d-flex flex-column flex-sm-row justify-content-center gap-2 mt-5">
                <Link href={paginaPerfil} className="btn btn-branco px-5 py-2">Cancelar</Link>
                <button type="submit" className="btn btn-primary fw-semibold px-5 py-2" disabled={salvando}>
                    {salvando ? "Salvando..." : "Salvar Alterações"}
                </button>
            </div>

            <hr className="my-4" />
            <div className="text-center">
                <button type="button" className="btn btn-link text-danger" onClick={excluirConta}>
                    <i className="bi bi-trash me-1"></i> Excluir minha conta
                </button>
            </div>
        </form>

        {janelaConfirmar}
        </>
    );
}
