"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { api } from "@/lib/api";

// Guarda quem está logado e compartilha com todas as páginas,
// assim a sessão é consultada uma vez só (e não em cada componente).
const SessaoContext = createContext(null);

export function SessaoProvider({ children }) {
    const [usuario, setUsuario] = useState(null);
    const [carregando, setCarregando] = useState(true);

    const recarregar = useCallback(async () => {
        try {
            setUsuario(await api("/autenticar/me"));
        } catch {
            setUsuario(null);
        } finally {
            setCarregando(false);
        }
    }, []);

    useEffect(() => {
        recarregar();
    }, [recarregar]);

    async function entrar(email, senha, tipo) {
        const dados = await api("/autenticar/login", { metodo: "POST", dados: { email, senha, tipo } });
        setUsuario(dados);
        return dados;
    }

    async function sair() {
        await api("/autenticar/logout", { metodo: "POST" }).catch(() => {});
        // recarrega a página inteira na home: limpa todos os dados da conta que estavam na tela
        // (com router.push, a proteção do painel redirecionaria para /login antes de chegar na home)
        window.location.href = "/"; // eslint-disable-line @next/next/no-location-assign-relative-destination
    }

    // Depois de editar o perfil, atualiza nome/foto guardados na sessão
    async function atualizarSessao(dados) {
        setUsuario(await api("/autenticar/me", { metodo: "PUT", dados }));
    }

    return (
        <SessaoContext.Provider value={{ usuario, carregando, recarregar, entrar, sair, atualizarSessao }}>
            {children}
        </SessaoContext.Provider>
    );
}

// Uso: const { usuario, carregando } = useSessao();            -> só lê a sessão
//      const { usuario, carregando } = useSessao("cliente");   -> exige login de cliente (senão vai para /login)
export function useSessao(tipoExigido) {
    const contexto = useContext(SessaoContext);
    const router = useRouter();
    const caminho = usePathname();

    const { usuario, carregando } = contexto;
    const semPermissao = Boolean(tipoExigido) && !carregando && (!usuario || usuario.tipo !== tipoExigido);

    useEffect(() => {
        if (semPermissao) {
            router.replace(`/login?voltar=${encodeURIComponent(caminho)}&tipo=${tipoExigido}`);
        }
    }, [semPermissao, router, caminho, tipoExigido]);

    return { ...contexto, liberado: !carregando && !semPermissao };
}
