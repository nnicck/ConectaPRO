"use client";

// Cadastro de cliente: /criarContaCliente
// Cria a conta (POST /api/cliente), já faz o login e leva para "Minha conta".

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CampoImagem from "@/components/ui/CampoImagem";
import CamposEndereco from "@/components/ui/CamposEndereco";
import { Alerta } from "@/components/ui/Mensagem";
import { api } from "@/lib/api";
import { montarEndereco } from "@/lib/formatar";
import { useSessao } from "@/lib/sessao";

export default function CriarContaCliente() {
    const router = useRouter();
    const { entrar } = useSessao();

    const [foto, setFoto] = useState("");
    const [endereco, setEndereco] = useState({ cep: "", rua: "", numero: "", bairro: "", cidade: "", estado: "" });
    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(false);

    async function cadastrarCliente(event) {
        event.preventDefault();
        setErro("");

        const campos = new FormData(event.currentTarget);
        const senha = campos.get("senha");

        if (senha.length < 8) return setErro("A senha deve ter pelo menos 8 caracteres.");
        if (senha !== campos.get("confirmarSenha")) return setErro("As senhas não coincidem.");

        try {
            setCarregando(true);

            // CREATE do cliente
            await api("/cliente", {
                metodo: "POST",
                dados: {
                    nome: campos.get("nome"),
                    email: campos.get("email"),
                    telefone: campos.get("telefone"),
                    localizacao: montarEndereco(endereco) || null,
                    senha,
                    foto: foto || null
                }
            });

            // já entra na conta recém-criada
            await entrar(campos.get("email"), senha, "cliente");
            router.push("/inicioCliente");
        } catch (e) {
            setErro(e.message);
            setCarregando(false);
        }
    }

    return (
        <main className="container py-5">
            <div className="mx-auto" style={{ maxWidth: "850px" }}>
                <div className="text-center mb-4">
                    <h1 className="fw-bold">Criar conta de cliente</h1>
                    <p className="texto-suave">Preencha seus dados para começar a contratar no ConectaPRO.</p>
                </div>

                <form onSubmit={cadastrarCliente} className="card-cp shadow-sm p-4 p-md-5">
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
                                <input id="nome" name="nome" className="form-control" maxLength={100} placeholder="Digite seu nome completo" autoComplete="name" required />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="email" className="form-label">E-mail *</label>
                                <input id="email" name="email" type="email" className="form-control" maxLength={100} placeholder="seuemail@exemplo.com" autoComplete="email" required />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="telefone" className="form-label">Telefone *</label>
                                <input id="telefone" name="telefone" type="tel" className="form-control" maxLength={20} placeholder="(11) 99999-9999" autoComplete="tel" required />
                            </div>
                        </div>
                    </section>

                    <hr />

                    <section className="mb-4">
                        <h2 className="h5 fw-bold mb-1">Endereço</h2>
                        <p className="texto-suave small">Seu endereço de cadastro. O CEP é opcional.</p>
                        <CamposEndereco endereco={endereco} aoMudar={setEndereco} />
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
                        Já tem conta? <Link href="/login?tipo=cliente">Entrar</Link> · Os campos com * são obrigatórios.
                    </p>
                </form>
            </div>
        </main>
    );
}
