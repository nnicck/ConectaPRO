"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";

const IMAGEM_PADRAO = "/diarista.png";

function formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function formatarNota(nota) {
    return nota.toFixed(1).replace(".", ",");
}

function trocarPorImagemPadrao(event) {
    // evita loop caso a própria imagem padrão também falhe
    event.currentTarget.onerror = null;
    event.currentTarget.src = IMAGEM_PADRAO;
}

export default function CardProfissionalBusca({ servicos = [], carregando = false, msgErro = "" }) {
    if (msgErro) {
        return (
            <section className="container py-4">
                <p className="text-danger">{msgErro}</p>
            </section>
        );
    }

    if (carregando) {
        return (
            <section className="container py-4">
                <p className="text-muted">Buscando serviços...</p>
            </section>
        );
    }

    if (servicos.length === 0) {
        return (
            <section className="container py-4">
                <p className="text-muted">
                    Nenhum serviço encontrado. Tente outro termo ou remova alguns filtros.
                </p>
            </section>
        );
    }

    return (
        <section className="container py-4">
            <div className="row g-3">
                {servicos.map((servico) => (
                    <div className="col-6 col-md-4 col-lg-3" key={servico.id_servico}>
                        <div className="card h-100 shadow-sm">

                            <img
                                src={servico.imagem || IMAGEM_PADRAO}
                                onError={trocarPorImagemPadrao}
                                className="card-img-top"
                                alt={servico.titulo}
                                style={{
                                    height: "130px",
                                    objectFit: "cover"
                                }}
                            />

                            <div className="card-body d-flex flex-column p-3">

                                <h6 className="card-title fw-bold mb-1">
                                    {servico.titulo}
                                </h6>

                                <p className="text-muted small mb-2">
                                    {servico.profissional_nome} · {servico.profissional_profissao}
                                </p>

                                {servico.descricao && (
                                    <p
                                        className="card-text small mb-2"
                                        style={{
                                            display: "-webkit-box",
                                            WebkitLineClamp: 3,
                                            WebkitBoxOrient: "vertical",
                                            overflow: "hidden"
                                        }}
                                    >
                                        {servico.descricao}
                                    </p>
                                )}

                                <p className="small mb-2">
                                    {servico.total_avaliacoes > 0 ? (
                                        <>
                                            <strong>{formatarNota(servico.media_estrelas)}</strong> / 5
                                            <span className="text-muted">
                                                {" "} ({servico.total_avaliacoes}{" "}
                                                {servico.total_avaliacoes === 1 ? "avaliação" : "avaliações"})
                                            </span>
                                        </>
                                    ) : (
                                        <span className="text-muted">Sem avaliações</span>
                                    )}
                                </p>

                                {servico.profissional_localizacao && (
                                    <p className="text-secondary small mb-2">
                                        {servico.profissional_localizacao}
                                    </p>
                                )}

                                <p className="fw-semibold small mb-3">
                                    A partir de {formatarPreco(servico.preco)}
                                </p>

                                <Link
                                    href={`/perfilProfissional/${servico.id_profissional}`}
                                    className="btn btn-primary btn-sm mt-auto"
                                >
                                    Saiba mais
                                </Link>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
