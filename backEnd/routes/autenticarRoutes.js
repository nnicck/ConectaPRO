// Rotas de login: /api/autenticar
import express from "express";

export function criarAutenticarRoutes({ autenticarController }) {
    const router = express.Router();

    router.post("/login", autenticarController.login);         // { email, senha, tipo }
    router.get("/me", autenticarController.me);                // quem está logado (ou dados: null)
    router.put("/me", autenticarController.atualizarSessao);   // atualiza nome/foto guardados na sessão
    router.post("/logout", autenticarController.logout);

    return router;
}
