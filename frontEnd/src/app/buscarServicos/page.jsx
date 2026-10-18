"use client";

import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import BarraNavegacao from "@/components/BarraNavegacao";
import Rodape from "@/components/Rodape";
import CardProfissionalBusca from "@/components/CardProfissionalBusca";
import FiltrosProfissionais from "@/components/FiltrosProfissionais";

const profissionais = [
    {
        id: 1,
        nome: "Paula Alice da Silva",
        profissao: "Mestre de Obras",
        foto: "/profissionais/paula.jpg",
        preco: "50,00",
        localizacao: "São Bernardo do Campo, SP",
        experiencia: 8,
        servicosRealizados: 124,
        etiquetas: ["Reformas", "Construção"],
    },
    {
        id: 2,
        nome: "Tomas Edisson",
        profissao: "Eletricista",
        foto: "/profissionais/tomas.jpg",
        preco: "50,00",
        localizacao: "Santo André, SP",
        experiencia: 6,
        servicosRealizados: 89,
        etiquetas: ["Instalações", "Reparos"],
    },
    {
        id: 3,
        nome: "Ana Coralina Rodrigues",
        profissao: "Diarista",
        foto: "/profissionais/ana.jpg",
        preco: "50,00",
        localizacao: "São Caetano do Sul, SP",
        experiencia: 4,
        servicosRealizados: 156,
        etiquetas: ["Limpeza", "Organização"],
    },
];

export default function BuscarProfissionais() {
    const [busca, setBusca] = useState("");
    const [termoSelecionado, setTermoSelecionado] = useState("");

    function buscarProfissionais(event) {
        event.preventDefault();
        setTermoSelecionado(busca.trim());
    }

    function selecionarCategoria(termo) {
        setBusca(termo);
        setTermoSelecionado(termo);
    }

    const resultados = profissionais.filter((profissional) => {
        const termo = termoSelecionado.toLowerCase();

        return (
            profissional.nome.toLowerCase().includes(termo) ||
            profissional.profissao.toLowerCase().includes(termo)
        );
    });

    return (
        <>
        <div className="d-flex flex-column min-vh-100">
            {/* Barra de navegação */}
            <header>
                <BarraNavegacao />
            </header>

            {/* Banner de busca */}
            <section
                className="container-fluid text-white py-4"
                style={{ backgroundColor: "#10182c" }}
            >
                <div className="row align-items-center g-3 px-2 px-md-3">
                    {/* Título */}
                    <div className="col-12 col-lg-4">
                        <h1
                            className="mb-0"
                            style={{
                                fontSize: "25px",
                                fontWeight: 400,
                                lineHeight: 1.35,
                            }}
                        >
                            Encontre o profissional ideal
                            <br className="d-none d-xl-block" /> para o que você precisa.
                        </h1>
                    </div>

                    {/* Campo de busca e sugestões */}
                    <div className="col-12 col-lg-8">
                        <form onSubmit={buscarProfissionais}>
                            <div
                                className="input-group"
                                style={{ minHeight: "52px" }}
                            >
                                <input
                                    type="search"
                                    className="form-control px-3"
                                    placeholder="O que você procura?"
                                    aria-label="Buscar profissionais"
                                    value={busca}
                                    onChange={(event) =>
                                        setBusca(event.target.value)
                                    }
                                    style={{ fontSize: "15px" }}
                                />

                                <button
                                    className="btn btn-primary px-3"
                                    type="submit"
                                    style={{
                                        minWidth: "135px",
                                        fontSize: "18px",
                                        fontWeight: 600,
                                    }}
                                >
                                    Buscar
                                </button>
                            </div>
                        </form>

                        <div className="d-flex flex-wrap gap-3 mt-2">
                            {["Diarista", "Desenvolvedor"].map((termo) => (
                                <button
                                    key={termo}
                                    type="button"
                                    className="btn btn-light rounded-pill px-4 py-1"
                                    onClick={() =>
                                        selecionarCategoria(termo)
                                    }
                                    style={{
                                        minWidth: "160px",
                                        fontSize: "15px",
                                    }}
                                >
                                    {termo}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Filtros e resultados */}
            <main
                className="container-fluid flex-grow-1 py-3 px-3"
                style={{ backgroundColor: "#f7f9fc" }}
            >
                <div className=" d-flex gap-4">
                    {/* Filtros laterais */}
                    <div className="col-12 col-lg-4 col-xl-3">
                        <FiltrosProfissionais />
                    </div>

                    {/* Lista de profissionais */}
                    <CardProfissionalBusca></CardProfissionalBusca>
                    
                </div>
            </main>

            {/* Rodapé */}
            <Rodape />
        </div>
        </>
    );
}