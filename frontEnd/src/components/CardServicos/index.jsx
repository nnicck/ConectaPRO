export default function CardServicos(){
    return(
        <>
        <div className="container py-4 mt-4">
        <h3 className="text-center fw-bold mb-4">Serviços Disponíveis</h3>
            <div className="col-12 col-md-6 col-lg-3 " style={{ height: "350px" }}>
            <div className="card h-100 rounded-2">
                <div className="card-body">
                <div className="text-center mb-2">
                    <img src="/diarista.png" alt="Diarista" width="64" height="64"/>
                </div>
                <h5 className="card-title">Diarista</h5>
                <p className="text-primary small">Limpeza residencial e comercial</p>
                <p className="small mb-0"> A partir de <span className="text-primary fw-bold ms-1"> R$80,00</span></p>
                </div>
            </div>
            </div>
        </div>
        </>
    )

}