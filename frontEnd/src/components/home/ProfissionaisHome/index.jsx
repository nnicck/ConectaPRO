"use client";

// Carrossel "Profissionais em destaque" da home (gira sozinho).

import styles from "./profissionaisHome.module.css";

import { useEffect, useState } from "react";
import CardProfissional from "@/components/CardProfissionais";
import { api } from "@/lib/api";

export default function ProfissionaisHome(){
    const [ listaProfissionais, setListaProfissionais ] = useState([]);
    const [ msgErro, setMsgErro ] = useState("");

    useEffect(() => {
        api("/profissional")
            .then((dados) => {
                setListaProfissionais(dados);
                setMsgErro("");
            })
            .catch((erro) => setMsgErro(erro.message));
    }, []);

    return (
        <section className="py-5" style={{ backgroundColor: "#F8FAFC" }}>
            <div className="container">
                <div className="text-center mb-5">
                    <span className="text-primary fw-semibold small">CONHEÇA NOSSOS PROFISSIONAIS</span>
                    <h2 className="fw-bold mt-2">Profissionais em destaque</h2>
                    <p className="text-secondary mb-0">Conheça profissionais de diferentes áreas de atuação.</p>
                </div>
                {listaProfissionais.length > 0 ?
                    <section className={styles.carrossel}>
                        <div className={styles.trilho}>
                            {/* lista repetida 2x para o carrossel "girar" sem espaço vazio no final */}
                            {[...listaProfissionais, ...listaProfissionais].map((profissional, indice) => (
                            <div key={`${profissional.id_profissional}-${indice}`} className={styles.item} aria-hidden={indice >= listaProfissionais.length}>
                                <CardProfissional profissional={profissional}/>
                            </div>
                            ))}
                        </div>
                    </section>
                    :
                    <p className="text-center texto-suave">
                        {msgErro || "Nenhum profissional encontrado. Tente novamente mais tarde..."}
                    </p>
                }
            </div>
        </section>
    );
}