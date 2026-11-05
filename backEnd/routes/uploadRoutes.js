// Rota de envio de imagens: /api/upload
import express from "express";

export function criarUploadRoutes({ uploadController }) {
    const router = express.Router();

    // Não exige login porque a tela de cadastro envia a foto antes de a conta existir
    router.post("/", uploadController.enviar); // { arquivo: "data:image/png;base64,..." } -> { url }

    return router;
}
