"use client";

// Banner do topo da home com a busca principal.

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./bannerHome.module.css";

export default function BannerHome(){
    const router = useRouter();
    const [termo, setTermo] = useState("");

    // leva para a página de busca já com o termo digitado
    function buscar(evento) {
        evento.preventDefault();
        const texto = termo.trim();
        router.push(texto ? `/buscarServicos?termo=${encodeURIComponent(texto)}` : "/buscarServicos");
    }

    return (
        <section className={`container-fluid ${styles.banner}`}>
            <div className="container py-5">
                <div className="row align-items-center mt-4">
                    <div className="col-xl-7 mt-5">
                    <h1 className="display-5 fw-bold mb-4 text-white">Encontre o profissional ideal para o que você precisa.</h1>
                    <p className="fs-5 text-white">Conectamos você a diaristas, eletricistas, pedreiros e diversos autônomos verificados, com praticidade e segurança.</p>
                    <form className="mt-4" onSubmit={buscar} role="search">
                        <div className="input-group">
                        <input
                            className="form-control border-0 rounded-1 py-3 shadow"
                            placeholder="O que você precisa?"
                            aria-label="O que você precisa?"
                            value={termo}
                            onChange={(e) => setTermo(e.target.value)}
                        />
                        <button type="submit" className="btn btn-primary fw-bold px-4 rounded-1 ms-3 shadow d-flex align-items-center">Buscar</button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
