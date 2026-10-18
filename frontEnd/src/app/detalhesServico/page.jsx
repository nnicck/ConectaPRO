"use client";

import { useState } from "react";
import "./detalhesServico.module.css";

export default function detalhesServico() {
  const imagens = [
    "/imagens/ventilador.jpg",
    "/imagens/instalacao1.jpg",
    "/imagens/instalacao2.jpg",
    "/imagens/instalacao3.jpg",
  ];

  const [imagemSelecionada, setImagemSelecionada] = useState(imagens[0]);

  return (
    <div className="container py-5">
      <div className="servico-container mx-auto">
        <div className="row g-4 align-items-start">

          {/* Imagens */}
          <div className="col-md-5">
            <img
              src={imagemSelecionada}
              alt="Instalação de ventilador"
              className="img-principal"
            />

            <div className="d-flex gap-2 mt-3">
              {imagens.map((imagem, index) => (
                <img
                  key={imagem}
                  src={imagem}
                  alt={`Foto ${index + 1}`}
                  className={`img-miniatura ${
                    imagemSelecionada === imagem
                      ? "miniatura-ativa"
                      : ""
                  }`}
                  onClick={() => setImagemSelecionada(imagem)}
                />
              ))}
            </div>
          </div>

          {/* Informações */}
          <div className="col-md-7">
            <h2 className="titulo-servico">
              Instalação de ventilador
            </h2>

            <p className="text-secondary mb-3">
              por Tomas Edisson | ⭐ 4.9 (34 avaliações)
            </p>

            <h3 className="preco-servico mb-4">
              Preço: <strong>R$ 150,00</strong>
            </h3>

            <ul className="lista-beneficios">
              <li>✓ Montagem completa do motor e pás</li>
              <li>✓ Fixação e testes de segurança no teto</li>
              <li>✓ Instalação do interruptor ou controle remoto</li>
              <li>✓ Balanceamento para evitar trepidações.</li>
            </ul>

            <button
              className="btn btn-primary btn-orcamento w-100 mt-3"
              onClick={() => alert("Solicitação de orçamento")}
            >
              Solicitar orçamento
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}