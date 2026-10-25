export default function Avaliacoes() {
  return (
    <section id="aval">
      <h3 className="mb-3">Avaliações</h3>

      <article className="cardAval">
        <div className="d-flex flex-column flex-sm-row gap-3">
          <img
            className="foto"
            src="https://thumbs.dreamstime.com/b/%C3%ADcone-de-perfil-avatar-padr%C3%A3o-imagem-vetorial-usu%C3%A1rio-m%C3%ADdia-social-209162840.jpg"
            alt="Foto de Pedrinho do Grau"
          />

          <div className="flex-grow-1">
            <div className="d-flex flex-column flex-sm-row justify-content-between gap-2 mb-3">
              <p className="fw-bold mb-0">
                Pedrinho do Grau
              </p>

              <time>06/09/2026</time>
            </div>

            <p className="comity mb-0">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Possimus perferendis earum repellat quibusdam esse facere
              aliquam minima facilis! Quis ex accusantium beatae
              perspiciatis sapiente rem culpa cum dolores blanditiis ipsa?
            </p>
          </div>
        </div>
      </article>

      <div className="avalGeral mt-3"></div>
    </section>
  );
}