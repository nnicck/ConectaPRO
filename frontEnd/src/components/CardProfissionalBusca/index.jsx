import "bootstrap/dist/css/bootstrap.min.css";

export default function CardProfissionalBusca() {
    return (
        <section className="container py-4">
            <div className="row g-3">

                {/* Card 1 */}
                <div className="col-6 col-md-4 col-lg-3">
                    <div className="card h-100 shadow-sm">

                        <img
                            src="/diarista.png"
                            className="card-img-top"
                            alt="Serviço de diarista"
                            style={{
                                height: "130px",
                                objectFit: "cover"
                            }}
                        />

                        <div className="card-body d-flex flex-column p-3">

                            <h6 className="card-title fw-bold mb-1">
                                Maria Silva
                            </h6>

                            <p className="text-muted small mb-2">
                                Diarista
                            </p>

                            <p className="card-text small mb-2">
                                Limpeza residencial com qualidade e confiança.
                            </p>

                            <p className="small mb-2">
                                <strong>4,9</strong> / 5
                                <span className="text-muted">
                                    {" "} (32 avaliações)
                                </span>
                            </p>

                            <p className="fw-semibold small mb-3">
                                A partir de R$ 120,00
                            </p>

                            <a
                                href="/perfil-profissional"
                                className="btn btn-primary btn-sm mt-auto"
                            >
                                Saiba mais
                            </a>

                        </div>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="col-6 col-md-4 col-lg-3">
                    <div className="card h-100 shadow-sm">

                        <img
                            src="/diarista.png"
                            className="card-img-top"
                            alt="Serviço de limpeza residencial"
                            style={{
                                height: "130px",
                                objectFit: "cover"
                            }}
                        />

                        <div className="card-body d-flex flex-column p-3">

                            <h6 className="card-title fw-bold mb-1">
                                Ana Souza
                            </h6>

                            <p className="text-muted small mb-2">
                                Limpeza residencial
                            </p>

                            <p className="card-text small mb-2">
                                Limpeza de casas e apartamentos com atenção aos detalhes.
                            </p>

                            <p className="small mb-2">
                                <strong>4,8</strong> / 5
                                <span className="text-muted">
                                    {" "} (25 avaliações)
                                </span>
                            </p>

                            <p className="fw-semibold small mb-3">
                                A partir de R$ 100,00
                            </p>

                            <a
                                href="/perfil-profissional"
                                className="btn btn-primary btn-sm mt-auto"
                            >
                                Saiba mais
                            </a>

                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}