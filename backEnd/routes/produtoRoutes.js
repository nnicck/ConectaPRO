import express from "express";

export function criarProdutoRoutes({ produtoController }){
    const router = express.Router();
    router.get("/", produtoController.listar);
    router.get("/:id", produtoController.buscar);
    router.post("/", produtoController.criar);
    router.delete("/:id", produtoController.deletar);
    router.put("/:id", produtoController.atualizar);
    return router;
}