export default function BeneficioProfissional({ icone, titulo, descricao }) {
    return (
      <div className="col-12 col-md-6">
        <div className="d-flex align-items-start gap-3">
          <div
            className="bg-white rounded-3 p-2 d-flex align-items-center justify-content-center"
            style={{ minWidth: "44px", minHeight: "44px" }}
          >
            <i
              className={`bi ${icone} fs-4`}
              style={{ color: "#2864e8" }}
            ></i>
          </div>
  
          <div>
            <h5 className="fw-bold mb-1">{titulo}</h5>
            <p className="mb-0">{descricao}</p>
          </div>
        </div>
      </div>
    );
  }