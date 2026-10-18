"use client";

import Link from "next/link";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import EtapasContaCliente from "@/components/EtapaContaCliente";
import BarraNavegacao from "@/components/BarraNavegacao";
import Rodape from "@/components/Rodape";
import BotoesNavegacao from "@/components/BotoesNavegacao";

export default function EnderecoCliente() {
return (
    <>
    <div className="d-flex flex-column min-vh-100">
    <header>
    <BarraNavegacao/>
    </header>
        <main className="container flex-grow-1 py-4 mt-4">
            {/* ETAPAS DO CADASTRO */}
            <div className="d-flex justify-content-center mb-4">
                <EtapasContaCliente etapaAtiva={2} />
            </div>

            {/* FORMULÁRIO DE ENDEREÇO */}
            <div className="row justify-content-center"  style={{ marginTop: "70px" }}>
                <div className="col-12 col-lg-10 col-xl-9">
                    <h2 className="text-center mb-4">
                        Localização
                    </h2>

                    <form>
                        <div className="row g-3">

                            {/* CEP */}
                            <div className="col-12 col-md-4">
                                <label htmlFor="cep" className="form-label">
                                    CEP
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="cep"
                                    placeholder="00000-000"
                                    required
                                />
                            </div>

                            {/* RUA */}
                            <div className="col-12 col-md-5">
                                <label htmlFor="rua" className="form-label">
                                    Rua
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="rua"
                                    placeholder="Digite sua rua"
                                    required
                                />
                            </div>

                            {/* NÚMERO */}
                            <div className="col-12 col-md-3">
                                <label htmlFor="numero" className="form-label">
                                    Número
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="numero"
                                    placeholder="Nº"
                                    required
                                />
                            </div>

                            {/* COMPLEMENTO */}
                            <div className="col-12 col-md-4">
                                <label htmlFor="complemento" className="form-label">
                                    Complemento (opcional)
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="complemento"
                                    placeholder="Apto, bloco..."
                                />
                            </div>

                            {/* BAIRRO */}
                            <div className="col-12 col-md-4">
                                <label htmlFor="bairro" className="form-label">
                                    Bairro
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="bairro"
                                    placeholder="Digite seu bairro"
                                    required
                                />
                            </div>

                            {/* CIDADE */}
                            <div className="col-12 col-md-4">
                                <label htmlFor="cidade" className="form-label">
                                    Cidade
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="cidade"
                                    placeholder="Digite sua cidade"
                                    required
                                />
                            </div>

                            {/* ESTADO */}
                            <div className="col-12 col-md-4">
                                <label htmlFor="estado" className="form-label">
                                    Estado
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="estado"
                                    placeholder="Ex.: SP"
                                    maxLength={2}
                                    required
                                />
                            </div>
                        </div>

                        <BotoesNavegacao
                        voltar="/criarContaCliente/dadosPessoaisCli"
                        proximo="/criarContaCliente/segurancaCli"
                        />
                    </form>
                </div>
            </div>
        </main>

        <Rodape />
    </div>
    </>
);

}