"use client";

import { useCallback, useRef, useState } from "react";
import Modal from "./Modal";

// Pop-up de confirmação no visual do site (substitui o window.confirm do navegador).
//
// Uso:
//   const [confirmar, janelaConfirmar] = useConfirmar();
//
//   async function excluir() {
//       const ok = await confirmar({ titulo: "Excluir serviço", mensagem: "Tem certeza?", botao: "Excluir" });
//       if (!ok) return;
//       ...
//   }
//
//   return <>... {janelaConfirmar}</>;
export function useConfirmar() {
    const [opcoes, setOpcoes] = useState(null);
    const resolver = useRef(null);

    // abre o pop-up e espera o usuário escolher: devolve true (confirmou) ou false (desistiu)
    const confirmar = useCallback((novasOpcoes) => {
        setOpcoes(novasOpcoes);
        return new Promise((resolve) => {
            resolver.current = resolve;
        });
    }, []);

    const responder = useCallback((resposta) => {
        resolver.current?.(resposta);
        resolver.current = null;
        setOpcoes(null);
    }, []);

    const fechar = useCallback(() => responder(false), [responder]);

    const janela = opcoes && (
        <Modal titulo={opcoes.titulo ?? "Confirmar"} aoFechar={fechar} largura={440}>
            <div className="d-flex gap-3 align-items-start">
                <span
                    className={`rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 bg-${opcoes.perigo === false ? "primary" : "danger"}-subtle text-${opcoes.perigo === false ? "primary" : "danger"}`}
                    style={{ width: 44, height: 44 }}
                >
                    <i className={`bi ${opcoes.perigo === false ? "bi-question-lg" : "bi-exclamation-triangle"} fs-5`}></i>
                </span>
                <p className="mb-0 pt-2">{opcoes.mensagem}</p>
            </div>

            <div className="d-flex justify-content-end gap-2 mt-4">
                <button type="button" className="btn btn-branco px-4" onClick={fechar}>
                    {opcoes.cancelar ?? "Voltar"}
                </button>
                <button
                    type="button"
                    className={`btn ${opcoes.perigo === false ? "btn-primary" : "btn-danger"} px-4 fw-semibold`}
                    onClick={() => responder(true)}
                    autoFocus
                >
                    {opcoes.botao ?? "Confirmar"}
                </button>
            </div>
        </Modal>
    );

    return [confirmar, janela];
}
