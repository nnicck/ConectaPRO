import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import BarraNavegacao from "@/components/BarraNavegacao";
import CardServicos from "@/components/CardServicos";
import Rodape from "@/components/Rodape";
import CardProfissional from "@/components/CardProfissionais";


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

export default function Home() {
  return (
    <>
    <main style={{backgroundColor: "#F8FAFC"}}>

    <BarraNavegacao></BarraNavegacao>

    {/* banner */}
    <div className="container-fluid" 
    style={{ height: "650px", backgroundImage: ` linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)), 
    url('/bgBanner.png')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat"}}>

      <div className="container py-5">
        <div className="row align-items-center mt-4">
          <div className="col-xl-7 mt-5">
            <h1 className="display-5 fw-bold text-dark mb-4 text-white">Encontre o profissional ideal 
            para o que você precisa.</h1>
            <p className="fs-5" style={{color: "white"}}>
              Conectamos você a diaristas, eletricistas, pedreiros e diversos 
              autônomos verificados, com praticidade e segurança.
            </p>
              <form className="d-flex gap-3 mt-4">
                <div className="input-group w-100">

                <input
                  type="text"
                  className="form-control border-0 rounded-1 py-3 shadow"
                  placeholder="O que você precisa?"
                />

                <button
                  type="submit"
                  className="btn btn-primary fw-bold px-4 rounded-1 ms-3 shadow"
                >
                  Buscar
                </button>
              </div>
              
            </form>
          </div>
        </div>
      </div>

    </div>

    <div className="container py-4 mt-4" >
    <h3 className="text-center fw-bold mb-4">
        Serviços Disponíveis
    </h3>

    <div className="row g-3">

        {servicos.map((servico) => (
            <div
                className="col-12 col-sm-6 col-lg-3"
                key={servico.titulo}
            >
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

  </div>

{/* Profissionais em destaque */}
<section className="py-5" style={{ backgroundColor: "#F8FAFC" }}>
    <div className="container">
        <div className="text-center mb-5">
            <span className="text-primary fw-semibold small">
                CONHEÇA NOSSOS PROFISSIONAIS
            </span>
            <h2 className="fw-bold mt-2">Profissionais em destaque</h2>
            <p className="text-secondary mb-0">
                Conheça profissionais de diferentes áreas de atuação.
            </p>
        </div>
       
        <CardProfissional />
    
        
    </div>
</section>

  {/* COMO FUNCIONA */}
  <section className="py-5" style={{ backgroundColor: "#FFFFFF" }}>
    <div className="container py-3">
      <div className="text-center mb-5">
        <span className="text-primary fw-semibold">SIMPLES E PRÁTICO</span>
        <h2 className="fw-bold mt-2">Como funciona o ConectaPro?</h2>
        <p className="text-secondary">
          Contratar um profissional pode ser mais fácil do que você imagina.
        </p>
      </div>

      <div className="row g-4 text-center">
        <div className="col-12 col-md-4">
          <div className="p-4 h-100">
            <div
              className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
              style={{
                width: "75px",
                height: "75px",
                backgroundColor: "#E8F0FE",
                color: "#2864e8",
              }}
            >
              <i className="bi bi-search fs-2"></i>
            </div>

            <h5 className="fw-bold">1. Encontre um serviço</h5>
            <p className="text-secondary">
              Pesquise a categoria do serviço que você precisa.
            </p>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="p-4 h-100">
            <div
              className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
              style={{
                width: "75px",
                height: "75px",
                backgroundColor: "#E8F0FE",
                color: "#2864e8",
              }}
            >
              <i className="bi bi-person-lines-fill fs-2"></i>
            </div>

            <h5 className="fw-bold">2. Escolha o profissional</h5>
            <p className="text-secondary">
              Conheça as opções disponíveis para o serviço desejado.
            </p>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="p-4 h-100">
            <div
              className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
              style={{
                width: "75px",
                height: "75px",
                backgroundColor: "#E8F0FE",
                color: "#2864e8",
              }}
            >
              <i className="bi bi-chat-dots fs-2"></i>
            </div>

            <h5 className="fw-bold">3. Entre em contato</h5>
            <p className="text-secondary">
              Combine os detalhes do serviço diretamente com o profissional.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* POR QUE ESCOLHER O CONECTAPRO */}
<section className="py-5" style={{ backgroundColor: "#FFFFFF" }}>
  <div className="container py-4">

    <div className="row align-items-center g-5">

      {/* Texto principal */}
      <div className="col-12 col-lg-5">
        <span className="text-primary fw-semibold small">
          SUA BUSCA, MAIS SIMPLES
        </span>

        <h2
          className="fw-bold mt-2 mb-3"
          style={{ color: "#17356F" }}
        >
          Encontre o profissional ideal sem complicação.
        </h2>

        <p className="text-secondary mb-4">
          O ConectaPro conecta você a profissionais de diferentes
          áreas, facilitando a busca por serviços para sua casa
          ou seu negócio.
        </p>

        <Link
          href="/profissionais"
          className="btn btn-primary px-4 py-3 fw-semibold"
          style={{
            backgroundColor: "#2864E8",
            borderColor: "#2864E8",
          }}
        >
          Encontrar profissionais
          <i className="bi bi-arrow-right ms-2"></i>
        </Link>
      </div>

      {/* Diferenciais sem cards */}
      <div className="col-12 col-lg-7">

        <div className="d-flex align-items-start gap-3 pb-4 mb-4 border-bottom">
          <i
            className="bi bi-grid fs-2 flex-shrink-0"
            style={{ color: "#2864E8" }}
          ></i>

          <div>
            <h5 className="fw-bold mb-2">
              Diversas categorias de serviços
            </h5>
            <p className="text-secondary mb-0">
              Encontre diaristas, eletricistas, encanadores,
              pintores e outros profissionais em um só lugar.
            </p>
          </div>
        </div>

        <div className="d-flex align-items-start gap-3 pb-4 mb-4 border-bottom">
          <i
            className="bi bi-person-check fs-2 flex-shrink-0"
            style={{ color: "#2864E8" }}
          ></i>

          <div>
            <h5 className="fw-bold mb-2">
              Conheça os profissionais
            </h5>
            <p className="text-secondary mb-0">
              Consulte os perfis, conheça os serviços oferecidos
              e encontre uma opção adequada à sua necessidade.
            </p>
          </div>
        </div>

        <div className="d-flex align-items-start gap-3 pb-4 mb-4 border-bottom">
          <i
            className="bi bi-geo-alt fs-2 flex-shrink-0"
            style={{ color: "#2864E8" }}
          ></i>

          <div>
            <h5 className="fw-bold mb-2">
              Opções para sua região
            </h5>
            <p className="text-secondary mb-0">
              Facilite sua busca por profissionais que atendam
              na localização desejada.
            </p>
          </div>
        </div>

        <div className="d-flex align-items-start gap-3">
          <i
            className="bi bi-chat-dots fs-2 flex-shrink-0"
            style={{ color: "#2864E8" }}
          ></i>

          <div>
            <h5 className="fw-bold mb-2">
              Mais praticidade para contratar
            </h5>
            <p className="text-secondary mb-0">
              Entre em contato com o profissional para conversar
              sobre o serviço e combinar os detalhes.
            </p>
          </div>
        </div>

      </div>
    </div>
  </div>
</section>

  <Rodape></Rodape>
  </main>
    </>
  );
}
