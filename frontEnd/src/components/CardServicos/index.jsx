// Card de categoria usado na seção "Serviços Disponíveis" da home.

import Link from "next/link";

// Card de categoria da home. quantidade = null enquanto carrega.
export default function CardServicos({
    imgCardServico,
    titleCardServico,
    descCardServico,
    quantidade,
    precoCardServico,
    linkCardServico = "/buscarServicos"
}) {
    return (
        <div className="card-cp card-cp-hover h-100 w-100 p-3 d-flex flex-column">
            <div className="mb-3">
                <img src={imgCardServico} alt="" width="52" height="52" />
            </div>

            <h4 className="h6 fw-bold mb-1">{titleCardServico}</h4>
            <p className="text-primary small mb-3">{descCardServico}</p>

            <p className="small texto-suave mb-1">
                <i className="bi bi-tools me-1"></i>
                {quantidade === null ? "..." : `${quantidade} ${quantidade === 1 ? "serviço cadastrado" : "serviços cadastrados"}`}
            </p>

            <p className="small mb-3">
                {precoCardServico ? (
                    <>A partir de <span className="text-primary fw-bold">{precoCardServico}</span></>
                ) : (
                    <span className="texto-suave">{quantidade === 0 ? "Em breve" : " "}</span>
                )}
            </p>

            <Link href={linkCardServico} className="btn btn-primary w-100 mt-auto">
                Ver profissionais
            </Link>
        </div>
    );
}
