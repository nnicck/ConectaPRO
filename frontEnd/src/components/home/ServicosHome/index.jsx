"use client";

// Seção "Serviços Disponíveis" da home: um card por categoria com dados reais do banco.

import { useEffect, useState } from "react";
import CardServicos from "@/components/CardServicos";
import { api } from "@/lib/api";
import { formatarPreco } from "@/lib/formatar";

// Cada card leva para a busca filtrada pela categoria. Preço e quantidade vêm do banco.
const CATEGORIAS_HOME = [
    { img: "/diarista.png", titulo: "Diarista", categoria: "Limpeza", descricao: "Limpeza residencial e comercial" },
    { img: "/eletricista.png", titulo: "Eletricista", categoria: "Elétrica", descricao: "Instalações e reparos elétricos" },
    { img: "/encanador.png", titulo: "Encanador", categoria: "Encanamento", descricao: "Instalações e reparos hidráulicos" },
    { img: "/pintor.png", titulo: "Pintor", categoria: "Pintura", descricao: "Pintura residencial e comercial" }
];

export default function ServicosHome() {
    const [servicos, setServicos] = useState(null);

    useEffect(() => {
        api("/servico").then(setServicos).catch(() => setServicos([]));
    }, []);

    return (
        <section className="container py-4 mt-4">
            <h3 className="text-center fw-bold mb-4">Serviços Disponíveis</h3>
            <div className="row g-3">
                {CATEGORIAS_HOME.map((item) => {
                    const daCategoria = (servicos ?? []).filter((s) => s.categoria === item.categoria);
                    const menorPreco = daCategoria.length > 0 ? Math.min(...daCategoria.map((s) => s.preco)) : null;

                    return (
                        <div className="col-12 col-sm-6 col-lg-3" key={item.titulo}>
                            <CardServicos
                                imgCardServico={item.img}
                                titleCardServico={item.titulo}
                                descCardServico={item.descricao}
                                quantidade={servicos === null ? null : daCategoria.length}
                                precoCardServico={menorPreco === null ? null : formatarPreco(menorPreco)}
                                linkCardServico={`/buscarServicos?categoria=${encodeURIComponent(item.categoria)}`}
                            />
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
