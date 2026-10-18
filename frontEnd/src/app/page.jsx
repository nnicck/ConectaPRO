"use client";

import BannerHome from "@/components/home/BannerHome";
import ServicosHome from "@/components/home/ServicosHome";
import ProfissionaisHome from "@/components/home/ProfissionaisHome";
import ComoFuncionaHome from "@/components/home/ComoFuncionaHome";
import PorQueEscolherHome from "@/components/home/PorQueEscolherHome";

import { useEffect, useState } from "react";

export default function Home() {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  async function fazerLogout() {
    try {
        const resposta = await fetch(
            "http://localhost:3001/api/autenticar/logout",
            {
                method: "POST",
                credentials: "include"
            }
        );

        if (!resposta.ok) {
            throw new Error("Não foi possível sair da conta.");
        }

        window.location.href = "/login";
      } catch (erro) {
          console.error(erro);
          alert(erro.message);
      }
  }

  useEffect(() => {
      fetch("http://localhost:3001/api/autenticar/me", {
          credentials: "include"
      })
          .then(async (resposta) => {
              if (!resposta.ok) {
                  setUsuario(null);
                  return;
              }

              const resultado = await resposta.json();
              setUsuario(resultado.dados);
          })
          .catch(() => setUsuario(null))
          .finally(() => setCarregando(false));
  }, []);

  if (carregando) return <p>Verificando login...</p>;

  if (!usuario) 
  {

  
  return (
    <main>
      {/* banner */}
      <BannerHome/>

      {/* seção serviços */}
      <ServicosHome/>

      {/* Profissionais em destaque */}
      <ProfissionaisHome/>

      {/* COMO FUNCIONA */}
      <ComoFuncionaHome/>

      {/* POR QUE ESCOLHER O CONECTAPRO */}
      <PorQueEscolherHome/>
    </main>
  );
}

  return (
    <>
      <h1>Olá, {usuario.nome}!</h1>
      <button onClick={fazerLogout}>Sair</button>
    </>
  );
}
