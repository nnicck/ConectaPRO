export default function Servicos({ listaServicos }) {
  return (
    <section id="servico">
      <h3 className="mb-3">Serviços Oferecidos</h3>
      <div className="row g-3">
        {listaServicos.length > 0 ? listaServicos.map((servico) => (
          <div className="col-12 col-sm-6 col-lg-4" key={servico.id_servico}>
            <div className="card h-100">
              <div className="card-body d-flex flex-column">
                <span className="badge text-bg-primary align-self-start mb-2">{servico.categoria}</span>
                <h5 className="card-title">{servico.titulo}</h5>
                <p className="text-muted mb-2">{servico.tipo_servico}</p>
                <p className="card-text">{servico.descricao}</p>
                <p><strong>Tempo:</strong> {servico.tempo_prestacao || "A combinar"}</p>
                <h5 className="mt-auto mb-3">{Number(servico.preco).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</h5>
                <a href={`/servico/${servico.id_servico}`} className="btn btn-primary">Ver serviço</a>
              </div>
            </div>
          </div>
        )) : <p>Este profissional ainda não cadastrou serviços.</p>}
      </div>
    </section>
  );
}