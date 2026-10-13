export default function EtapasContaProfissonal() {
    return (
        <div className="w-100 d-flex justify-content-center">
            <div className="row justify-content-around align-items-center g-6 w-100">

                {/* Dados Pessoais */}
                <div className="col-6 col-lg-auto d-flex align-items-center justify-content-center gap-2">
                    <div
                        className="rounded-circle"
                        style={{
                            width: "45px",
                            height: "45px",
                            backgroundColor: "#2864e8",
                        }}
                    />

                    <span className="text-nowrap" style={{ fontSize: "16px", color: "#111" }}>
                        Dados Pessoais
                    </span>
                </div>

                {/* Serviços */}
                <div className="col-6 col-lg-auto d-flex align-items-center justify-content-center gap-2">
                    <div
                        className="rounded-circle"
                        style={{
                            width: "45px",
                            height: "45px",
                            backgroundColor: "#dedede",
                        }}
                    />

                    <span className="text-nowrap" style={{ fontSize: "16px", color: "#111" }}>
                        Serviços
                    </span>
                </div>

                {/* Endereço */}
                <div className="col-6 col-lg-auto d-flex align-items-center justify-content-center gap-2">
                    <div
                        className="rounded-circle"
                        style={{
                            width: "45px",
                            height: "45px",
                            backgroundColor: "#dedede",
                        }}
                    />

                    <span className="text-nowrap" style={{ fontSize: "16px", color: "#111" }}>
                        Endereço
                    </span>
                </div>

                {/* Segurança */}
                <div className="col-6 col-lg-auto d-flex align-items-center justify-content-center gap-2">
                    <div
                        className="rounded-circle"
                        style={{
                            width: "45px",
                            height: "45px",
                            backgroundColor: "#dedede",
                        }}
                    />

                    <span className="text-nowrap" style={{ fontSize: "16px", color: "#111" }}>
                        Segurança
                    </span>
                </div>

            </div>
        </div>
    );
}