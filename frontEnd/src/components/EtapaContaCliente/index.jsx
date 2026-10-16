export default function EtapasContaCliente({ etapaAtiva = 1 }) {
    const etapas = [
        { id: 1, nome: "Dados Pessoais" },
        { id: 2, nome: "Endereço" },
        { id: 3, nome: "Segurança" },
    ];

    return (
        <div className="w-100 d-flex justify-content-center">
            <div className="row justify-content-around align-items-center w-100">
                {etapas.map((etapa) => (
                    <div
                        key={etapa.id}
                        className="col-6 col-lg-auto d-flex align-items-center justify-content-center gap-2"
                    >
                        <div
                            className="rounded-circle flex-shrink-0"
                            style={{
                                width: "45px",
                                height: "45px",
                                backgroundColor:
                                    etapa.id === etapaAtiva
                                        ? "#2864e8"
                                        : "#dedede",
                            }}
                        />

                        <span
                            className="text-nowrap"
                            style={{ fontSize: "16px", color: "#111" }}
                        >
                            {etapa.nome}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}