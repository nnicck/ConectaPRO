"use client";

import Link from "next/link";
import ImagemServico from "@/components/ui/ImagemServico";
import { Carregando } from "@/components/ui/Mensagem";
import { formatarPreco } from "@/lib/formatar";

// Grade de resultados da página "Buscar serviços".
//   servicos   -> lista vinda de GET /api/servico/busca
//   carregando -> mostra "Buscando serviços..."
//   msgErro    -> mostra o erro no lugar da lista
export default function CardProfissionalBusca({ servicos = [], carregando = false, msgErro = "" }) {
    if (msgErro) {
        return <p className="text-danger py-4">{msgErro}</p>;
    }

    if (carregando) {
        return <Carregando texto="Buscando serviços..." />;
    }

    if (servicos.length === 0) {
        return (
            <p className="texto-suave py-4">
                Nenhum serviço encontrado. Tente outro termo ou remova alguns filtros.
            </p>
        );
    }

    return (
        <section className="py-2">
            <div className="row g-3">
                {servicos.map((servico) => (
                    <div className="col-12 col-sm-6 col-xl-4" key={servico.id_servico}>
                        <div className="card-cp card-cp-hover h-100 overflow-hidden d-flex flex-column">
                            <ImagemServico src={servico.imagem} categoria={servico.categoria} alt={servico.titulo} altura={130} />

                            <div className="d-flex flex-column flex-grow-1 p-3">
                                <h6 className="fw-bold mb-1">{servico.titulo}</h6>

                                <Link href={`/perfilProfissional/${servico.id_profissional}`} className="text-muted small mb-2">
                                    {servico.profissional_nome} · {servico.profissional_profissao}
                                </Link>

                                {servico.descricao && (
                                    <p className="small mb-2 texto-2-linhas">{servico.descricao}</p>
                                )}

                                {servico.profissional_localizacao && (
                                    <p className="text-secondary small mb-2">
                                        <i className="bi bi-geo-alt me-1"></i>{servico.profissional_localizacao}
                                    </p>
                                )}

                                <p className="small mb-3">
                                    A partir de <strong className="text-primary">{formatarPreco(servico.preco)}</strong>
                                </p>

                                <Link href={`/servico/${servico.id_servico}`} className="btn btn-primary btn-sm mt-auto">
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
