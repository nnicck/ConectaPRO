// Controller de serviços: CRUD padrão + busca, categorias, detalhes e controle de dono.

import { criarControllerCrud } from "../utils/controllerCrud.js";
import { responderErro } from "../utils/responderErro.js";

export function criarServicoController({ servicoService }) {
    const crud = criarControllerCrud({ service: servicoService, nome: "Serviço" });

    // Se um profissional estiver logado, o serviço é sempre dele
    // (evita criar/editar serviço em nome de outra pessoa pelo painel)
    function aplicarDono(req) {
        const usuario = req.session.usuario;
        if (usuario?.tipo === "profissional") {
            req.body.id_profissional = usuario.id;
        }
    }

    // Um profissional logado só pode alterar ou excluir os próprios serviços
    async function conferirDono(req) {
        const usuario = req.session.usuario;
        if (usuario?.tipo !== "profissional") return;

        const servico = await servicoService.buscarPorId(req.params.id);
        if (servico.id_profissional !== usuario.id) {
            throw new Error("Acesso negado: este serviço não pertence a você");
        }
    }

    async function criar(req, res, next) {
        aplicarDono(req);
        return crud.criar(req, res, next);
    }

    async function atualizar(req, res, next) {
        try {
            await conferirDono(req);
        } catch (erro) {
            return responderErro(erro, res, next);
        }
        aplicarDono(req);
        return crud.atualizar(req, res, next);
    }

    async function deletar(req, res, next) {
        try {
            await conferirDono(req);
        } catch (erro) {
            return responderErro(erro, res, next);
        }
        return crud.deletar(req, res, next);
    }

    // GET /api/servico/busca?termo=&categoria=&localizacao=&faixa=
    async function pesquisar(req, res, next) {
        try {
            const dados = await servicoService.pesquisar(req.query);
            res.status(200).json({ sucesso: true, dados });
        } catch (erro) {
            responderErro(erro, res, next);
        }
    }

    // GET /api/servico/categorias
    async function listarCategorias(req, res, next) {
        try {
            const dados = await servicoService.listarCategorias();
            res.status(200).json({ sucesso: true, dados });
        } catch (erro) {
            responderErro(erro, res, next);
        }
    }

    // GET /api/servico/profissional/:id
    async function listarPorProfissional(req, res, next) {
        try {
            const dados = await servicoService.listarPorProfissional(req.params.id);
            res.status(200).json({ sucesso: true, dados });
        } catch (erro) {
            responderErro(erro, res, next);
        }
    }

    // GET /api/servico/:id/detalhes
    async function detalhes(req, res, next) {
        try {
            const dados = await servicoService.buscarDetalhes(req.params.id);
            res.status(200).json({ sucesso: true, dados });
        } catch (erro) {
            responderErro(erro, res, next);
        }
    }

    return { ...crud, criar, atualizar, deletar, pesquisar, listarCategorias, listarPorProfissional, detalhes };
}
