export default function Servicos() {
  return (
    <section id="servico">
      <h3 className="mb-3">Serviços Oferecidos</h3>

      <div className="row g-3">
        <div className="col-12 col-sm-6 col-lg-4">
          <div className="card h-100">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCbtju-IsYR6EJzMXOW5Tbsz1L1GjVXwwVI7oh7a3QwQ&s=10"
              className="card-img-top imagem-servico"
              alt="Serviço oferecido"
            />

            <div className="card-body">
              <h5 className="card-title">
                Reboco de parede para comer
              </h5>

              <a href="#" className="btn btn-primary">
                Ver serviço
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}