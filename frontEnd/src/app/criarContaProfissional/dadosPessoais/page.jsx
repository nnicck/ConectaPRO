"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";

import EtapasContaProfissonal from "@/components/EtapasContaProfissional";
import BarraNavegacao from "@/components/BarraNavegacao";
import Rodape from "@/components/Rodape";
import BotoesNavegacao from "@/components/BotoesNavegacao";

export default function CadastroProfissional() {
    const router = useRouter();

    const [foto, setFoto] = useState(null);
    const [preview, setPreview] = useState("");
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState("");

    // Cria a prévia da imagem selecionada
    useEffect(() => {
        if (!foto) {
            setPreview("");
            return;
        }

        const url = URL.createObjectURL(foto);
        setPreview(url);

        return () => URL.revokeObjectURL(url);
    }, [foto]);

    function selecionarFoto(event) {
        const arquivo = event.target.files?.[0];

        if (!arquivo) return;

        if (!arquivo.type.startsWith("image/")) {
            setErro("Selecione um arquivo de imagem válido.");
            event.target.value = "";
            return;
        }

        // Limite de 5 MB
        if (arquivo.size > 5 * 1024 * 1024) {
            setErro("A imagem deve ter no máximo 5 MB.");
            event.target.value = "";
            return;
        }

        setErro("");
        setFoto(arquivo);
    }

    async function enviarFormulario(event) {
        event.preventDefault();
        setErro("");

        const formulario = event.currentTarget;
        const dados = new FormData(formulario);

        // Adiciona o arquivo ao formulário
        if (foto) {
            dados.set("foto", foto);
        }

        setCarregando(true);

        try {
            const resposta = await fetch("/api/profissionais", {
                method: "POST",
                body: dados,
            });

            const resultado = await resposta.json();

            if (!resposta.ok) {
                throw new Error(
                    resultado.mensagem || "Não foi possível cadastrar o profissional."
                );
            }

            // Prossegue somente após a confirmação da API
            router.push("/criarContaProfissional/servicosProf");
        } catch (error) {
            setErro(
                error.message ||
                "Erro ao enviar o cadastro. Verifique sua conexão."
            );
        } finally {
            setCarregando(false);
        }
    }

    return (
        <div className="d-flex flex-column min-vh-100">
            <header>
                <BarraNavegacao
                    botaoUm="Cadastre-se"
                    botaoDois="Cadastre-se como profissional"
                    botaoTres="Entrar"
                />
            </header>

            <main className="container flex-grow-1 py-5 mt-2">
                <div className="d-flex justify-content-center mb-5">
                    <EtapasContaProfissonal etapaAtiva={1} />
                </div>

                <div
                    className="row justify-content-center align-items-center g-5"
                    style={{ marginTop: "10px" }}
                >
                    {/* FOTO DE PERFIL */}
                    <div className="col-12 col-md-4 col-lg-3">
                        <div className="d-flex flex-column align-items-center">
                            <p className="text-center fw-semibold">
                                Foto de perfil
                            </p>

                            <img
                                src={preview || "/avatar.png"}
                                className="rounded-circle border shadow-sm"
                                style={{
                                    width: 200,
                                    height: 200,
                                    objectFit: "cover",
                                    backgroundColor: "#f1f5f9",
                                }}
                                alt="Prévia da foto de perfil"
                            />

                            <label
                                htmlFor="foto"
                                className="btn btn-primary mt-3"
                            >
                                <i className="bi bi-camera me-2"></i>
                                Escolher imagem
                            </label>

                            <input
                                type="file"
                                className="d-none"
                                id="foto"
                                name="foto"
                                accept="image/*"
                                onChange={selecionarFoto}
                            />

                            <small className="text-secondary text-center mt-2">
                                JPG, PNG ou outro formato de imagem.
                                Máximo de 5 MB.
                            </small>

                            {foto && (
                                <button
                                    type="button"
                                    className="btn btn-link btn-sm text-danger"
                                    onClick={() => setFoto(null)}
                                >
                                    Remover foto
                                </button>
                            )}
                        </div>
                    </div>

                    {/* FORMULÁRIO */}
                    <div className="col-12 col-md-7 col-lg-6">
                        <form onSubmit={enviarFormulario}>
                            <div className="mb-4">
                                <label htmlFor="nome" className="form-label">
                                    Nome
                                </label>

                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    id="nome"
                                    name="nome"
                                    placeholder="Digite seu nome"
                                    autoComplete="name"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="email" className="form-label">
                                    E-mail
                                </label>

                                <input
                                    type="email"
                                    className="form-control form-control-lg"
                                    id="email"
                                    name="email"
                                    placeholder="Digite seu e-mail"
                                    autoComplete="email"
                                    required
                                />
                            </div>

                            <div className="row g-3">
                                <div className="col-12 col-md-6">
                                    <label
                                        htmlFor="telefone"
                                        className="form-label"
                                    >
                                        Telefone
                                    </label>

                                    <input
                                        type="tel"
                                        className="form-control form-control-lg"
                                        id="telefone"
                                        name="telefone"
                                        placeholder="(11) 99999-9999"
                                        autoComplete="tel"
                                        required
                                    />
                                </div>

                                <div className="col-12 col-md-6">
                                    <label
                                        htmlFor="nascimento"
                                        className="form-label"
                                    >
                                        Data de nascimento
                                    </label>

                                    <input
                                        type="date"
                                        className="form-control form-control-lg"
                                        id="nascimento"
                                        name="nascimento"
                                        autoComplete="bday"
                                        required
                                    />
                                </div>
                            </div>

                            {erro && (
                                <div className="alert alert-danger mt-4" role="alert">
                                    {erro}
                                </div>
                            )}

                            <BotoesNavegacao
                            voltar="/"
                            proximo="/criarContaProfissional/servicosProf"
                            />
                        </form>
                    </div>
                </div>
            </main>

            <Rodape />
        </div>
    );
}