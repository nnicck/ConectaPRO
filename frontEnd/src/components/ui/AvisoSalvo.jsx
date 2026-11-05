"use client";

import { useEffect, useState } from "react";

// Mostra "Alterações salvas com sucesso!" quando a página abre com ?perfil=salvo
// (é para onde o "Editar perfil" manda depois de salvar). Depois tira o ?perfil=salvo da URL,
// para o aviso não voltar ao atualizar a página.
export default function AvisoSalvo() {
    const [visivel, setVisivel] = useState(false);

    useEffect(() => {
        const parametros = new URLSearchParams(window.location.search);
        if (parametros.get("perfil") !== "salvo") return;

        setVisivel(true);
        parametros.delete("perfil");
        const resto = parametros.toString();
        window.history.replaceState(null, "", window.location.pathname + (resto ? `?${resto}` : ""));

        const tempo = setTimeout(() => setVisivel(false), 5000);
        return () => clearTimeout(tempo);
    }, []);

    if (!visivel) return null;

    return (
        <div className="alert alert-success d-flex align-items-center justify-content-between gap-2 mb-4" role="status">
            <span><i className="bi bi-check-circle-fill me-2"></i>Alterações salvas com sucesso!</span>
            <button type="button" className="btn-close" aria-label="Fechar aviso" onClick={() => setVisivel(false)}></button>
        </div>
    );
}
