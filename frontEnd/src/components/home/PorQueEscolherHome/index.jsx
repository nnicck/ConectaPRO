import Link from "next/link";

export default function PorQueEscolherHome() {
    return (
        <section className="py-5 bg-white">
            <div className="container py-4">
                <div className="row align-items-center g-5">
                    <div className="col-12 col-lg-5">
                        <span className="text-primary fw-semibold small">SUA BUSCA, MAIS SIMPLES</span>
                        <h2 className="fw-bold mt-2 mb-3" style={{ color: "#17356F" }}>Encontre o profissional ideal sem complicação.</h2>
                        <p className="text-secondary mb-4">O ConectaPro conecta você a profissionais de diferentes áreas, facilitando a busca por serviços para sua casa ou seu negócio.</p>
                        <Link href="/profissionais" className="btn btn-primary px-4 py-3 fw-semibold" style={{ backgroundColor: "#2864E8", borderColor: "#2864E8" }}>Encontrar profissionais <i className="bi bi-arrow-right ms-2"></i></Link>
                    </div>
                    <div className="col-12 col-lg-7">
                        {[
                            ["bi-grid", "Diversas categorias de serviços", "Encontre diaristas, eletricistas, encanadores, pintores e outros profissionais em um só lugar."],
                            ["bi-person-check", "Conheça os profissionais", "Consulte os perfis, conheça os serviços oferecidos e encontre uma opção adequada à sua necessidade."],
                            ["bi-geo-alt", "Opções para sua região", "Facilite sua busca por profissionais que atendam na localização desejada."],
                            ["bi-chat-dots", "Mais praticidade para contratar", "Entre em contato com o profissional para conversar sobre o serviço e combinar os detalhes."]
                        ].map(([icone, titulo, descricao], i) => (
                            <div key={titulo} className={`d-flex align-items-start gap-3 ${i < 3 ? "pb-4 mb-4 border-bottom" : ""}`}>
                            <i className={`bi ${icone} fs-2 flex-shrink-0`} style={{ color: "#2864E8" }}></i>
                            <div>
                                <h5 className="fw-bold mb-2">{titulo}</h5>
                                <p className="text-secondary mb-0">{descricao}</p>
                            </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}