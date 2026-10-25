import CardServicos from "@/components/CardServicos";

const servicos = [
  {
    img: "/diarista.png",
    titulo: "Diarista",
    descricao: "Limpeza residencial e comercial",
    lugar: " Paulo - SP",
    menorDescricao: "Serviço residencial e comercial",
    preco: "R$ 80,00"
  },

  {
    img: "/eletricista.png",
    titulo: "Eletricista",
    descricao: "Instalações e reparos elétricos",
    lugar: "Santo André - SP",
    menorDescricao: "Serviços elétricos residenciais",
    preco: "R$ 100,00"
  },

  {
    img: "/encanador.png",
    titulo: "Encanador",
    descricao: "Instalações e reparos hidráulicos",
    lugar: "São Caetano - SP",
    menorDescricao: "Serviços hidráulicos residenciais",
    preco: "R$ 120,00"
  },
  {
    img: "/pintor.png",
    titulo: "Pintor",
    descricao: "Pintura residencial e comercial",
    lugar: "São Paulo - SP",
    menorDescricao: "Pintura de paredes e ambientes",
    preco: "R$ 130,00"
  }
];

export default function ServicosHome(){
    return (
        <section className="container py-4 mt-4">
            <h3 className="text-center fw-bold mb-4">Serviços Disponíveis</h3>
            <div className="row g-3">
                {servicos.map((servico) => (
                    <div className="col-12 col-sm-6 col-lg-3" key={servico.titulo}>
                    <CardServicos
                        imgCardServico={servico.img}
                        titleCardServico={servico.titulo}
                        descCardServico={servico.descricao}
                        lugarCardServico={servico.lugar}
                        menorDescCardServico={servico.menorDescricao}
                        precoCardServico={servico.preco}
                    />
                    </div>
                ))}
            </div>
        </section>
    );
}