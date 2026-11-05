"use client";

// Painel de filtros da página "Buscar serviços": categoria, localização e faixa de preço.

// max: null = sem limite superior. O id é o que a página guarda como selecionado.
export const FAIXAS_PRECO = [
    { id: "ate50", rotulo: "Até R$50", min: 0, max: 50 },
    { id: "50a100", rotulo: "R$50,01 a R$100", min: 50.01, max: 100 },
    { id: "acima100", rotulo: "Acima de R$100", min: 100.01, max: null },
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
        width: "18px",
        height: "18px",
        flexShrink: 0,
    };

    return (
        <aside
            className="p-4 text-white position-sticky"
            style={{
                backgroundColor: "#0F172A",
                borderRadius: "16px",
                top: 90,
            }}
        >
            <h2 className="mb-3 text-uppercase fw-bold text-white-50" style={{ fontSize: "0.8rem", letterSpacing: "0.06em" }}>
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
                        style={{ fontSize: "0.92rem" }}
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
                            style={{ fontSize: "0.92rem" }}
                        >
                            {categoria}
                        </label>
                    </div>
                ))}
            </div>

            <h2 className="mb-2 text-uppercase fw-bold text-white-50" style={{ fontSize: "0.8rem", letterSpacing: "0.06em" }}>
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

            <h2 className="mb-3 text-uppercase fw-bold text-white-50" style={{ fontSize: "0.8rem", letterSpacing: "0.06em" }}>
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
                            style={{ fontSize: "0.92rem" }}
                        >
                            {faixa.rotulo}
                        </label>
                    </div>
                ))}
            </div>
        </aside>
    );
}
