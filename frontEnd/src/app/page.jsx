import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import BarraNavegacao from "@/components/BarraNavegacao";
import CardServicos from "@/components/CardServicos";
import Rodape from "@/components/Rodape";
import CardProfissional from "@/components/CardProfissionais";
import BeneficioProfissional from "@/components/BeneficioProf";

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

    <BarraNavegacao botaoUm="Cadastre-se" botaoDois="Cadastre-se como profissional" botaoTres="Entrar"></BarraNavegacao>

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

  {/* CONVITE PARA PROFISSIONAIS */}
  <section className="container py-5">
      <div
        className="p-4 p-md-5 rounded-4 shadow-sm"
        style={{
          backgroundColor: "#2864e8",
          color: "#FFFFFF",
        }}
      >
        <div className="row align-items-center g-4">
          {/* Conteúdo */}
          <div className="col-12 col-lg-8">
            <span className="badge bg-white mb-3 text-primary px-3 py-2">
              PARA PROFISSIONAIS
            </span>

            <h2 className="fw-bold mb-3">
              Divulgue seus serviços com o ConectaPro!
            </h2>

            <p className="fs-5 mb-4">
              Mostre seu talento, conquiste novos clientes e amplie suas
              oportunidades de trabalho.
            </p>

            {/* Benefícios reutilizáveis */}
            <div className="row g-4">
              <BeneficioProfissional
                icone="bi-megaphone"
                titulo="Mais visibilidade"
                descricao="Apresente seus serviços para novos clientes."
              />

              <BeneficioProfissional
                icone="bi-people"
                titulo="Novas oportunidades"
                descricao="Conecte-se com pessoas que procuram seu trabalho."
              />

              <BeneficioProfissional
                icone="bi-person-badge"
                titulo="Perfil profissional"
                descricao="Destaque suas habilidades e experiência."
              />

              <BeneficioProfissional
                icone="bi-geo-alt"
                titulo="Alcance local"
                descricao="Facilite o contato com clientes da sua região."
              />
            </div>
          </div>

          {/* Card de cadastro */}
          <div className="col-12 col-lg-4">
            <div className="card border-0 rounded-4 shadow-sm text-center p-4">
              <div className="card-body">
                <i
                  className="bi bi-briefcase-fill fs-1"
                  style={{ color: "#2864e8" }}
                ></i>

                <h4 className="card-title fw-bold mt-3">
                  Pronto para começar?
                </h4>

                <p className="card-text text-secondary my-3">
                  Crie seu perfil e dê o próximo passo para divulgar
                  seu trabalho.
                </p>

                <Link
                  href="/criarContaProfissional"
                  className="btn btn-primary btn-lg w-100 fw-semibold"
                  style={{ backgroundColor: "#2864e8", borderColor: "#2864e8" }}
                >
                  Cadastrar como profissional
                  <i className="bi bi-arrow-right ms-2"></i>
                </Link>

                <p className="small text-secondary mt-3 mb-0">
                  <i className="bi bi-check-circle me-1"></i>
                  Apresente seus serviços no ConectaPro
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
