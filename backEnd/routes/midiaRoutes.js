// Rotas de mídias (fotos dos serviços): /api/midia
import express from "express";

export function criarMidiaRoutes({ midiaController }) {
    const router = express.Router();

    router.get("/", midiaController.listar);
    router.get("/servico/:id", midiaController.listarPorServico); // fotos de um serviço (antes de "/:id")
    router.get("/:id", midiaController.buscar);
    router.post("/", midiaController.criar);       // { tipo: "Imagem", midia: "<url>", id_servico }
    router.put("/:id", midiaController.atualizar);
    router.delete("/:id", midiaController.deletar);

    return router;
}
