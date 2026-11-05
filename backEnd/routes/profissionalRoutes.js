// Rotas de profissionais: /api/profissional
import express from "express";

export function criarProfissionalRoutes({ profissionalController }) {
    const router = express.Router();

    router.get("/", profissionalController.listar);          // lista todos (sem senha)
    router.get("/:id", profissionalController.buscar);       // um profissional
    router.post("/", profissionalController.criar);          // cadastro (data de ingresso e saldo automáticos)
    router.put("/:id", profissionalController.atualizar);    // editar perfil (só os campos enviados mudam)
    router.delete("/:id", profissionalController.deletar);   // excluir conta (apaga serviços e pedidos junto)

    return router;
}
