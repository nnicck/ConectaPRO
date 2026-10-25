"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";

import BarraNavegacao from "@/components/BarraNavegacao";
import Rodape from "@/components/Rodape";
import CardProfissionalBusca from "@/components/CardProfissionalBusca";
import FiltrosProfissionais, { FAIXAS_PRECO } from "@/components/FiltrosProfissionais";

const API = "http://localhost:3001/api";

function BuscarProfissionais() {
    // Filtros que vieram na URL, ex.: /buscarServicos?termo=Diarista&categoria=Design&localizacao=Santo André&faixa=ate50
    const parametros = useSearchParams();

    // texto digitado no campo x termo efetivamente usado na busca (só muda ao enviar o formulário)
    const [busca, setBusca] = useState(() => parametros.get("termo") ?? "");
    const [termoSelecionado, setTermoSelecionado] = useState(() => parametros.get("termo") ?? "");

    const [categorias, setCategorias] = useState([]);
    const [categoriasSelecionadas, setCategoriasSelecionadas] = useState(() => parametros.getAll("categoria"));
    const [localizacao, setLocalizacao] = useState(() => parametros.get("localizacao") ?? "");
    const [faixasSelecionadas, setFaixasSelecionadas] = useState(() =>
        parametros.getAll("faixa").filter((id) => FAIXAS_PRECO.some((faixa) => faixa.id === id))
    );

    const [servicos, setServicos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [msgErro, setMsgErro] = useState("");

    // Categorias dos filtros vêm do banco, para sempre refletirem os serviços cadastrados
    useEffect(() => {
        fetch(`${API}/servico/categorias`)
            .then((resposta) => {
                if (!resposta.ok) {
                    throw new Error("Não foi possível carregar as categorias.");
                }

                return resposta.json();
            })
            .then((resultado) => setCategorias(resultado.dados))
            .catch(() => setCategorias([]));
    }, []);

    // Refaz a busca sempre que o termo ou algum filtro muda
    useEffect(() => {
        const controle = new AbortController();
        const params = new URLSearchParams();

        if (termoSelecionado) {
            params.set("termo", termoSelecionado);
        }

        categoriasSelecionadas.forEach((categoria) => {
            params.append("categoria", categoria);
        });

        if (localizacao.trim()) {
            params.set("localizacao", localizacao.trim());
        }

        FAIXAS_PRECO.filter((faixa) => faixasSelecionadas.includes(faixa.id)).forEach((faixa) => {
            params.append("faixa", `${faixa.min}-${faixa.max ?? ""}`);
        });

        // pequena espera para não disparar uma requisição a cada letra da localização
        const espera = setTimeout(async () => {
            try {
                setCarregando(true);

                const resposta = await fetch(`${API}/servico/busca?${params}`, {
                    signal: controle.signal,
                });
                const resultado = await resposta.json();

                if (!resposta.ok) {
                    throw new Error(resultado.erro || "Não foi possível buscar os serviços.");
                }

                setServicos(resultado.dados);
                setMsgErro("");
            } catch (erro) {
                if (erro.name === "AbortError") {
                    return;
                }

                setServicos([]);
                setMsgErro(
                    erro instanceof TypeError
                        ? "Não foi possível conectar ao servidor. Tente novamente mais tarde."
                        : erro.message
                );
            } finally {
                if (!controle.signal.aborted) {
                    setCarregando(false);
                }
            }
        }, 300);

        return () => {
            clearTimeout(espera);
            controle.abort();
        };
    }, [termoSelecionado, categoriasSelecionadas, localizacao, faixasSelecionadas]);

    function buscarProfissionais(event) {
        event.preventDefault();
        setTermoSelecionado(busca.trim());
    }

    function selecionarCategoria(termo) {
        setBusca(termo);
        setTermoSelecionado(termo);
    }

    function alternarItem(lista, setLista, item) {
        setLista(
            lista.includes(item)
                ? lista.filter((atual) => atual !== item)
                : [...lista, item]
        );
    }

    return (
        <>
        <div className="d-flex flex-column min-vh-100">

            {/* Banner de busca */}
            <section
                className="container-fluid text-white p-5"
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
                        <FiltrosProfissionais
                            categorias={categorias}
                            categoriasSelecionadas={categoriasSelecionadas}
                            aoAlternarCategoria={(categoria) =>
                                alternarItem(categoriasSelecionadas, setCategoriasSelecionadas, categoria)
                            }
                            aoLimparCategorias={() => setCategoriasSelecionadas([])}
                            localizacao={localizacao}
                            aoMudarLocalizacao={setLocalizacao}
                            faixasSelecionadas={faixasSelecionadas}
                            aoAlternarFaixa={(faixa) =>
                                alternarItem(faixasSelecionadas, setFaixasSelecionadas, faixa)
                            }
                        />
                    </div>

                    {/* Lista de serviços */}
                    <CardProfissionalBusca
                        servicos={servicos}
                        carregando={carregando}
                        msgErro={msgErro}
                    />
                </div>
            </main>
        </div>
        </>
    );
}

// useSearchParams precisa estar dentro de um <Suspense> para o "next build" funcionar
export default function PaginaBuscarServicos() {
    return (
        <Suspense fallback={<p className="container mt-4">Carregando...</p>}>
            <BuscarProfissionais />
        </Suspense>
    );
}
