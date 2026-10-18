"use client";

import styles from "./profissionaisHome.module.css";

import { useEffect, useState } from "react";
import CardProfissional from "@/components/CardProfissionais";

export default function ProfissionaisHome(){
    const [ listaProfissionais, setListaProfissionais ] = useState([]);
    const [ msgErro, setMsgErro ] = useState("");

    useEffect(() => {
        fetch("http://localhost:3001/api/profissional")
        .then(res => res.json())
            .then(data => {
                console.log(data)
                setListaProfissionais(data.dados);
                setMsgErro("");
            })
        .catch(erro => setMsgErro(erro.message));
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
                            {listaProfissionais.map((profissional) => (
                            <div key={profissional.id_profissional} className={styles.item}>
                                <CardProfissional key={profissional.id_profissional} profissional={profissional}/>
                            </div>
                            ))}
                        </div>
                    </section>
                    :
                    <div>
                        <h2>Nenhum profissional encontrado. Tente novamente mais tarde...</h2>
                    </div>
                }
            </div>
        </section>
    );
}