"use client";

import { useState } from "react";
import { enviarImagem } from "@/lib/api";
import Avatar from "./Avatar";

// Botão "Alterar foto" com prévia. Envia a imagem para o back-end e devolve a URL em aoMudar(url).
export default function CampoImagem({ valor, aoMudar, rotulo = "Alterar foto", redondo = true }) {
    const [enviando, setEnviando] = useState(false);
    const [erro, setErro] = useState("");

    async function selecionar(evento) {
        const arquivo = evento.target.files?.[0];
        evento.target.value = ""; // permite escolher o mesmo arquivo de novo
        if (!arquivo) return;

        try {
            setErro("");
            setEnviando(true);
            aoMudar(await enviarImagem(arquivo));
        } catch (e) {
            setErro(e.message);
        } finally {
            setEnviando(false);
        }
    }

    return (
        <div className="d-flex align-items-center gap-4 flex-wrap">
            {redondo ? (
                <Avatar src={valor} tamanho={120} />
            ) : (
                valor && <img src={valor} alt="Prévia" style={{ width: 120, height: 90, objectFit: "cover", borderRadius: 8 }} />
            )}

            <div className="d-flex flex-column gap-2">
                <label className={`btn btn-primary fw-semibold px-4 ${enviando ? "disabled" : ""}`}>
                    {enviando ? "Enviando..." : rotulo}
                    <input type="file" accept="image/*" className="d-none" onChange={selecionar} disabled={enviando} />
                </label>

                {valor && (
                    <button type="button" className="btn btn-link btn-sm text-danger p-0" onClick={() => aoMudar("")}>
                        Remover foto
                    </button>
                )}

                <small className="texto-suave">PNG ou JPG de até 5 MB.</small>
                {erro && <small className="text-danger">{erro}</small>}
            </div>
        </div>
    );
}
