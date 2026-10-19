"use client";

import { usePathname } from "next/navigation";
import BarraNavegacao from "@/components/BarraNavegacao";
import Rodape from "@/components/Rodape";

export default function LayoutPrincipal({ children }) {
    const pathname = usePathname();

    const paginaProfissional =
        pathname.startsWith("/inicioProfissional")

    return (
        <>
            {!paginaProfissional && <BarraNavegacao />}
            {children}
            {!paginaProfissional && <Rodape />}
        </>
    );
}