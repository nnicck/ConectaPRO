import express from "express";

export function criarProfissionalRoutes({ profissionalController }){
    const router = express.Router();
    router.get("/", profissionalController.listar);
    router.get("/:id", profissionalController.buscar);
    router.post("/", profissionalController.criar);
    router.delete("/:id", profissionalController.deletar);
    router.put("/:id", profissionalController.atualizar);
    return router;
}