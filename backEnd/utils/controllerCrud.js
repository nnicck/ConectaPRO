// Fábrica de controllers de CRUD: evita repetir o mesmo código em todos os controllers.

import { responderErro } from "./responderErro.js";

// Gera as 5 ações de CRUD (listar, buscar, criar, atualizar, deletar) para qualquer service
// que tenha as funções: listar, buscarPorId, criar, atualizar, deletarPorId.
// "nome" é usado nas mensagens, ex.: "Cliente" -> "Cliente excluído com sucesso"
export function criarControllerCrud({ service, nome, feminino = false }) {
    const o = feminino ? "a" : "o";

    async function listar(req, res, next) {
        try {
            const dados = await service.listar();
            res.status(200).json({ sucesso: true, dados });
        } catch (erro) {
            responderErro(erro, res, next);
        }
    }

    async function buscar(req, res, next) {
        try {
            const dados = await service.buscarPorId(req.params.id);
            res.status(200).json({ sucesso: true, dados });
        } catch (erro) {
            responderErro(erro, res, next);
        }
    }

    async function criar(req, res, next) {
        try {
            const dados = await service.criar(req.body);
            res.status(201).json({ sucesso: true, mensagem: `${nome} cadastrad${o} com sucesso`, dados });
        } catch (erro) {
            responderErro(erro, res, next);
        }
    }

    async function atualizar(req, res, next) {
        try {
            const dados = await service.atualizar(req.params.id, req.body);
            res.status(200).json({ sucesso: true, mensagem: `${nome} atualizad${o} com sucesso`, dados });
        } catch (erro) {
            responderErro(erro, res, next);
        }
    }

    async function deletar(req, res, next) {
        try {
            await service.deletarPorId(req.params.id);
            res.status(200).json({ sucesso: true, mensagem: `${nome} excluíd${o} com sucesso` });
        } catch (erro) {
            responderErro(erro, res, next);
        }
    }

    return { listar, buscar, criar, atualizar, deletar };
}
