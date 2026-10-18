import express from "express";

export function criarContratoRoutes({ contratoController }){
    const router = express.Router();
    router.get("/", contratoController.listar);
    router.get("/:id", contratoController.buscar);
    router.post("/", contratoController.criar);
    router.delete("/:id", contratoController.deletar);
    router.put("/:id", contratoController.atualizar);
    return router;
}