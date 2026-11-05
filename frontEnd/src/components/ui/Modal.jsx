"use client";

import { useEffect } from "react";

// Janela modal simples controlada por estado:
//   const [aberto, setAberto] = useState(false);
//   {aberto && <Modal titulo="..." aoFechar={() => setAberto(false)}>conteúdo</Modal>}
export default function Modal({ titulo, aoFechar, children, largura = 640 }) {
    // fecha com a tecla Esc
    useEffect(() => {
        function teclar(evento) {
            if (evento.key === "Escape") aoFechar();
        }
        window.addEventListener("keydown", teclar);
        return () => window.removeEventListener("keydown", teclar);
    }, [aoFechar]);

    return (
        <div className="modal-cp-fundo" onMouseDown={(evento) => evento.target === evento.currentTarget && aoFechar()}>
            <div className="modal-cp" style={{ maxWidth: largura }} role="dialog" aria-modal="true" aria-label={titulo}>
                <div className="d-flex align-items-center justify-content-between border-bottom px-4 py-3">
                    <h2 className="h5 fw-bold mb-0">{titulo}</h2>
                    <button type="button" className="btn-close" aria-label="Fechar" onClick={aoFechar}></button>
                </div>
                <div className="p-4">{children}</div>
            </div>
        </div>
    );
}
