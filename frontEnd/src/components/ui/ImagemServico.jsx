"use client";

import { iconeCategoria } from "@/lib/formatar";

// Imagem do serviço. Quando o serviço não tem foto, mostra um ícone da categoria.
// Imagens da pasta /public (ex.: "/eletricista.png") são ícones pequenos: ficam centralizadas no fundo azul.
// Fotos enviadas (http://...) ocupam o espaço todo.
export default function ImagemServico({ src, categoria, alt = "", altura = 180, className = "", estilo = {} }) {
    if (!src) {
        return (
            <div
                className={`d-flex align-items-center justify-content-center ${className}`}
                style={{ height: altura, backgroundColor: "var(--cp-azul-claro)", color: "var(--cp-azul)", ...estilo }}
                role="img"
                aria-label={alt}
            >
                <i className={`bi ${iconeCategoria(categoria)}`} style={{ fontSize: Math.min(altura / 2.5, 72) }}></i>
            </div>
        );
    }

    const ehIcone = src.startsWith("/");

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            style={{
                width: "100%",
                height: altura,
                objectFit: ehIcone ? "contain" : "cover",
                padding: ehIcone ? altura * 0.2 : 0,
                backgroundColor: ehIcone ? "var(--cp-azul-claro)" : "#fff",
                ...estilo
            }}
            onError={(evento) => {
                evento.currentTarget.onerror = null;
                evento.currentTarget.src = "/imagem.png";
            }}
        />
    );
}
