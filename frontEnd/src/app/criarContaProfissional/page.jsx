"use client";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
const API_URL = "http://localhost:3001/api/profissional";
const formInicial = {
    // Dados pessoais
    nome: "",
    email: "",
    telefone: "",
    nascimento: "",
    // Serviço
    nomeServico: "",
    categoria: "",
    descricao: "",
    preco: "",
    modalidade: "",
    disponibilidade: "Seg - Sex",
    diasPersonalizados: "",
    // Endereço
    cep: "",
    estado: "",
    rua: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    // Segurança
    senha: "",
    confirmarSenha: "",
};
export default function CadastroProfissional() {
    const [form, setForm] = useState(formInicial);
    const [foto, setFoto] = useState(null);
    const [preview, setPreview] = useState("");
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState("");
    // Prévia da foto
    useEffect(() => {
        if (!foto) {
            setPreview("");
            return;
        }
        const url = URL.createObjectURL(foto);
        setPreview(url);
        return () => URL.revokeObjectURL(url);
    }, [foto]);
    function alterar(event) {
        const { name, value } = event.target;
        setForm((anterior) => ({ ...anterior, [name]: value }));
    }
    function selecionarFoto(event) {
        const arquivo = event.target.files?.[0];
        if (!arquivo) return;
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
    async function enviar(event) {
        event.preventDefault();
        setErro("");
        setSucesso("");
        if (form.senha !== form.confirmarSenha) {
            setErro("As senhas não coincidem.");
            return;
        }
        // Monta o envio (sem a confirmação de senha)
        const { confirmarSenha, ...dados } = form;
        const corpo = new FormData();
        Object.entries(dados).forEach(([chave, valor]) => corpo.append(chave, valor));
        if (foto) corpo.append("foto", foto);
        setCarregando(true);
        try {
            const resposta = await fetch(API_URL, {
                method: "POST",
                body: corpo,
            });
            const resultado = await resposta.json().catch(() => ({}));
            if (!resposta.ok) {
                throw new Error(
                    resultado.mensagem || "Não foi possível cadastrar o profissional."
                );
            }
            setSucesso("Cadastro realizado com sucesso!");
            setForm(formInicial);
            setFoto(null);
        } catch (error) {
            setErro(error.message || "Erro ao enviar o cadastro. Verifique sua conexão.");
        } finally {
            setCarregando(false);
        }
    }
    return (
        <main className="container py-5">
            <div className="row justify-content-center">
                <div className="col-12 col-lg-8">
                    <h2 className="fw-bold text-center mb-4">Cadastro de profissional</h2>
                    <form onSubmit={enviar}>
                        {/* FOTO */}
                        <div className="d-flex flex-column align-items-center mb-4">
                            <img
                                src={preview || "/avatar.png"}
                                alt="Prévia da foto de perfil"
                                className="rounded-circle border shadow-sm"
                                style={{ width: 150, height: 150, objectFit: "cover" }}
                            />
                            <label htmlFor="foto" className="btn btn-primary mt-3">
                                Escolher imagem
                            </label>
                            <input
                                type="file"
                                id="foto"
                                accept="image/*"
                                className="d-none"
                                onChange={selecionarFoto}
                            />
                            <small className="text-secondary mt-2">Máximo de 5 MB.</small>
                        </div>
                        {/* DADOS PESSOAIS */}
                        <h5 className="fw-semibold mt-4">Dados pessoais</h5>
                        <div className="row g-3 mb-3">
                            <div className="col-12">
                                <label htmlFor="nome" className="form-label">Nome</label>
                                <input id="nome" name="nome" className="form-control" value={form.nome} onChange={alterar} required />
                            </div>
                            <div className="col-12 col-md-6">
                                <label htmlFor="email" className="form-label">E-mail</label>
                                <input type="email" id="email" name="email" className="form-control" value={form.email} onChange={alterar} required />
                            </div>
                            <div className="col-12 col-md-6">
                                <label htmlFor="telefone" className="form-label">Telefone</label>
                                <input type="tel" id="telefone" name="telefone" className="form-control" placeholder="(11) 99999-9999" value={form.telefone} onChange={alterar} required />
                            </div>
                            <div className="col-12 col-md-6">
                                <label htmlFor="nascimento" className="form-label">Data de nascimento</label>
                                <input type="date" id="nascimento" name="nascimento" className="form-control" value={form.nascimento} onChange={alterar} required />
                            </div>
                        </div>
                        {/* SERVIÇO */}
                        <h5 className="fw-semibold mt-4">Serviço oferecido</h5>
                        <div className="row g-3 mb-3">
                            <div className="col-12 col-md-8">
                                <label htmlFor="nomeServico" className="form-label">Nome do serviço</label>
                                <input id="nomeServico" name="nomeServico" className="form-control" value={form.nomeServico} onChange={alterar} required />
                            </div>
                            <div className="col-12 col-md-4">
                                <label htmlFor="categoria" className="form-label">Categoria</label>
                                <select id="categoria" name="categoria" className="form-select" value={form.categoria} onChange={alterar} required>
                                    <option value="" disabled>Selecione</option>
                                    <option value="limpeza">Limpeza</option>
                                    <option value="eletrica">Elétrica</option>
                                    <option value="construcao">Construção</option>
                                    <option value="encanamento">Encanamento</option>
                                    <option value="outros">Outros</option>
                                </select>
                            </div>
                            <div className="col-12">
                                <label htmlFor="descricao" className="form-label">Descrição do serviço</label>
                                <textarea id="descricao" name="descricao" rows="4" className="form-control" value={form.descricao} onChange={alterar} required />
                            </div>
                            <div className="col-12 col-md-4">
                                <label htmlFor="preco" className="form-label">Preço inicial (R$)</label>
                                <input type="number" id="preco" name="preco" min="0" step="0.01" className="form-control" value={form.preco} onChange={alterar} required />
                            </div>
                            <div className="col-12 col-md-4">
                                <label htmlFor="modalidade" className="form-label">Como você atende?</label>
                                <select id="modalidade" name="modalidade" className="form-select" value={form.modalidade} onChange={alterar} required>
                                    <option value="" disabled>Selecione</option>
                                    <option value="Online">Online</option>
                                    <option value="Presencial">Presencial</option>
                                </select>
                            </div>
                            <div className="col-12 col-md-4">
                                <label htmlFor="disponibilidade" className="form-label">Disponibilidade</label>
                                <select id="disponibilidade" name="disponibilidade" className="form-select" value={form.disponibilidade} onChange={alterar}>
                                    <option value="Seg - Sex">Seg - Sex</option>
                                    <option value="Personalizar">Personalizar</option>
                                </select>
                            </div>
                            {form.disponibilidade === "Personalizar" && (
                                <div className="col-12">
                                    <input name="diasPersonalizados" className="form-control" placeholder="Ex.: Seg, Qua e Sex" value={form.diasPersonalizados} onChange={alterar} />
                                </div>
                            )}
                        </div>
                        {/* ENDEREÇO */}
                        <h5 className="fw-semibold mt-4">Onde você atende</h5>
                        <div className="row g-3 mb-3">
                            <div className="col-12 col-md-6">
                                <label htmlFor="cep" className="form-label">CEP</label>
                                <input id="cep" name="cep" className="form-control" placeholder="01000-000" maxLength={9} value={form.cep} onChange={alterar} required />
                            </div>
                            <div className="col-12 col-md-6">
                                <label htmlFor="estado" className="form-label">Estado</label>
                                <input id="estado" name="estado" className="form-control" placeholder="SP" maxLength={2} value={form.estado} onChange={alterar} required />
                            </div>
                            <div className="col-12 col-md-8">
                                <label htmlFor="rua" className="form-label">Rua ou avenida</label>
                                <input id="rua" name="rua" className="form-control" value={form.rua} onChange={alterar} required />
                            </div>
                            <div className="col-12 col-md-4">
                                <label htmlFor="numero" className="form-label">Número</label>
                                <input id="numero" name="numero" className="form-control" value={form.numero} onChange={alterar} required />
                            </div>
                            <div className="col-12">
                                <label htmlFor="complemento" className="form-label">Complemento</label>
                                <input id="complemento" name="complemento" className="form-control" placeholder="Opcional" value={form.complemento} onChange={alterar} />
                            </div>
                            <div className="col-12 col-md-6">
                                <label htmlFor="bairro" className="form-label">Bairro</label>
                                <input id="bairro" name="bairro" className="form-control" value={form.bairro} onChange={alterar} required />
                            </div>
                            <div className="col-12 col-md-6">
                                <label htmlFor="cidade" className="form-label">Cidade</label>
                                <input id="cidade" name="cidade" className="form-control" value={form.cidade} onChange={alterar} required />
                            </div>
                        </div>
                        {/* SEGURANÇA */}
                        <h5 className="fw-semibold mt-4">Segurança</h5>
                        <div className="row g-3 mb-3">
                            <div className="col-12 col-md-6">
                                <label htmlFor="senha" className="form-label">Nova senha</label>
                                <input type="password" id="senha" name="senha" className="form-control" autoComplete="new-password" value={form.senha} onChange={alterar} required />
                            </div>
                            <div className="col-12 col-md-6">
                                <label htmlFor="confirmarSenha" className="form-label">Confirmar senha</label>
                                <input type="password" id="confirmarSenha" name="confirmarSenha" className="form-control" autoComplete="new-password" value={form.confirmarSenha} onChange={alterar} required />
                            </div>
                        </div>
                        {erro && <div className="alert alert-danger mt-4" role="alert">{erro}</div>}
                        {sucesso && <div className="alert alert-success mt-4" role="alert">{sucesso}</div>}
                        <div className="d-flex justify-content-end mt-4">
                            <button type="submit" className="btn btn-primary btn-lg px-5" disabled={carregando}>
                                {carregando ? "Enviando..." : "Cadastrar"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}