import express from "express";

export function criarServicoRoutes({ servicoController }){
    const router = express.Router();
    router.get("/", servicoController.listar);
    // estas duas precisam vir antes de "/:id", senão "busca" seria lido como um ID
    router.get("/busca", servicoController.pesquisar);
    router.get("/categorias", servicoController.listarCategorias);
    router.get("/:id", servicoController.buscar);
    router.post("/", servicoController.criar);
    router.delete("/:id", servicoController.deletar);
    router.put("/:id", servicoController.atualizar);
    return router;
}