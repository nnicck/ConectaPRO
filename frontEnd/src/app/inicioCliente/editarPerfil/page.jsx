"use client";

// Editar perfil do cliente: /inicioCliente/editarPerfil
// Carrega os dados do cliente logado e mostra o formulário (components/FormPerfil).

import { useEffect, useState } from "react";
import Link from "next/link";
import FormPerfil from "@/components/FormPerfil";
import { Alerta, Carregando } from "@/components/ui/Mensagem";
import { api } from "@/lib/api";
import { useSessao } from "@/lib/sessao";

export default function EditarPerfilCliente() {
    const { usuario, liberado } = useSessao("cliente");
    const [cliente, setCliente] = useState(null);
    const [erro, setErro] = useState("");

    useEffect(() => {
        if (liberado) {
            api(`/cliente/${usuario.id}`).then(setCliente).catch((e) => setErro(e.message));
        }
    }, [liberado, usuario]);

    return (
        <main className="container py-5">
            <Link href="/inicioCliente" className="text-decoration-none texto-suave"><i className="bi bi-arrow-left me-1"></i>Voltar</Link>
            <h1 className="fw-bold text-center h3 mb-4">Editar perfil</h1>

            <Alerta>{erro}</Alerta>
            {cliente ? <FormPerfil tipo="cliente" registro={cliente} /> : !erro && <Carregando />}
        </main>
    );
}
