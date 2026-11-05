// Controller de upload: recebe uma imagem em base64 e salva na pasta backEnd/uploads.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { randomUUID } from "node:crypto";
import { erroValidacao, responderErro } from "../utils/responderErro.js";

// As imagens ficam na pasta backEnd/uploads e são servidas em http://localhost:3001/uploads/<arquivo>
export const PASTA_UPLOADS = join(import.meta.dirname, "..", "uploads");

const EXTENSOES = { "image/png": "png", "image/jpeg": "jpg", "image/webp": "webp", "image/gif": "gif" };
const TAMANHO_MAXIMO = 5 * 1024 * 1024; // 5 MB

export function criarUploadController() {
    mkdirSync(PASTA_UPLOADS, { recursive: true });

    // POST /api/upload   body: { arquivo: "data:image/png;base64,...." }
    // O front lê a imagem com FileReader e manda em base64 (sem precisar de bibliotecas extras).
    function enviar(req, res, next) {
        try {
            const texto = req.body?.arquivo;
            const partes = /^data:(image\/[a-z]+);base64,(.+)$/.exec(texto ?? "");

            if (!partes || !EXTENSOES[partes[1]]) {
                throw erroValidacao("Envie uma imagem PNG, JPG, WEBP ou GIF");
            }

            const conteudo = Buffer.from(partes[2], "base64");

            if (conteudo.length > TAMANHO_MAXIMO) {
                throw erroValidacao("A imagem deve ter no máximo 5 MB");
            }

            const nomeArquivo = `${randomUUID()}.${EXTENSOES[partes[1]]}`;
            writeFileSync(join(PASTA_UPLOADS, nomeArquivo), conteudo);

            const url = `${req.protocol}://${req.get("host")}/uploads/${nomeArquivo}`;
            res.status(201).json({ sucesso: true, dados: { url } });
        } catch (erro) {
            responderErro(erro, res, next);
        }
    }

    return { enviar };
}
