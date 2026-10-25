"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import InfoPrimaria from "@/components/perfilProfissional-comp/infoPrimaria";
import Navegacao from "@/components/perfilProfissional-comp/navegacao";
import Servicos from "@/components/perfilProfissional-comp/servicos";
import Avaliacoes from "@/components/perfilProfissional-comp/avaliacoes";
import "./peprofissional.css";

export default function PerfilProfissional() {
  const params = useParams();
  const [ profissional, setProfissional ] = useState();
  const [ msgErro, setMsgErro ] = useState("");

  useEffect(() => {
    async function buscarProfissional() {
      try {
        const resposta = await fetch(
            `http://localhost:3001/api/profissional/${params.id}`
        );

        if (!resposta.ok) {
            throw new Error("Não foi possível buscar o profissional.");
        }

        const resultado = await resposta.json();
        const profissional = resultado.dados;
        
        setProfissional(profissional);
        setMsgErro("");
      } catch (erro) {
        setMsgErro(erro.message);
      }
  }

  if (params.id) {
      buscarProfissional();
    }
  }, [params.id]);

  if (msgErro) {
      return <p className="container mt-4 text-danger">{msgErro}</p>;
  }

  if (!profissional) {
      return <p className="container mt-4">Carregando perfil...</p>;
  }

  return (
    <main className="container py-4">
      <div className="perfil d-flex flex-column gap-4">
        <InfoPrimaria profissional={profissional} />
        <Navegacao />
        <section id="desc">
          <h3>Visão Geral</h3>
          <p className="desc">
            {profissional.visao_geral}
          </p>
        </section>
        <Servicos />
        <Avaliacoes />
      </div>
    </main>
  );
}