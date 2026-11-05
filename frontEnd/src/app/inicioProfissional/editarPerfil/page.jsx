"use client";

// Editar perfil do profissional: /inicioProfissional/editarPerfil
// Usa o mesmo formulário do cliente (components/FormPerfil) com os campos extras de profissional.

import FormPerfil from "@/components/FormPerfil";
import { usePainel } from "@/lib/painel";

export default function EditarPerfilProfissional() {
    const { profissional, recarregar } = usePainel();

    return (
        <>
            <h1 className="fw-bold h3 mb-4">Editar perfil</h1>
            <FormPerfil tipo="profissional" registro={profissional} aoSalvar={recarregar} />
        </>
    );
}
