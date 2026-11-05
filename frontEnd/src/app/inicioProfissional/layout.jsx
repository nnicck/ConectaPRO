"use client";

import { useCallback, useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Carregando } from "@/components/ui/Mensagem";
import { api } from "@/lib/api";
import { useSessao } from "@/lib/sessao";
import { PainelContext } from "@/lib/painel";

// Layout de todas as páginas /inicioProfissional/* (painel do profissional):
//   1. confere se quem está logado é um profissional (senão manda para o login)
//   2. carrega os dados do profissional e os pedidos dele uma vez só
//   3. mostra o menu lateral e a barra de busca do topo
// As páginas pegam esses dados com usePainel() (ver lib/painel.jsx).
export default function LayoutPainelProfissional({ children }) {
    const { usuario, liberado, sair } = useSessao("profissional");

    const [profissional, setProfissional] = useState(null);
    const [contratos, setContratos] = useState([]);
    const [busca, setBusca] = useState("");   // texto da barra de busca do topo
    const [erro, setErro] = useState("");

    // Busca (de novo) o profissional e os pedidos. As páginas chamam depois de alguma alteração.
    const recarregar = useCallback(async () => {
        if (!usuario) return;

        try {
            const [dadosProfissional, dadosContratos] = await Promise.all([
                api(`/profissional/${usuario.id}`),
                api("/contrato/meus")
            ]);
            setProfissional(dadosProfissional);
            setContratos(dadosContratos);
            setErro("");
        } catch (e) {
            setErro(e.message);
        }
    }, [usuario]);

    useEffect(() => {
        if (liberado) recarregar();
    }, [liberado, recarregar]);

    if (!liberado) {
        return <div className="container"><Carregando texto="Verificando login..." /></div>;
    }

    return (
        <PainelContext.Provider value={{ profissional, contratos, busca, recarregar }}>
            <div className="d-flex flex-column flex-lg-row min-vh-100">
                <Sidebar profissional={profissional} aoSair={sair} />

                <main className="flex-grow-1 px-3 px-md-5 py-4" style={{ minWidth: 0 }}>

                    {erro && (
                        <div className="alert alert-danger d-flex flex-wrap align-items-center justify-content-between gap-2">
                            <span>{erro}</span>
                            <button type="button" className="btn btn-sm btn-outline-danger" onClick={recarregar}>Tentar novamente</button>
                        </div>
                    )}

                    {/* As páginas do painel usam "profissional", então só aparecem depois que ele carregou */}
                    {profissional ? children : !erro && <Carregando texto="Carregando painel..." />}
                </main>
            </div>
        </PainelContext.Provider>
    );
}
