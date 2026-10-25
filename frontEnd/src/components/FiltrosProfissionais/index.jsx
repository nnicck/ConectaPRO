"use client";

import "bootstrap/dist/css/bootstrap.min.css";

export default function FiltrosProfissionais() {
    const categorias = [
        "Todos os serviços",
        "Diarista",
        "Eletricista",
        "Encanador",
        "Pintor",
        "Desenvolvedor",
    ];

    const faixas = [
        "Até R$50",
        "R$50 a R$100",
        "Acima de R$100",
    ];

    return (
        <aside
            className="h-100 p-3 text-white"
            style={{
                backgroundColor: "#10182c",
                borderRadius: "8px",
            }}
        >
            <h2 className="mb-3" style={{ fontSize: "26px" }}>
                Categoria
            </h2>

            <div className="d-flex flex-column gap-2 mb-4">
                {categorias.map((categoria, index) => (
                    <div
                        className="form-check d-flex align-items-center gap-2"
                        key={categoria}
                    >
                        <input
                            className="form-check-input mt-0"
                            type="checkbox"
                            id={`categoria-${index}`}
                            style={{
                                width: "23px",
                                height: "23px",
                                flexShrink: 0,
                            }}
                        />

                        <label
                            className="form-check-label"
                            htmlFor={`categoria-${index}`}
                            style={{ fontSize: "16px" }}
                        >
                            {categoria}
                        </label>
                    </div>
                ))}
            </div>

            <h2 className="mb-2" style={{ fontSize: "26px" }}>
                Localização
            </h2>

            <input
                type="text"
                className="form-control mb-4"
                aria-label="Localização"
                placeholder="Cidade ou bairro"
                style={{
                    height: "42px",
                    fontSize: "14px",
                }}
            />

            <h2 className="mb-3" style={{ fontSize: "26px" }}>
                Faixa de preço
            </h2>

            <div className="d-flex flex-column gap-2">
                {faixas.map((faixa, index) => (
                    <div
                        className="form-check d-flex align-items-center gap-2"
                        key={faixa}
                    >
                        <input
                            className="form-check-input mt-0"
                            type="checkbox"
                            id={`preco-${index}`}
                            style={{
                                width: "23px",
                                height: "23px",
                                flexShrink: 0,
                            }}
                        />

                        <label
                            className="form-check-label"
                            htmlFor={`preco-${index}`}
                            style={{ fontSize: "16px" }}
                        >
                            {faixa}
                        </label>
                    </div>
                ))}
            </div>
        </aside>
    );
}