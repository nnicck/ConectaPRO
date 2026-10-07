import Image from "next/image";
import styles from "./page.module.css";
import BarraNavegacao from "@/components/BarraNavegacao";
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

export default function Home() {
  return (
    <>
    <main style={{backgroundColor: "#eff2f4"}}>


    <header>
      <BarraNavegacao botaoUm="Cadastre-se" botaoDois="Cadastre-se como profissional" botaoTres="Entrar"></BarraNavegacao>
    </header>

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

    <div className="container py-4 mt-4">

    <h3 className="text-center fw-bold mb-4">
        Serviços Disponíveis
    </h3>

    <div className="row g-3">

        {servicos.map((servico) => (
            <div
                className="col-12 col-md-5 col-lg-4"
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
  
    
    </main>


    </>
  );
}
