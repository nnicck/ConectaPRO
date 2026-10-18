export default function ComoFuncionaHome() {
    return (
        <section className="py-5 bg-white">
            <div className="container py-3">
                <div className="text-center mb-5">
                    <span className="text-primary fw-semibold">SIMPLES E PRÁTICO</span>
                    <h2 className="fw-bold mt-2">Como funciona o ConectaPro?</h2>
                    <p className="text-secondary">Contratar um profissional pode ser mais fácil do que você imagina.</p>
                </div>
                <div className="row g-4 text-center">
                    {[
                    ["lupa.png", "Encontre um serviço", "Pesquise a categoria do serviço que você precisa."],
                    ["usuario_check.png", "Escolha o profissional", "Conheça as opções disponíveis para o serviço desejado."],
                    ["comentario.png", "Entre em contato", "Combine os detalhes do serviço diretamente com o profissional."]
                    ].map(([img, titulo, descricao], i) => (
                    <div className="col-12 col-md-4" key={titulo}>
                        <div className="p-4 h-100">
                        <div className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: "75px", height: "75px", backgroundColor: "#E8F0FE" }}>
                            <img src={img} alt="" width="40" height="40" />
                        </div>
                        <h5 className="fw-bold">{i + 1}. {titulo}</h5>
                        <p className="text-secondary">{descricao}</p>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </section>
    );
}