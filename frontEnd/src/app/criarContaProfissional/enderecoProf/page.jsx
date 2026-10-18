"use client";
import Link from "next/link";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import EtapasContaProfissonal from "@/components/EtapasContaProfissional";
import BarraNavegacao from "@/components/BarraNavegacao";
import Rodape from "@/components/Rodape";
import BotoesNavegacao from "@/components/BotoesNavegacao";

export default function LocalizacaoProfissional() {

    return (
        <>
        <div className="d-flex flex-column min-vh-100">
            <main className="container py-5 flex-grow-1">
                <div className="row justify-content-center mt-4">
                    <div className="col-12 col-lg-8">

                        <EtapasContaProfissonal etapaAtiva={3}/>

                        <div className="mt-4 mb-4">
                            <h2 className="fw-bold">
                                Onde você atende?
                            </h2>
                        </div>

                        <form>
                            <div className="row g-3">

                                <div className="col-12 col-md-6">
                                    <label htmlFor="cep" className="form-label">
                                        CEP
                                    </label>

                                    <input
                                        type="text"
                                        id="cep"
                                        name="cep"
                                        className="form-control"
                                        placeholder="Ex.: 01000-000"
                                        maxLength={9}
                                        required
                                    />
                                </div>

                                <div className="col-12 col-md-6">
                                    <label htmlFor="estado" className="form-label">
                                        Estado
                                    </label>

                                    <input
                                        type="text"
                                        id="estado"
                                        name="estado"
                                        className="form-control"
                                        placeholder="Ex.: SP"
                                        maxLength={2}
                                        required
                                    />
                                </div>

                                <div className="col-12 col-md-8">
                                    <label htmlFor="rua" className="form-label">
                                        Rua ou avenida
                                    </label>

                                    <input
                                        type="text"
                                        id="rua"
                                        name="rua"
                                        className="form-control"
                                        placeholder="Nome da rua ou avenida"
                                        required
                                    />
                                </div>

                                <div className="col-12 col-md-4">
                                    <label htmlFor="numero" className="form-label">
                                        Número
                                    </label>

                                    <input
                                        type="text"
                                        id="numero"
                                        name="numero"
                                        className="form-control"
                                        placeholder="Nº"
                                        required
                                    />
                                </div>

                                <div className="col-12">
                                    <label htmlFor="complemento" className="form-label">
                                        Complemento
                                    </label>

                                    <input
                                        type="text"
                                        id="complemento"
                                        name="complemento"
                                        className="form-control"
                                        placeholder="Apartamento, bloco, casa etc. (opcional)"
                                    />
                                </div>

                                <div className="col-12 col-md-6">
                                    <label htmlFor="bairro" className="form-label">
                                        Bairro
                                    </label>

                                    <input
                                        type="text"
                                        id="bairro"
                                        name="bairro"
                                        className="form-control"
                                        placeholder="Seu bairro"
                                        required
                                    />
                                </div>

                                <div className="col-12 col-md-6">
                                    <label htmlFor="cidade" className="form-label">
                                        Cidade
                                    </label>

                                    <input
                                        type="text"
                                        id="cidade"
                                        name="cidade"
                                        className="form-control"
                                        placeholder="Sua cidade"
                                        required
                                    />
                                </div>

                            </div>

                            <BotoesNavegacao
                            voltar="/criarContaProfissional/servicosProf"
                            proximo="/criarContaProfissional/segurancaProf"
                            />
                           
                        </form>

                    </div>
                </div>
            </main>
        </div>
        </>
    );
}