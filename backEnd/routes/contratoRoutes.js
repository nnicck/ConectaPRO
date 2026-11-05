// Rotas de contratos (pedidos de serviço): /api/contrato
import express from "express";
import { exigirLogin } from "../utils/auxiliares.js";

export function criarContratoRoutes({ contratoController }) {
    const router = express.Router();

    router.get("/", contratoController.listar);

    // Rotas com nome fixo precisam vir ANTES de "/:id"
    router.get("/meus", exigirLogin(), contratoController.listarMeus);                     // pedidos de quem está logado
    router.post("/solicitar", exigirLogin("cliente"), contratoController.solicitar);       // cliente pede um serviço
    router.get("/:id/acompanhamento", exigirLogin(), contratoController.acompanhar);        // detalhes do pedido
    router.patch("/:id/cancelar", exigirLogin("cliente"), contratoController.cancelar);    // cliente cancela
    router.patch("/:id/status", exigirLogin("profissional"), contratoController.mudarStatus); // aceitar/recusar/iniciar/concluir

    // CRUD básico
    router.get("/:id", contratoController.buscar);
    router.post("/", contratoController.criar);
    router.put("/:id", contratoController.atualizar);
    router.delete("/:id", contratoController.deletar);

    return router;
}
