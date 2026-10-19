export default function InfoPrimaria({profissional}) {
  return (
    <section className="card border-0 shadow-sm p-4">
        <div className="row align-items-center g-3">
          <div className="col-auto">
              <img
                className="fotoP"
                src="https://thumbs.dreamstime.com/b/%C3%ADcone-de-perfil-avatar-padr%C3%A3o-imagem-vetorial-usu%C3%A1rio-m%C3%ADdia-social-209162840.jpg"
                alt="Foto do perfil"
              />
          </div>

        <div className="col">
          <h2>{profissional.nome}</h2>
          <p>{profissional.profissao}</p>

          <div className="row">
            <p className="col-12 col-md-6">
              {profissional.localizacao ?? "Não informado"}
            </p>
            <p className="col-12 col-md-6">
              Membro desde {new Date(profissional.data_ingresso).toLocaleDateString("pt-BR", { timeZone: "UTC"}) ?? "Não informado"}
            </p>
            <p className="col-12 col-md-6">
              Telefone: {profissional.telefone}
            </p>
            <p className="col-12 col-md-6 text-break">
              E-mail: {profissional.email}
            </p>
          </div>

          {/* <p className="mb-0">
            <span className="text-warning">★</span> 4.7 (757)
          </p> */}
        </div>
      </div>
    </section>
  );
}