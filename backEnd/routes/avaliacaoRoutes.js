import express from "express";

export function criarAvaliacaoRoutes({ avaliacaoController }){
    const router = express.Router();
    router.get("/", avaliacaoController.listar);
    router.get("/profissional/:id", avaliacaoController.listarPorProfissional);
    router.get("/:id", avaliacaoController.buscar);
    router.post("/", avaliacaoController.criar);
    router.delete("/:id", avaliacaoController.deletar);
    router.put("/:id", avaliacaoController.atualizar);
    return router;
}