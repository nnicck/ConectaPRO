export default function Avaliacoes({ listaAvaliacoes = [] }) {
  return (
    <section id="aval">
      <h3 className="mb-3">Avaliações</h3>

      {listaAvaliacoes.length === 0 ? (
        <p>Este profissional ainda não possui avaliações.</p>
      ) : (
        listaAvaliacoes.map((avaliacao) => (
          <article className="cardAval mb-3" key={avaliacao.id_avaliacao}>
            <div className="d-flex flex-column flex-sm-row gap-3">
              <div className="flex-grow-1">
                <div className="d-flex flex-column flex-sm-row justify-content-between gap-2 mb-3">
                  <p className="fw-bold mb-0">{avaliacao.titulo}</p>
                  <time>
                    {new Date(avaliacao.data_avaliacao).toLocaleDateString("pt-BR", { timeZone: "UTC" })}
                  </time>
                </div>

                <p className="mb-2">{"★".repeat(Math.round(avaliacao.estrelas))} ({avaliacao.estrelas}/5)</p>
                <p className="comity mb-0">{avaliacao.comentario || "Sem comentário."}</p>
              </div>
            </div>
          </article>
        ))
      )}

      <div className="avalGeral mt-3"></div>
    </section>
  );
}