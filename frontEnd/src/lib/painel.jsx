"use client";

import { createContext, useContext } from "react";

// Dados compartilhados entre as páginas do painel do profissional:
//   busca      -> texto digitado na barra de pesquisa do topo (cada página filtra sua lista com ele)
//   profissional, contratos -> carregados uma vez no layout
//   recarregar -> chama de novo a API depois de alguma alteração
export const PainelContext = createContext(null);

export function usePainel() {
    return useContext(PainelContext);
}

// Confere se algum dos textos contém o que foi digitado na busca (sem diferenciar maiúsculas/acentos)
export function combinaComBusca(busca, ...textos) {
    if (!busca.trim()) return true;
    const normalizar = (texto) => String(texto ?? "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
    const procurado = normalizar(busca.trim());
    return textos.some((texto) => normalizar(texto).includes(procurado));
}
