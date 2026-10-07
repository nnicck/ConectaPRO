import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function CadastroProfissional() {
  return (
    <div className="min-vh-100 bg-dark py-4">
      <div className="container">
        <div className="text-secondary small mb-2">
          Qual conta criar? (Profissional)
        </div>

        <div className="bg-light min-vh-100">
          {/* Cabeçalho */}
          <div className="p-4">
            <button
              type="button"
              className="btn btn-link text-dark text-decoration-none fs-1 p-0 lh-1"
            >
              ←
            </button>
          </div>

          {/* Etapas */}
          <div className="container px-5">
            <div className="row align-items-center justify-content-between mb-4">
              <div className="col-6 col-md-3 d-flex align-items-center gap-2 mb-3 mb-md-0">
                <div
                  className="rounded-circle bg-secondary flex-shrink-0"
                  style={{ width: "30px", height: "30px" }}
                ></div>
                <span className="small">Dados Pessoais</span>
              </div>

              <div className="col-6 col-md-3 d-flex align-items-center gap-2 mb-3 mb-md-0">
                <div
                  className="rounded-circle bg-secondary-subtle flex-shrink-0"
                  style={{ width: "30px", height: "30px" }}
                ></div>
                <span className="small">Serviços</span>
              </div>

              <div className="col-6 col-md-3 d-flex align-items-center gap-2">
                <div
                  className="rounded-circle bg-secondary-subtle flex-shrink-0"
                  style={{ width: "30px", height: "30px" }}
                ></div>
                <span className="small">Endereço</span>
              </div>

              <div className="col-6 col-md-3 d-flex align-items-center gap-2">
                <div
                  className="rounded-circle bg-secondary-subtle flex-shrink-0"
                  style={{ width: "30px", height: "30px" }}
                ></div>
                <span className="small">Segurança</span>
              </div>
            </div>

            {/* Conteúdo */}
            <h4 className="fw-normal mb-3">Dados Pessoais</h4>

            <div className="row g-4">
              {/* Foto */}
              <div className="col-12 col-md-4">
                <div className="text-center text-md-start">
                  <label className="form-label small">
                    Foto de perfil
                  </label>

                  <div
                    className="bg-secondary rounded-circle mx-auto mx-md-0"
                    style={{
                      width: "88px",
                      height: "88px",
                    }}
                  ></div>
                </div>
              </div>

              {/* Formulário */}
              <div className="col-12 col-md-8">
                <form>
                  {/* Nome */}
                  <div className="mb-3">
                    <label className="form-label small mb-1">
                      Nome completo
                    </label>

                    <input
                      type="text"
                      className="form-control border-primary"
                    />
                  </div>

                  {/* Email */}
                  <div className="mb-3">
                    <label className="form-label small mb-1">
                      E-mail
                    </label>

                    <input
                      type="email"
                      className="form-control"
                    />
                  </div>

                  {/* Telefone + Data */}
                  <div className="row g-4">
                    <div className="col-12 col-md-6">
                      <label className="form-label small mb-1">
                        Telefone
                      </label>

                      <input
                        type="tel"
                        className="form-control"
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="form-label small mb-1">
                        Data de Nascimento
                      </label>

                      <input
                        type="date"
                        className="form-control"
                      />
                    </div>
                  </div>

                  {/* Botão */}
                  <div className="d-grid mt-5">
                    <button
                      type="button"
                      className="btn btn-secondary py-2"
                    >
                      Continuar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
