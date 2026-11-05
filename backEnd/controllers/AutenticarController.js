// Controller de login: entrar, ver quem está logado, atualizar a sessão e sair.

import { responderErro } from "../utils/responderErro.js";

export function criarAutenticarController({ autenticarService }) {
    async function login(req, res, next) {
        try {
            const usuario = await autenticarService.login(req.body);

            req.session.regenerate((erro) => {
                if (erro) return next(erro);

                req.session.usuario = usuario;

                req.session.save((erro) => {
                    if (erro) return next(erro);

                    res.status(200).json({
                        sucesso: true,
                        mensagem: "Login realizado com sucesso",
                        dados: usuario
                    });
                });
            });
        } catch (erro) {
            if (erro.message.includes("inválidos")) {
                return res.status(401).json({ sucesso: false, erro: erro.message });
            }

            responderErro(erro, res, next);
        }
    }

    // Visitante sem login recebe 200 com dados: null (não é um erro, só não está logado)
    function me(req, res) {
        if (!req.session.usuario) {
            return res.status(200).json({
                sucesso: true,
                autenticado: false,
                dados: null
            });
        }

        res.status(200).json({
            sucesso: true,
            autenticado: true,
            dados: req.session.usuario
        });
    }

    // Atualiza nome/foto guardados na sessão depois de editar o perfil
    function atualizarSessao(req, res) {
        if (!req.session.usuario) {
            return res.status(401).json({ sucesso: false, erro: "Faça login para continuar" });
        }

        const { nome, foto, email } = req.body;
        req.session.usuario = { ...req.session.usuario, ...(nome && { nome }), ...(email && { email }), foto: foto ?? req.session.usuario.foto };

        res.status(200).json({ sucesso: true, dados: req.session.usuario });
    }

    function logout(req, res, next) {
        req.session.destroy((erro) => {
            if (erro) return next(erro);

            res.clearCookie("connect.sid");
            res.status(200).json({
                sucesso: true,
                mensagem: "Logout realizado com sucesso"
            });
        });
    }

    return { login, me, atualizarSessao, logout };
}
