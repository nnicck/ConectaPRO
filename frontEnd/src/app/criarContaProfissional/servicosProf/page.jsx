"use client";
import Link from "next/link";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import EtapasContaProfissonal from "@/components/EtapasContaProfissional";
import BarraNavegacao from "@/components/BarraNavegacao";
import Rodape from "@/components/Rodape";
import BotoesNavegacao from "@/components/BotoesNavegacao";

export default function ServicosProfissional() {
    const [modalidade, setModalidade] = useState("");
    const [disponibilidade, setDisponibilidade] = useState("Seg - Sex");

    return (
        <div className="d-flex flex-column min-vh-100">
            <main className="container flex-grow-1 py-4 py-md-5">
                <div className="d-flex justify-content-center mb-5">
                    <EtapasContaProfissonal etapaAtiva={2}/>
                </div>

                <h2 className="text-center mb-4">
                    Serviços oferecidos
                </h2>

                <form>
                    <div className="row g-4">
                        <div className="col-12 col-md-8">
                            <label htmlFor="nomeServico" className="form-label">
                                Nome do serviço
                            </label>
                            <input
                                type="text"
                                id="nomeServico"
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

                        <div className="col-12 col-md-8">
                            <label htmlFor="descricao" className="form-label">
                                Descrição do serviço
                            </label>
                            <textarea
                                id="descricao"
                                className="form-control"
                                rows="5"
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
                                className="form-control"
                                min="0"
                                step="0.01"
                                required
                            />
                        </div>
                    </div>

                    <div className="row g-4 mt-4 align-items-end">
                        <div className="col-12 col-md-5">
                            <label className="form-label d-block">
                                Como você atende?
                            </label>

                            <div className="d-flex flex-wrap gap-2">
                                {["Online", "Presencial"].map((opcao) => (
                                    <button
                                        key={opcao}
                                        type="button"
                                        onClick={() => setModalidade(opcao)}
                                        className={`btn rounded-pill px-4 ${
                                            modalidade === opcao
                                                ? "btn-primary"
                                                : "btn-outline-secondary"
                                        }`}
                                    >
                                        {opcao}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="col-12 col-md-7">
                            <label className="form-label d-block">
                                Disponibilidade
                            </label>

                            <div className="d-flex flex-wrap gap-2 align-items-center">
                                {["Seg - Sex", "Personalizar"].map((opcao) => (
                                    <button
                                        key={opcao}
                                        type="button"
                                        onClick={() => setDisponibilidade(opcao)}
                                        className={`btn rounded-pill px-3 ${
                                            disponibilidade === opcao
                                                ? "btn-primary"
                                                : "btn-outline-secondary"
                                        }`}
                                    >
                                        {opcao}
                                    </button>
                                ))}

                                {disponibilidade === "Personalizar" && (
                                    <input
                                        type="text"
                                        className="form-control"
                                        style={{ maxWidth: "180px" }}
                                        placeholder="Ex.: Seg, Qua e Sex"
                                        aria-label="Dias disponíveis"
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    
                    <BotoesNavegacao
                    voltar="/criarContaProfissional/dadosPessoais"
                    proximo="/criarContaProfissional/enderecoProf"
                    />
                    
                </form>
            </main>
        </div>
    );
}