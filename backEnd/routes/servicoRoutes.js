import express from "express";

export function criarServicoRoutes({ servicoController }){
    const router = express.Router();
    router.get("/", servicoController.listar);
    router.get("/:id", servicoController.buscar);
    router.post("/", servicoController.criar);
    router.delete("/:id", servicoController.deletar);
    router.put("/:id", servicoController.atualizar);
    return router;
}