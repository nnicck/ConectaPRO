"use client";

import { useState } from "react";

export default function CriarContaCliente() {
    const [fotoPreview, setFotoPreview] = useState(null);
    const [mensagem, setMensagem] = useState("");
    const [tipoMensagem, setTipoMensagem] = useState("");
    const [carregando, setCarregando] = useState(false);

    function selecionarFoto(event) {
        const arquivo = event.target.files?.[0];

        if (!arquivo) {
            setFotoPreview(null);
            return;
        }

        if (!arquivo.type.startsWith("image/") || arquivo.size > 5 * 1024 * 1024) {
            setMensagem(!arquivo.type.startsWith("image/") ? "Selecione um arquivo de imagem válido." : "A foto deve ter no máximo 5 MB.");
            setTipoMensagem("danger");
            event.target.value = "";
            setFotoPreview(null);
            return;
        }

        setMensagem("");
        setFotoPreview(URL.createObjectURL(arquivo));
    }

    async function cadastrarCliente(event) {
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
            ["CEP", "cep"], ["Rua", "rua"], ["Número", "numero"],
            ["Complemento", "complemento"], ["Bairro", "bairro"],
            ["Cidade", "cidade"], ["Estado", "estado"]
        ].filter(([_, campo]) => campos.get(campo))
         .map(([rotulo, campo]) => `${rotulo}: ${campos.get(campo)}`)
         .join(", ");

        const dadosCliente = {
            nome: campos.get("nome"),
            email: campos.get("email"),
            telefone: campos.get("telefone"),
            localizacao,
            senha,
            foto: null
        };

        try {
            setCarregando(true);

            const resposta = await fetch("http://localhost:3001/api/cliente", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dadosCliente)
            });

            const resultado = await resposta.json().catch(() => ({}));

            if (!resposta.ok || resultado.sucesso === false)
                throw new Error(resultado.mensagem || resultado.erro || "Não foi possível cadastrar o cliente.");

            setMensagem(resultado.mensagem || "Cadastro realizado com sucesso!");
            setTipoMensagem("success");
            formulario.reset();
            setFotoPreview(null);
        } catch (erro) {
            console.error("Erro ao cadastrar cliente:", erro);
            setMensagem(erro.message || "Não foi possível conectar ao servidor.");
            setTipoMensagem("danger");
        } finally {
            setCarregando(false);
        }
    }

    return (
        <main className="container py-5">
            <div className="mx-auto" style={{ maxWidth: "850px" }}>
                <div className="text-center mb-4">
                    <h1 className="fw-bold">Criar conta de cliente</h1>
                    <p className="text-secondary">Preencha seus dados para começar a usar o ConectaPro.</p>
                </div>

                <form onSubmit={cadastrarCliente} className="bg-white border rounded-4 shadow-sm p-4 p-md-5 mt-4">
                    {mensagem && <div className={`alert alert-${tipoMensagem}`} role="alert">{mensagem}</div>}

                    {/* FOTO */}
                    <section className="mb-4">
                        <h5 className="fw-bold mb-3">Foto de perfil</h5>
                        <div className="d-flex flex-column align-items-center">
                            <div className="rounded-circle border overflow-hidden d-flex align-items-center justify-content-center bg-light mb-3" style={{ width: "120px", height: "120px" }}>
                                {fotoPreview ? <img src={fotoPreview} alt="Prévia da foto de perfil" className="w-100 h-100" style={{ objectFit: "cover" }} /> : <span className="text-secondary">Sem foto</span>}
                            </div>
                            <label htmlFor="foto" className="btn btn-outline-primary">Escolher foto</label>
                            <input id="foto" name="foto" type="file" accept="image/*" className="d-none" onChange={selecionarFoto} />
                            <small className="text-secondary mt-2">Imagem de até 5 MB. A foto é opcional.</small>
                        </div>
                    </section>

                    <hr />

                    {/* DADOS PESSOAIS */}
                    <section className="mb-4">
                        <h5 className="fw-bold mb-3">Dados pessoais</h5>
                        <div className="mb-3">
                            <label htmlFor="nome" className="form-label">Nome completo *</label>
                            <input id="nome" name="nome" type="text" className="form-control" maxLength={100} placeholder="Digite seu nome completo" autoComplete="name" required />
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="email" className="form-label">E-mail *</label>
                                <input id="email" name="email" type="email" className="form-control" maxLength={100} placeholder="seuemail@exemplo.com" autoComplete="email" required />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="telefone" className="form-label">Telefone *</label>
                                <input id="telefone" name="telefone" type="tel" className="form-control" maxLength={20} placeholder="(11) 99999-9999" autoComplete="tel" required />
                            </div>
                        </div>
                    </section>

                    <hr />

                    {/* LOCALIZAÇÃO */}
                    <section className="mb-4">
                        <h5 className="fw-bold mb-2">Endereço</h5>
                        <p className="text-secondary small">Os campos abaixo serão reunidos na coluna <strong>localizacao</strong> do banco de dados.</p>

                        <div className="row">
                            <div className="col-md-4 mb-3">
                                <label htmlFor="cep" className="form-label">CEP</label>
                                <input id="cep" name="cep" type="text" className="form-control" maxLength={9} placeholder="00000-000" autoComplete="postal-code" />
                            </div>
                            <div className="col-md-8 mb-3">
                                <label htmlFor="rua" className="form-label">Rua ou avenida</label>
                                <input id="rua" name="rua" type="text" className="form-control" maxLength={150} placeholder="Nome da rua" autoComplete="address-line1" />
                            </div>
                            <div className="col-md-4 mb-3">
                                <label htmlFor="numero" className="form-label">Número</label>
                                <input id="numero" name="numero" type="text" className="form-control" maxLength={10} placeholder="Nº" />
                            </div>
                            <div className="col-md-8 mb-3">
                                <label htmlFor="complemento" className="form-label">Complemento</label>
                                <input id="complemento" name="complemento" type="text" className="form-control" maxLength={100} placeholder="Apartamento, bloco etc." />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="bairro" className="form-label">Bairro</label>
                                <input id="bairro" name="bairro" type="text" className="form-control" maxLength={100} placeholder="Seu bairro" />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="cidade" className="form-label">Cidade</label>
                                <input id="cidade" name="cidade" type="text" className="form-control" maxLength={100} placeholder="Sua cidade" />
                            </div>
                            <div className="col-md-4 mb-3">
                                <label htmlFor="estado" className="form-label">Estado (UF)</label>
                                <input id="estado" name="estado" type="text" className="form-control" maxLength={2} placeholder="SP" />
                            </div>
                        </div>
                    </section>

                    <hr />

                    {/* SENHA */}
                    <section className="mb-4">
                        <h5 className="fw-bold mb-3">Segurança</h5>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="senha" className="form-label">Senha *</label>
                                <input id="senha" name="senha" type="password" className="form-control" minLength={8} autoComplete="new-password" placeholder="Mínimo de 8 caracteres" required />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="confirmarSenha" className="form-label">Confirmar senha *</label>
                                <input id="confirmarSenha" name="confirmarSenha" type="password" className="form-control" minLength={8} autoComplete="new-password" placeholder="Digite a senha novamente" required />
                            </div>
                        </div>
                    </section>

                    <button type="submit" className="btn btn-primary w-100 py-3 fw-semibold" disabled={carregando}>
                        {carregando ? "Cadastrando..." : "Criar minha conta"}
                    </button>

                    <p className="text-secondary text-center small mt-3 mb-0">Os campos marcados com * são obrigatórios.</p>
                </form>
            </div>
        </main>
    );
}