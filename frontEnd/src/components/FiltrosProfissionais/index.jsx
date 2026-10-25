"use client";

import "bootstrap/dist/css/bootstrap.min.css";

// max: null = sem limite superior. O id é o que a página guarda como selecionado.
export const FAIXAS_PRECO = [
    { id: "ate50", rotulo: "Até R$50", min: 0, max: 50 },
    { id: "50a100", rotulo: "R$50 a R$100", min: 50, max: 100 },
    { id: "acima100", rotulo: "Acima de R$100", min: 100, max: null },
];

export default function FiltrosProfissionais({
    categorias = [],
    categoriasSelecionadas = [],
    aoAlternarCategoria,
    aoLimparCategorias,
    localizacao = "",
    aoMudarLocalizacao,
    faixasSelecionadas = [],
    aoAlternarFaixa,
}) {
    const estiloCheckbox = {
        width: "23px",
        height: "23px",
        flexShrink: 0,
    };

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
                {/* "Todos" fica marcado quando nenhuma categoria específica está selecionada */}
                <div className="form-check d-flex align-items-center gap-2">
                    <input
                        className="form-check-input mt-0"
                        type="checkbox"
                        id="categoria-todos"
                        checked={categoriasSelecionadas.length === 0}
                        onChange={aoLimparCategorias}
                        style={estiloCheckbox}
                    />

                    <label
                        className="form-check-label"
                        htmlFor="categoria-todos"
                        style={{ fontSize: "16px" }}
                    >
                        Todos os serviços
                    </label>
                </div>

                {categorias.map((categoria, index) => (
                    <div
                        className="form-check d-flex align-items-center gap-2"
                        key={categoria}
                    >
                        <input
                            className="form-check-input mt-0"
                            type="checkbox"
                            id={`categoria-${index}`}
                            checked={categoriasSelecionadas.includes(categoria)}
                            onChange={() => aoAlternarCategoria(categoria)}
                            style={estiloCheckbox}
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
                value={localizacao}
                onChange={(event) => aoMudarLocalizacao(event.target.value)}
                style={{
                    height: "42px",
                    fontSize: "14px",
                }}
            />

            <h2 className="mb-3" style={{ fontSize: "26px" }}>
                Faixa de preço
            </h2>

            <div className="d-flex flex-column gap-2">
                {FAIXAS_PRECO.map((faixa) => (
                    <div
                        className="form-check d-flex align-items-center gap-2"
                        key={faixa.id}
                    >
                        <input
                            className="form-check-input mt-0"
                            type="checkbox"
                            id={`preco-${faixa.id}`}
                            checked={faixasSelecionadas.includes(faixa.id)}
                            onChange={() => aoAlternarFaixa(faixa.id)}
                            style={estiloCheckbox}
                        />

                        <label
                            className="form-check-label"
                            htmlFor={`preco-${faixa.id}`}
                            style={{ fontSize: "16px" }}
                        >
                            {faixa.rotulo}
                        </label>
                    </div>
                ))}
            </div>
        </aside>
    );
}
