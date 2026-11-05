"use client";

// Cadastro de profissional: /criarContaProfissional
// Cria a conta, faz o login e cadastra o primeiro serviço. Depois leva para o painel.

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CampoImagem from "@/components/ui/CampoImagem";
import CamposEndereco from "@/components/ui/CamposEndereco";
import { Alerta } from "@/components/ui/Mensagem";
import { api } from "@/lib/api";
import { CATEGORIAS, montarEndereco } from "@/lib/formatar";
import { useSessao } from "@/lib/sessao";

export default function CadastroProfissional() {
    const router = useRouter();
    const { entrar } = useSessao();

    const [foto, setFoto] = useState("");
    const [endereco, setEndereco] = useState({ cep: "", rua: "", numero: "", bairro: "", cidade: "", estado: "" });
    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(false);

    async function cadastrarProfissional(event) {
        event.preventDefault();
        setErro("");

        const campos = new FormData(event.currentTarget);
        const senha = campos.get("senha");

        if (senha.length < 8) return setErro("A senha deve ter pelo menos 8 caracteres.");
        if (senha !== campos.get("confirmarSenha")) return setErro("As senhas não coincidem.");

        try {
            setCarregando(true);

            // 1) cria o profissional (data de ingresso e saldo são preenchidos pelo back-end)
            await api("/profissional", {
                metodo: "POST",
                dados: {
                    nome: campos.get("nome"),
                    email: campos.get("email"),
                    telefone: campos.get("telefone"),
                    senha,
                    foto: foto || null,
                    localizacao: montarEndereco(endereco),
                    profissao: campos.get("profissao"),
                    visao_geral: campos.get("visao_geral"),
                    idioma: campos.get("idioma") || null
                }
            });

            // 2) entra na conta
            await entrar(campos.get("email"), senha, "profissional");

            // 3) cadastra o primeiro serviço (o back-end liga ao profissional logado).
            //    A conta já existe neste ponto: se o serviço falhar, não mostramos erro no cadastro
            //    (tentar de novo daria "e-mail já usado"); levamos para "Meus serviços" para cadastrar lá.
            const servicoCriado = await api("/servico", {
                metodo: "POST",
                dados: {
                    titulo: campos.get("titulo"),
                    categoria: campos.get("categoria"),
                    tipo_servico: campos.get("tipo_servico"),
                    preco: Number(campos.get("preco")),
                    tempo_prestacao: campos.get("tempo_prestacao") || null,
                    descricao: campos.get("descricao") || null
                }
            }).then(() => true).catch(() => false);

            router.push(servicoCriado ? "/inicioProfissional" : "/inicioProfissional/meusServicos");
        } catch (e) {
            setErro(e.message);
            setCarregando(false);
        }
    }

    return (
        <main className="container py-5">
            <div className="mx-auto" style={{ maxWidth: "850px" }}>
                <div className="text-center mb-4">
                    <h1 className="fw-bold">Criar conta de profissional</h1>
                    <p className="texto-suave">Cadastre seus dados e apresente os serviços que você oferece.</p>
                </div>

                <form onSubmit={cadastrarProfissional} className="card-cp shadow-sm p-4 p-md-5">
                    <Alerta>{erro}</Alerta>

                    <section className="mb-4">
                        <h2 className="h5 fw-bold mb-3">Foto de perfil <small className="texto-suave fw-normal">(opcional)</small></h2>
                        <CampoImagem valor={foto} aoMudar={setFoto} rotulo="Escolher foto" />
                    </section>

                    <hr />

                    <section className="mb-4">
                        <h2 className="h5 fw-bold mb-3">Dados pessoais</h2>
                        <div className="row g-3">
                            <div className="col-12">
                                <label htmlFor="nome" className="form-label">Nome completo *</label>
                                <input id="nome" name="nome" className="form-control" maxLength={100} autoComplete="name" placeholder="Digite seu nome completo" required />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="email" className="form-label">E-mail *</label>
                                <input id="email" name="email" type="email" className="form-control" maxLength={100} autoComplete="email" placeholder="seuemail@exemplo.com" required />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="telefone" className="form-label">Telefone *</label>
                                <input id="telefone" name="telefone" type="tel" className="form-control" maxLength={20} autoComplete="tel" placeholder="(11) 99999-9999" required />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="profissao" className="form-label">Profissão *</label>
                                <input id="profissao" name="profissao" className="form-control" maxLength={100} placeholder="Ex.: Eletricista" required />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="idioma" className="form-label">Idiomas</label>
                                <input id="idioma" name="idioma" className="form-control" maxLength={50} placeholder="Ex.: Português" />
                            </div>
                            <div className="col-12">
                                <label htmlFor="visao_geral" className="form-label">Sobre você *</label>
                                <textarea id="visao_geral" name="visao_geral" rows={4} maxLength={700} className="form-control"
                                    placeholder="Descreva sua experiência e como você trabalha" required />
                            </div>
                        </div>
                    </section>

                    <hr />

                    <section className="mb-4">
                        <h2 className="h5 fw-bold mb-1">Seu primeiro serviço</h2>
                        <p className="texto-suave small">Depois você pode cadastrar outros em <strong>Meus serviços</strong>.</p>
                        <div className="row g-3">
                            <div className="col-md-8">
                                <label htmlFor="titulo" className="form-label">Nome do serviço *</label>
                                <input id="titulo" name="titulo" className="form-control" maxLength={150} placeholder="Ex.: Instalação elétrica" required />
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="categoria" className="form-label">Categoria *</label>
                                <select id="categoria" name="categoria" className="form-select" defaultValue="" required>
                                    <option value="" disabled>Selecione</option>
                                    {CATEGORIAS.map((categoria) => <option key={categoria} value={categoria}>{categoria}</option>)}
                                </select>
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="preco" className="form-label">Preço inicial (R$) *</label>
                                <input id="preco" name="preco" type="number" min="0" step="0.01" className="form-control" placeholder="0,00" required />
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="tipo_servico" className="form-label">Modalidade *</label>
                                <select id="tipo_servico" name="tipo_servico" className="form-select" defaultValue="Presencial" required>
                                    <option value="Presencial">Presencial</option>
                                    <option value="Online">Online</option>
                                    <option value="Presencial ou online">Presencial ou online</option>
                                </select>
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="tempo_prestacao" className="form-label">Duração</label>
                                <input id="tempo_prestacao" name="tempo_prestacao" className="form-control" maxLength={50} placeholder="Ex.: 2 horas" />
                            </div>
                            <div className="col-12">
                                <label htmlFor="descricao" className="form-label">Descrição do serviço</label>
                                <textarea id="descricao" name="descricao" rows={3} maxLength={1000} className="form-control"
                                    placeholder="O que está incluso no serviço?" />
                            </div>
                        </div>
                    </section>

                    <hr />

                    <section className="mb-4">
                        <h2 className="h5 fw-bold mb-1">Endereço</h2>
                        <p className="texto-suave small">Região onde você atende.</p>
                        <CamposEndereco endereco={endereco} aoMudar={setEndereco} obrigatorio />
                    </section>

                    <hr />

                    <section className="mb-4">
                        <h2 className="h5 fw-bold mb-3">Segurança</h2>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label htmlFor="senha" className="form-label">Senha *</label>
                                <input id="senha" name="senha" type="password" className="form-control" minLength={8} autoComplete="new-password" placeholder="Mínimo de 8 caracteres" required />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="confirmarSenha" className="form-label">Confirmar senha *</label>
                                <input id="confirmarSenha" name="confirmarSenha" type="password" className="form-control" minLength={8} autoComplete="new-password" placeholder="Digite a senha novamente" required />
                            </div>
                        </div>
                    </section>

                    <button type="submit" className="btn btn-primary w-100 py-3 fw-semibold" disabled={carregando}>
                        {carregando ? "Cadastrando..." : "Criar minha conta"}
                    </button>

                    <p className="texto-suave text-center small mt-3 mb-0">
                        Já tem conta? <Link href="/login?tipo=profissional">Entrar</Link> · Os campos com * são obrigatórios.
                    </p>
                </form>
            </div>
        </main>
    );
}
