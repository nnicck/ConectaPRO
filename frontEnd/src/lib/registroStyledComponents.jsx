"use client";

import { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";

// Registro do styled-components para o Next.js (App Router).
// Sem ele, o CSS dos componentes styled (ex.: LoadingTruck) só chega depois do JavaScript,
// e o desenho aparece sem estilo (gigante) por um instante.
// Este componente coloca o CSS direto no HTML que o servidor envia.
// (Receita da documentação oficial do Next.js: "CSS-in-JS > styled-components")
export default function RegistroStyledComponents({ children }) {
    // cria a "folha de estilos" uma vez só
    const [folhaDeEstilos] = useState(() => new ServerStyleSheet());

    useServerInsertedHTML(() => {
        const estilos = folhaDeEstilos.getStyleElement();
        folhaDeEstilos.instance.clearTag();
        return <>{estilos}</>;
    });

    // no navegador não precisa de nada especial
    if (typeof window !== "undefined") return <>{children}</>;

    return <StyleSheetManager sheet={folhaDeEstilos.instance}>{children}</StyleSheetManager>;
}
