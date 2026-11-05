import Link from "next/link";
import ImagemServico from "@/components/ui/ImagemServico";
import { formatarPreco } from "@/lib/formatar";

// Grade de serviços do profissional.
//   resumido = true  -> card só com foto e título (aba "Visão geral")
//   resumido = false -> card completo com preço e botão (aba "Serviços")
export default function Servicos({ listaServicos, resumido = false }) {
    if (listaServicos.length === 0) {
        return <p className="texto-suave">Este profissional ainda não cadastrou serviços.</p>;
    }

    return (
        <div className="row g-3">
            {listaServicos.map((servico) => (
                <div className="col-12 col-sm-6 col-lg-3" key={servico.id_servico}>
                    <Link href={`/servico/${servico.id_servico}`}
                        className="card-cp card-cp-hover d-flex flex-column h-100 overflow-hidden text-decoration-none text-dark">
                        <ImagemServico src={servico.imagem} categoria={servico.categoria} alt={servico.titulo} altura={resumido ? 140 : 150} />

                        <div className="p-3 d-flex flex-column flex-grow-1">
                            <h3 className="h6 fw-bold mb-1">{servico.titulo}</h3>

                            {resumido && (
                                <span className="small texto-suave mt-auto">
                                    A partir de <strong className="text-dark">{formatarPreco(servico.preco)}</strong>
                                </span>
                            )}

                            {!resumido && (
                                <>
                                    <span className="small texto-suave mb-2">{servico.categoria} · {servico.tempo_prestacao || "A combinar"}</span>
                                    <p className="small texto-suave texto-2-linhas mb-3">{servico.descricao || "Sem descrição."}</p>
                                    <div className="mt-auto d-flex justify-content-between align-items-center">
                                        <strong>{formatarPreco(servico.preco)}</strong>
                                        <span className="btn btn-primary btn-sm">Ver serviço</span>
                                    </div>
                                </>
                            )}
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
}
