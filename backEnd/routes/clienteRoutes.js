// Rotas de clientes: /api/cliente
import express from "express";

export function criarClienteRoutes({ clienteController }) {
    const router = express.Router();

    router.get("/", clienteController.listar);          // lista todos (sem senha)
    router.get("/:id", clienteController.buscar);       // um cliente
    router.post("/", clienteController.criar);          // cadastro (tela "Criar conta")
    router.put("/:id", clienteController.atualizar);    // editar perfil (só os campos enviados mudam)
    router.delete("/:id", clienteController.deletar);   // excluir conta

    return router;
}
