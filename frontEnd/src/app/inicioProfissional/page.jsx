"use client";
import Sidebar from "@/components/Sidebar"
import Link from "next/link"
import CardsDashboard from "@/components/CardsDashboard"
import { useEffect, useState } from "react"; 
//UseEffect - Quando a tela atualizar vai pegar as informações
//UseState - Para Mostrar as informações na tela

export default function inicioProfissional(){
    const [contratos, setContratos] = useState([]);

    useEffect(()=>{
        async function qtdContratos() {
            try{
                const resposta = await fetch(
                    "http://localhost:3001/api/contrato",
                    { credentials: "include" }
                );
            
            if(!resposta.ok){
                throw new Error("Erro ao buscar quantidades de contratos");
            }
            const resultado = await resposta.json();
            setContratos (resultado.dados);

            } catch(erro){
                console.error(erro);
            }
        }

        qtdContratos();
    }, []);

    return(
        <>
        <main className="d-flex gap-3">
        <Sidebar></Sidebar>

        <div className="container">
            <form className="mt-4 w-100">
                <div className="input-group">
                <input className="form-control border-0 rounded-1 py-3 shadow" placeholder="O que você precisa?" />
                <Link href="/" className="btn btn-primary fw-bold px-4 rounded-1 ms-3 shadow d-flex align-items-center">Buscar</Link>
                </div>
            </form>

            <div className="mt-5">
                <h1>Olá, nome!</h1>
                <p>Seu perfil está ativo para os clientes</p>
                <div className="d-flex gap-4">
                    <CardsDashboard titCardDashboard="Serviços Solicitados" numDashboard={contratos.length}></CardsDashboard>
                    <CardsDashboard titCardDashboard="Serviços Solicitados" numDashboard="1"></CardsDashboard>
                    <CardsDashboard titCardDashboard="Serviços Solicitados" numDashboard="1"></CardsDashboard>
                    <CardsDashboard titCardDashboard="Serviços Solicitados" numDashboard="1"></CardsDashboard>
                </div>
            </div>
        </div>
        </main>
        </>
    )
}