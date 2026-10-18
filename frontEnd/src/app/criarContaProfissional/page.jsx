"use client";

import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = "http://localhost:3001/api/profissional";

export default function CadastroProfissional() {
    const [foto, setFoto] = useState(null);
    const [preview, setPreview] = useState("");
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState("");

    // Gerar prévia da foto, sem enviá-la ao backend
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

        if (!arquivo) {
            setFoto(null);
            return;
        }

        if (!arquivo.type.startsWith("image/")) {
            setErro("Selecione um arquivo de imagem válido.");
            event.target.value = "";
            return;
        }

        if (arquivo.size > 5 * 1024 * 1024) {
            setErro("A imagem deve ter no máximo 5 MB.");
            event.target.value = "";
            return;
        }

        setErro("");
        setFoto(arquivo);
    }

    async function cadastrarProfissional(event) {
        event.preventDefault();

        setErro("");
        setSucesso("");

        const formulario = event.currentTarget;
        const campos = new FormData(formulario);

        const senha = campos.get("senha");
        const confirmarSenha = campos.get("confirmarSenha");

        if (senha !== confirmarSenha) {
            setErro("As senhas não coincidem.");
            return;
        }

        if (senha.length < 8) {
            setErro("A senha deve ter pelo menos 8 caracteres.");
            return;
        }

        // Reunir o endereço em um único campo
        const localizacao = [
            ["CEP", "cep"],
            ["Estado", "estado"],
            ["Rua", "rua"],
            ["Número", "numero"],
            ["Complemento", "complemento"],
            ["Bairro", "bairro"],
            ["Cidade", "cidade"]
        ]
            .filter(([_, campo]) => campos.get(campo))
            .map(([rotulo, campo]) => `${rotulo}: ${campos.get(campo)}`)
            .join(", ");

        // Montar o objeto que será enviado em JSON
        const dadosProfissional = {
            nome: campos.get("nome"),
            email: campos.get("email") ,
            telefone: campos.get("telefone") ,
            senha: campos.get("senha") ,
            foto ,
            localizacao,
            profissao: campos.get("nomeServico") ,
            visao_geral: campos.get("descricao") ,
            idioma: null,
            data_ingresso: null,
            saldo: null
        };

        try {
            setCarregando(true);

            const resposta = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dadosProfissional)
            });

            const resultado = await resposta.json().catch(() => ({}));

            if (!resposta.ok || resultado.sucesso === false) {
                throw new Error(
                    resultado.mensagem ||
                    resultado.erro ||
                    "Não foi possível cadastrar o profissional."
                );
            }

            setSucesso(
                resultado.mensagem || "Cadastro realizado com sucesso!"
            );

            formulario.reset();
            setFoto(null);

        } catch (error) {
            console.error("Erro ao cadastrar profissional:", error);

            setErro(
                error.message ||
                "Erro ao enviar o cadastro. Verifique sua conexão."
            );
        } finally {
            setCarregando(false);
        }
    }

    return (
        <main className="container py-5">
            <div className="row justify-content-center">
                <div className="col-12 col-lg-8">
                    <h2 className="fw-bold text-center mb-4">
                        Cadastro de profissional
                    </h2>

                    <form onSubmit={cadastrarProfissional}>
                        {/* FOTO */}
                        <div className="d-flex flex-column align-items-center mb-4">
                            <img
                                src={preview || "/avatar.png"}
                                alt="Prévia da foto de perfil"
                                className="rounded-circle border shadow-sm"
                                style={{
                                    width: 150,
                                    height: 150,
                                    objectFit: "cover"
                                }}
                            />

                            <label
                                htmlFor="foto"
                                className="btn btn-primary mt-3"
                            >
                                Escolher imagem
                            </label>

                            <input
                                type="file"
                                id="foto"
                                accept="image/*"
                                className="d-none"
                                onChange={selecionarFoto}
                            />

                            <small className="text-secondary mt-2">
                                Máximo de 5 MB. A foto não será enviada.
                            </small>
                        </div>

                        {/* DADOS PESSOAIS */}
                        <h5 className="fw-semibold mt-4">Dados pessoais</h5>

                        <div className="row g-3 mb-3">
                            <div className="col-12">
                                <label htmlFor="nome" className="form-label">
                                    Nome
                                </label>
                                <input
                                    id="nome"
                                    name="nome"
                                    className="form-control"
                                    maxLength={100}
                                    required
                                />
                            </div>

                            <div className="col-12 col-md-6">
                                <label htmlFor="email" className="form-label">
                                    E-mail
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="form-control"
                                    maxLength={100}
                                    required
                                />
                            </div>

                            <div className="col-12 col-md-6">
                                <label htmlFor="telefone" className="form-label">
                                    Telefone
                                </label>
                                <input
                                    type="tel"
                                    id="telefone"
                                    name="telefone"
                                    className="form-control"
                                    placeholder="(11) 99999-9999"
                                    required
                                />
                            </div>

                            <div className="col-12 col-md-6">
                                <label htmlFor="nascimento" className="form-label">
                                    Data de nascimento
                                </label>
                                <input
                                    type="date"
                                    id="nascimento"
                                    name="nascimento"
                                    className="form-control"
                                    required
                                />
                            </div>
                        </div>

                        {/* SERVIÇO */}
                        <h5 className="fw-semibold mt-4">Serviço oferecido</h5>

                        <div className="row g-3 mb-3">
                            <div className="col-12 col-md-8">
                                <label htmlFor="nomeServico" className="form-label">
                                    Nome do serviço
                                </label>
                                <input
                                    id="nomeServico"
                                    name="nomeServico"
                                    className="form-control"
                                    required
                                />
                            </div>

                            <div className="col-12 col-md-4">
                                <label htmlFor="categoria" className="form-label">
                                    Categoria
                                </label>
                                <select
                                    id="categoria"
                                    name="categoria"
                                    className="form-select"
                                    defaultValue=""
                                    required
                                >
                                    <option value="" disabled>Selecione</option>
                                    <option value="limpeza">Limpeza</option>
                                    <option value="eletrica">Elétrica</option>
                                    <option value="construcao">Construção</option>
                                    <option value="encanamento">Encanamento</option>
                                    <option value="outros">Outros</option>
                                </select>
                            </div>

                            <div className="col-12">
                                <label htmlFor="descricao" className="form-label">
                                    Descrição do serviço
                                </label>
                                <textarea
                                    id="descricao"
                                    name="descricao"
                                    rows="4"
                                    className="form-control"
                                    required
                                />
                            </div>

                            <div className="col-12 col-md-4">
                                <label htmlFor="preco" className="form-label">
                                    Preço inicial (R$)
                                </label>
                                <input
                                    type="number"
                                    id="preco"
                                    name="preco"
                                    min="0"
                                    step="0.01"
                                    className="form-control"
                                    required
                                />
                            </div>

                            <div className="col-12 col-md-4">
                                <label htmlFor="modalidade" className="form-label">
                                    Como você atende?
                                </label>
                                <select
                                    id="modalidade"
                                    name="modalidade"
                                    className="form-select"
                                    defaultValue=""
                                    required
                                >
                                    <option value="" disabled>Selecione</option>
                                    <option value="Online">Online</option>
                                    <option value="Presencial">Presencial</option>
                                </select>
                            </div>

                            <div className="col-12 col-md-4">
                                <label htmlFor="disponibilidade" className="form-label">
                                    Disponibilidade
                                </label>
                                <select
                                    id="disponibilidade"
                                    name="disponibilidade"
                                    className="form-select"
                                    defaultValue="Seg - Sex"
                                >
                                    <option value="Seg - Sex">Seg - Sex</option>
                                    <option value="Personalizar">Personalizar</option>
                                </select>
                            </div>

                            <div className="col-12">
                                <label
                                    htmlFor="diasPersonalizados"
                                    className="form-label"
                                >
                                    Dias personalizados (opcional)
                                </label>
                                <input
                                    id="diasPersonalizados"
                                    name="diasPersonalizados"
                                    className="form-control"
                                    placeholder="Ex.: Seg, Qua e Sex"
                                />
                            </div>
                        </div>

                        {/* ENDEREÇO */}
                        <h5 className="fw-semibold mt-4">Onde você atende</h5>

                        <div className="row g-3 mb-3">
                            <div className="col-12 col-md-6">
                                <label htmlFor="cep" className="form-label">
                                    CEP
                                </label>
                                <input
                                    id="cep"
                                    name="cep"
                                    className="form-control"
                                    placeholder="01000-000"
                                    maxLength={9}
                                    required
                                />
                            </div>

                            <div className="col-12 col-md-6">
                                <label htmlFor="estado" className="form-label">
                                    Estado
                                </label>
                                <input
                                    id="estado"
                                    name="estado"
                                    className="form-control"
                                    placeholder="SP"
                                    maxLength={2}
                                    required
                                />
                            </div>

                            <div className="col-12 col-md-8">
                                <label htmlFor="rua" className="form-label">
                                    Rua ou avenida
                                </label>
                                <input
                                    id="rua"
                                    name="rua"
                                    className="form-control"
                                    required
                                />
                            </div>

                            <div className="col-12 col-md-4">
                                <label htmlFor="numero" className="form-label">
                                    Número
                                </label>
                                <input
                                    id="numero"
                                    name="numero"
                                    className="form-control"
                                    required
                                />
                            </div>

                            <div className="col-12">
                                <label htmlFor="complemento" className="form-label">
                                    Complemento
                                </label>
                                <input
                                    id="complemento"
                                    name="complemento"
                                    className="form-control"
                                    placeholder="Opcional"
                                />
                            </div>

                            <div className="col-12 col-md-6">
                                <label htmlFor="bairro" className="form-label">
                                    Bairro
                                </label>
                                <input
                                    id="bairro"
                                    name="bairro"
                                    className="form-control"
                                    required
                                />
                            </div>

                            <div className="col-12 col-md-6">
                                <label htmlFor="cidade" className="form-label">
                                    Cidade
                                </label>
                                <input
                                    id="cidade"
                                    name="cidade"
                                    className="form-control"
                                    required
                                />
                            </div>
                        </div>

                        {/* SEGURANÇA */}
                        <h5 className="fw-semibold mt-4">Segurança</h5>

                        <div className="row g-3 mb-3">
                            <div className="col-12 col-md-6">
                                <label htmlFor="senha" className="form-label">
                                    Nova senha
                                </label>
                                <input
                                    type="password"
                                    id="senha"
                                    name="senha"
                                    className="form-control"
                                    minLength={8}
                                    autoComplete="new-password"
                                    required
                                />
                            </div>

                            <div className="col-12 col-md-6">
                                <label
                                    htmlFor="confirmarSenha"
                                    className="form-label"
                                >
                                    Confirmar senha
                                </label>
                                <input
                                    type="password"
                                    id="confirmarSenha"
                                    name="confirmarSenha"
                                    className="form-control"
                                    minLength={8}
                                    autoComplete="new-password"
                                    required
                                />
                            </div>
                        </div>

                        {erro && (
                            <div className="alert alert-danger mt-4" role="alert">
                                {erro}
                            </div>
                        )}

                        {sucesso && (
                            <div className="alert alert-success mt-4" role="alert">
                                {sucesso}
                            </div>
                        )}

                        <div className="d-flex justify-content-end mt-4">
                            <button
                                type="submit"
                                className="btn btn-primary btn-lg px-5"
                                disabled={carregando}
                            >
                                {carregando ? "Cadastrando..." : "Cadastrar"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}