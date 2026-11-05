// Rotas de serviços: /api/servico
import express from "express";

export function criarServicoRoutes({ servicoController }) {
    const router = express.Router();

    router.get("/", servicoController.listar);

    // Rotas com nome fixo precisam vir ANTES de "/:id", senão "busca" seria lido como um ID
    router.get("/busca", servicoController.pesquisar);                       // ?termo=&categoria=&localizacao=&faixa=
    router.get("/categorias", servicoController.listarCategorias);           // categorias com algum serviço
    router.get("/profissional/:id", servicoController.listarPorProfissional); // serviços de um profissional
    router.get("/:id/detalhes", servicoController.detalhes);                 // serviço + profissional + fotos

    router.get("/:id", servicoController.buscar);
    router.post("/", servicoController.criar);           // profissional logado vira o dono automaticamente
    router.put("/:id", servicoController.atualizar);     // profissional só altera os próprios serviços
    router.delete("/:id", servicoController.deletar);    // profissional só exclui os próprios serviços

    return router;
}
