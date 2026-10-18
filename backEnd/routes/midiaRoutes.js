import express from "express";

export function criarMidiaRoutes({ midiaController }){
    const router = express.Router();
    router.get("/", midiaController.listar);
    router.get("/:id", midiaController.buscar);
    router.post("/", midiaController.criar);
    router.delete("/:id", midiaController.deletar);
    router.put("/:id", midiaController.atualizar);
    return router;
}