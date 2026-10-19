"use client";

import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = "http://localhost:3001/api/profissional";

export default function CadastroProfissional() {
    const [foto, setFoto] = useState(null);
    const [preview, setPreview] = useState("");
    const [carregando, setCarregando] = useState(false);
    const [mensagem, setMensagem] = useState("");
    const [tipoMensagem, setTipoMensagem] = useState("");

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
            setMensagem("Selecione um arquivo de imagem válido.");
            setTipoMensagem("danger");
            event.target.value = "";
            return;
        }

        if (arquivo.size > 5 * 1024 * 1024) {
            setMensagem("A foto deve ter no máximo 5 MB.");
            setTipoMensagem("danger");
            event.target.value = "";
            return;
        }

        setMensagem("");
        setTipoMensagem("");
        setFoto(arquivo);
    }

    async function cadastrarProfissional(event) {
        event.preventDefault();
        setMensagem("");
        setTipoMensagem("");

        const formulario = event.currentTarget;
        const campos = new FormData(formulario);
        const senha = campos.get("senha");

        if (senha !== campos.get("confirmarSenha")) {
            setMensagem("As senhas não coincidem.");
            setTipoMensagem("danger");
            return;
        }

        if (senha.length < 8) {
            setMensagem("A senha deve ter pelo menos 8 caracteres.");
            setTipoMensagem("danger");
            return;
        }

        const localizacao = [
            ["CEP", "cep"],
            ["Rua", "rua"],
            ["Número", "numero"],
            ["Complemento", "complemento"],
            ["Bairro", "bairro"],
            ["Cidade", "cidade"],
            ["Estado", "estado"]
        ]
            .filter(([_, campo]) => campos.get(campo))
            .map(([rotulo, campo]) => `${rotulo}: ${campos.get(campo)}`)
            .join(", ");

        const dadosProfissional = {
            nome: campos.get("nome"),
            email: campos.get("email"),
            telefone: campos.get("telefone"),
            senha,
            foto: null,
            localizacao,
            profissao: campos.get("nomeServico"),
            visao_geral: campos.get("descricao"),
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

            setMensagem(
                resultado.mensagem || "Cadastro realizado com sucesso!"
            );
            setTipoMensagem("success");

            formulario.reset();
            setFoto(null);
        } catch (erro) {
            console.error("Erro ao cadastrar profissional:", erro);
            setMensagem(
                erro.message || "Não foi possível conectar ao servidor."
            );
            setTipoMensagem("danger");
        } finally {
            setCarregando(false);
        }
    }

    return (
        <main className="container py-5">
            <div className="mx-auto" style={{ maxWidth: "850px" }}>
                <div className="text-center mb-4">
                    <h1 className="fw-bold">
                        Criar conta de profissional
                    </h1>
                    <p className="text-secondary">
                        Cadastre seus dados e apresente os serviços que você oferece.
                    </p>
                </div>

                <form
                    onSubmit={cadastrarProfissional}
                    className="bg-white border rounded-4 shadow-sm p-4 p-md-5 mt-4"
                >
                    {mensagem && (
                        <div
                            className={`alert alert-${tipoMensagem}`}
                            role="alert"
                        >
                            {mensagem}
                        </div>
                    )}

                    {/* FOTO DE PERFIL */}
                    <section className="mb-4">
                        <h5 className="fw-bold mb-3">Foto de perfil</h5>

                        <div className="d-flex flex-column align-items-center">
                            <div
                                className="rounded-circle border overflow-hidden d-flex align-items-center justify-content-center bg-light mb-3"
                                style={{ width: "120px", height: "120px" }}
                            >
                                {preview ? (
                                    <img
                                        src={preview}
                                        alt="Prévia da foto de perfil"
                                        className="w-100 h-100 object-fit-cover"
                                    />
                                ) : (
                                    <span className="text-secondary">
                                        Sem foto
                                    </span>
                                )}
                            </div>

                            <label
                                htmlFor="foto"
                                className="btn btn-outline-primary"
                            >
                                Escolher foto
                            </label>

                            <input
                                id="foto"
                                type="file"
                                accept="image/*"
                                className="d-none"
                                onChange={selecionarFoto}
                            />

                            <small className="text-secondary mt-2">
                                Imagem de até 5 MB. A foto é opcional.
                            </small>
                        </div>
                    </section>

                    <hr />

                    {/* DADOS PESSOAIS */}
                    <section className="mb-4">
                        <h5 className="fw-bold mb-3">Dados pessoais</h5>

                        <div className="mb-3">
                            <label htmlFor="nome" className="form-label">
                                Nome completo *
                            </label>
                            <input
                                id="nome"
                                name="nome"
                                type="text"
                                className="form-control"
                                maxLength={100}
                                autoComplete="name"
                                placeholder="Digite seu nome completo"
                                required
                            />
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="email" className="form-label">
                                    E-mail *
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    className="form-control"
                                    maxLength={100}
                                    autoComplete="email"
                                    placeholder="seuemail@exemplo.com"
                                    required
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label htmlFor="telefone" className="form-label">
                                    Telefone *
                                </label>
                                <input
                                    id="telefone"
                                    name="telefone"
                                    type="tel"
                                    className="form-control"
                                    maxLength={20}
                                    autoComplete="tel"
                                    placeholder="(11) 99999-9999"
                                    required
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label htmlFor="nascimento" className="form-label">
                                    Data de nascimento *
                                </label>
                                <input
                                    id="nascimento"
                                    name="nascimento"
                                    type="date"
                                    className="form-control"
                                    required
                                />
                            </div>
                        </div>
                    </section>

                    <hr />

                    {/* SERVIÇO */}
                    <section className="mb-4">
                        <h5 className="fw-bold mb-3">Serviço oferecido</h5>

                        <div className="row">
                            <div className="col-md-8 mb-3">
                                <label htmlFor="nomeServico" className="form-label">
                                    Nome do serviço *
                                </label>
                                <input
                                    id="nomeServico"
                                    name="nomeServico"
                                    className="form-control"
                                    placeholder="Ex.: Instalação elétrica"
                                    required
                                />
                            </div>

                            <div className="col-md-4 mb-3">
                                <label htmlFor="categoria" className="form-label">
                                    Categoria *
                                </label>
                                <select
                                    id="categoria"
                                    name="categoria"
                                    className="form-select"
                                    defaultValue=""
                                    required
                                >
                                    <option value="" disabled>
                                        Selecione
                                    </option>
                                    <option value="limpeza">Limpeza</option>
                                    <option value="eletrica">Elétrica</option>
                                    <option value="construcao">Construção</option>
                                    <option value="encanamento">Encanamento</option>
                                    <option value="outros">Outros</option>
                                </select>
                            </div>

                            <div className="col-12 mb-3">
                                <label htmlFor="descricao" className="form-label">
                                    Descrição do serviço *
                                </label>
                                <textarea
                                    id="descricao"
                                    name="descricao"
                                    rows={4}
                                    maxLength={700}
                                    className="form-control"
                                    placeholder="Descreva sua experiência e os serviços oferecidos"
                                    required
                                />
                            </div>

                            <div className="col-md-4 mb-3">
                                <label htmlFor="preco" className="form-label">
                                    Preço inicial (R$) *
                                </label>
                                <input
                                    id="preco"
                                    name="preco"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    className="form-control"
                                    placeholder="0,00"
                                    required
                                />
                            </div>

                            <div className="col-md-4 mb-3">
                                <label htmlFor="modalidade" className="form-label">
                                    Modalidade *
                                </label>
                                <select
                                    id="modalidade"
                                    name="modalidade"
                                    className="form-select"
                                    defaultValue=""
                                    required
                                >
                                    <option value="" disabled>
                                        Selecione
                                    </option>
                                    <option value="Online">Online</option>
                                    <option value="Presencial">Presencial</option>
                                </select>
                            </div>

                            <div className="col-md-4 mb-3">
                                <label
                                    htmlFor="disponibilidade"
                                    className="form-label"
                                >
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

                            <div className="col-12 mb-3">
                                <label
                                    htmlFor="diasPersonalizados"
                                    className="form-label"
                                >
                                    Dias personalizados
                                </label>
                                <input
                                    id="diasPersonalizados"
                                    name="diasPersonalizados"
                                    className="form-control"
                                    placeholder="Ex.: Seg, Qua e Sex"
                                />
                            </div>
                        </div>
                    </section>

                    <hr />

                    {/* ENDEREÇO */}
                    <section className="mb-4">
                        <h5 className="fw-bold mb-2">Endereço</h5>
                        <p className="text-secondary small">
                            Informe a região onde você atende. Os campos serão
                            reunidos na coluna <strong>localizacao</strong>.
                        </p>

                        <div className="row">
                            <div className="col-md-4 mb-3">
                                <label htmlFor="cep" className="form-label">
                                    CEP *
                                </label>
                                <input
                                    id="cep"
                                    name="cep"
                                    className="form-control"
                                    maxLength={9}
                                    placeholder="00000-000"
                                    autoComplete="postal-code"
                                    required
                                />
                            </div>

                            <div className="col-md-8 mb-3">
                                <label htmlFor="rua" className="form-label">
                                    Rua ou avenida *
                                </label>
                                <input
                                    id="rua"
                                    name="rua"
                                    className="form-control"
                                    autoComplete="address-line1"
                                    required
                                />
                            </div>

                            <div className="col-md-4 mb-3">
                                <label htmlFor="numero" className="form-label">
                                    Número *
                                </label>
                                <input
                                    id="numero"
                                    name="numero"
                                    className="form-control"
                                    required
                                />
                            </div>

                            <div className="col-md-8 mb-3">
                                <label htmlFor="complemento" className="form-label">
                                    Complemento
                                </label>
                                <input
                                    id="complemento"
                                    name="complemento"
                                    className="form-control"
                                    placeholder="Apartamento, bloco etc."
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label htmlFor="bairro" className="form-label">
                                    Bairro *
                                </label>
                                <input
                                    id="bairro"
                                    name="bairro"
                                    className="form-control"
                                    required
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label htmlFor="cidade" className="form-label">
                                    Cidade *
                                </label>
                                <input
                                    id="cidade"
                                    name="cidade"
                                    className="form-control"
                                    required
                                />
                            </div>

                            <div className="col-md-4 mb-3">
                                <label htmlFor="estado" className="form-label">
                                    Estado (UF) *
                                </label>
                                <input
                                    id="estado"
                                    name="estado"
                                    className="form-control"
                                    maxLength={2}
                                    placeholder="SP"
                                    required
                                />
                            </div>
                        </div>
                    </section>

                    <hr />

                    {/* SEGURANÇA */}
                    <section className="mb-4">
                        <h5 className="fw-bold mb-3">Segurança</h5>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="senha" className="form-label">
                                    Senha *
                                </label>
                                <input
                                    id="senha"
                                    name="senha"
                                    type="password"
                                    className="form-control"
                                    minLength={8}
                                    autoComplete="new-password"
                                    placeholder="Mínimo de 8 caracteres"
                                    required
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label
                                    htmlFor="confirmarSenha"
                                    className="form-label"
                                >
                                    Confirmar senha *
                                </label>
                                <input
                                    id="confirmarSenha"
                                    name="confirmarSenha"
                                    type="password"
                                    className="form-control"
                                    minLength={8}
                                    autoComplete="new-password"
                                    placeholder="Digite a senha novamente"
                                    required
                                />
                            </div>
                        </div>
                    </section>

                    <button
                        type="submit"
                        className="btn btn-primary w-100 py-3 fw-semibold"
                        disabled={carregando}
                    >
                        {carregando ? "Cadastrando..." : "Criar minha conta"}
                    </button>

                    <p className="text-secondary text-center small mt-3 mb-0">
                        Os campos marcados com * são obrigatórios.
                    </p>
                </form>
            </div>
        </main>
    );
}