"use client";
import Link from "next/link";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import EtapasContaCliente from "@/components/EtapaContaCliente";
import BarraNavegacao from "@/components/BarraNavegacao";
import Rodape from "@/components/Rodape";
import BotoesNavegacao from "@/components/BotoesNavegacao";

export default function CadastroCliente() {
    return (
        <>
        <div className="d-flex flex-column min-vh-100">
            <main className="container flex-grow-1 py-5 mt-4">
              <div className="d-flex justify-content-center mb-5">
                  <EtapasContaCliente etapaAtiva={1}/>
              </div>

              {/* FOTO E FORMULÁRIO */}
              <div className="row justify-content-center align-items-center g-5" style={{ marginTop: "50px" }}>

                    {/* FOTO DE PERFIL */}
                    <div className="col-12 col-md-4 col-lg-3">
                        <div className="d-flex flex-column align-items-center">

                            <p className="text-center fw-semibold">
                                Foto de perfil
                            </p>

                            <img
                                id="selectedAvatar"
                                src="https://mdbootstrap.com/img/Photos/Others/placeholder-avatar.jpg"
                                className="rounded-circle"
                                style={{
                                    width: 200,
                                    height: 200,
                                    objectFit: "cover"
                                }}
                                alt="Foto de perfil"
                            />

                            <div className="mt-3">
                                <label
                                    htmlFor="customFile2"
                                    className="btn btn-primary"
                                >
                                    Escolher arquivo
                                </label>

                                <input
                                    type="file"
                                    className="d-none"
                                    id="customFile2"
                                    accept="image/*"
                                />
                            </div>

                        </div>
                    </div>

                    {/* FORMULÁRIO */}
                    <div className="col-12 col-md-7 col-lg-6">
                        <form>

                            {/* NOME */}
                            <div className="mb-4">
                                <label htmlFor="nome" className="form-label">
                                    Nome
                                </label>

                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    id="nome"
                                    placeholder="Digite seu nome"
                                    required
                                />
                            </div>

                            {/* E-MAIL */}
                            <div className="mb-4">
                                <label htmlFor="email" className="form-label">
                                    E-mail
                                </label>

                                <input
                                    type="email"
                                    className="form-control form-control-lg"
                                    id="email"
                                    placeholder="Digite seu e-mail"
                                    required
                                />
                            </div>

                            {/* TELEFONE E DATA DE NASCIMENTO */}
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
                                        placeholder="(11) 99999-9999"
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
                                        required
                                    />
                                </div>

                            </div>

                            {/* BOTÃO */}
                            
                            <BotoesNavegacao
                            voltar="/"
                            proximo="/criarContaCliente/enderecoCli"
                            />
                        </form>
                    </div>

                </div>
            </main>
        </div>
        </>
    );
}