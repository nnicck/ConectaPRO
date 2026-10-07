export default function CardServicos({
    imgCardServico,
    titleCardServico,
    descCardServico,
    lugarCardServico,
    menorDescCardServico,
    precoCardServico
}) {
    return (
        <div className="card h-100 rounded-2 w-75">

            <div className="card-body d-flex flex-column">

                <div className="text-center mb-2">
                    <img
                        src={imgCardServico}
                        alt={titleCardServico}
                        width="64"
                        height="64"
                    />
                </div>

                <h5 className="card-title">
                    {titleCardServico}
                </h5>

                <p className="text-primary small">
                    {descCardServico}
                </p>

                <p className="small mb-1">
                    <strong>{lugarCardServico}</strong>
                </p>

                <p className="small mb-1">
                    Disponível hoje
                </p>

                <p className="small mb-2">
                    {menorDescCardServico}
                </p>

                <p className="small mb-3">
                    A partir{" "}
                    <span className="text-primary fw-bold ms-1">
                        {precoCardServico}
                    </span>
                </p>

                <button className="btn btn-primary w-100 mt-auto">
                    Ver profissionais
                </button>

            </div>

        </div>
    );
}