export default function EtapasContaProfissonal({}) {
    const etapaAtiva = {
        width: "50px",
        height: "50px",
        backgroundColor: "#2864e8",
    };

    const etapaInativa = {
        width: "50px",
        height: "50px",
        backgroundColor: "#dedede",
    };
    return (
        
    <div className="container d-flex align-items-center justify-content-center h-100">
        <div className="row d-flex align-items-center justify-content-center w-100">
            {/* Dados Pessoais */}
            <div className="col-12 col-md-3 d-flex align-items-center gap-3 mb-3 mb-md-0">
                <div className="rounded-circle flex-shrink-0"style={etapaAtiva}/>
                <span style={{fontSize: "18px",color: "#111"}}>Dados Pessoais</span>
                </div>
      
                  {/* Serviços */}
                  <div className="col-12 col-md-3 d-flex align-items-center gap-3 mb-3 mb-md-0">
                    <div
                      className="rounded-circle flex-shrink-0"
                      style={etapaInativa}
                    />
      
                    <span
                      style={{
                        fontSize: "18px",
                        color: "#111",
                      }}
                    >
                      Serviços
                    </span>
                  </div>
      
                  {/* Endereço */}
                  <div className="col-12 col-md-3 d-flex align-items-center gap-3 mb-3 mb-md-0">
                    <div
                      className="rounded-circle flex-shrink-0"
                      style={etapaInativa}
                    />
      
                    <span
                      style={{
                        fontSize: "18px",
                        color: "#111",
                      }}
                    >
                      Endereço
                    </span>
                  </div>
      
                  {/* Segurança */}
                  <div className="col-12 col-md-3 d-flex align-items-center gap-3">
                    <div
                      className="rounded-circle flex-shrink-0"
                      style={etapaInativa}
                    />
      
                    <span
                      style={{
                        fontSize: "18px",
                        color: "#111",
                      }}
                    >
                      Segurança
                    </span>
                  </div>
      
                </div>
              </div>
    );
}