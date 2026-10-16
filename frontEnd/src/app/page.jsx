import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import BarraNavegacao from "@/components/BarraNavegacao";
import CardServicos from "@/components/CardServicos";
import Rodape from "@/components/Rodape";

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

  <section className="container py-5">
    <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4 gap-3">
      <div>
        <span className="text-primary fw-semibold">CONHEÇA OS PROFISSIONAIS</span>
        <h2 className="fw-bold mt-2">Profissionais em destaque</h2>
        <p className="text-secondary mb-0">
          Encontre profissionais para ajudar no seu dia a dia.
        </p>
      </div>

      <Link
        href="/servicos"
        className="btn btn-outline-primary"
      >
        Ver todos os serviços
      </Link>
    </div>

    <div className="row g-4">
      {[
        {
          nome: "Ana Oliveira",
          profissao: "Diarista",
          local: "Santo André - SP",
          img: "/diarista.png",
        },
        {
          nome: "Carlos Santos",
          profissao: "Eletricista",
          local: "São Caetano - SP",
          img: "/eletricista.png",
        },
        {
          nome: "Marcos Lima",
          profissao: "Encanador",
          local: "São Paulo - SP",
          img: "/encanador.png",
        },
      ].map((profissional) => (
        <div className="col-12 col-md-4" key={profissional.nome}>
          <div
            className="card h-100 border-0 shadow-sm"
            style={{ borderRadius: "14px" }}
          >
            <div className="card-body p-4">
              <div className="d-flex align-items-center gap-3 mb-3">
                <img
                  src={profissional.img}
                  alt={profissional.profissao}
                  className="rounded-circle"
                  style={{
                    width: "75px",
                    height: "75px",
                    objectFit: "cover",
                  }}
                />

                <div>
                  <h5 className="fw-bold mb-1">{profissional.nome}</h5>
                  <span className="text-primary">
                    {profissional.profissao}
                  </span>
                </div>
              </div>

              <p className="text-secondary mb-3">
                <i className="bi bi-geo-alt me-2"></i>
                {profissional.local}
              </p>

              <div className="d-flex align-items-center gap-2 mb-3">
                <i className="bi bi-person-check text-primary fs-5"></i>
                <span className="small text-secondary">
                  Profissional cadastrado
                </span>
              </div>

              <Link
                href="/servicos"
                className="btn btn-outline-primary w-100"
              >
                Ver profissional
              </Link>
            </div>
          </div>
        </div>
      ))}
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
      className="p-4 p-md-5 rounded-4"
      style={{
        backgroundColor: "#2864e8",
        color: "#FFFFFF",
      }}
    >
      <div className="row align-items-center g-4">
        <div className="col-12 col-lg-8">
          <h2 className="fw-bold mb-3">
            Divulgue seus serviços com o ConectaPro!
          </h2>

          <p className="mb-0 fs-5">
            Cadastre-se como profissional e apresente seu trabalho a
            pessoas que procuram os seus serviços.
          </p>
        </div>

        <div className="col-12 col-lg-4 text-lg-end">
          <Link
            href="/criarContaProfissional"
            className="btn btn-light btn-lg fw-semibold px-4"
            style={{ color: "#2864e8" }}
          >
            Cadastrar como profissional
          </Link>
        </div>
      </div>
    </div>
  </section>


  <Rodape></Rodape>
  </main>
    </>
  );
}
