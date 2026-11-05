"use client";

import { usePathname } from "next/navigation";
import BarraNavegacao from "@/components/BarraNavegacao";
import Rodape from "@/components/Rodape";

// O painel do profissional tem menu lateral próprio, então lá não mostramos a barra do site nem o rodapé
export default function LayoutPrincipal({ children }) {
    const pathname = usePathname();
    const paginaPainel = pathname.startsWith("/inicioProfissional");

    if (paginaPainel) {
        return children;
    }

    return (
        <div className="d-flex flex-column min-vh-100">
            <BarraNavegacao />
            {/* d-flex: permite que uma página ocupe toda a altura entre o topo e o rodapé (ex.: login) */}
            <div className="flex-grow-1 d-flex flex-column">{children}</div>
            <Rodape />
        </div>
    );
}
