// Controller de contratos: CRUD padrão + ações do pedido (solicitar, acompanhar, cancelar, mudar status).

import { criarControllerCrud } from "../utils/controllerCrud.js";
import { responderErro } from "../utils/responderErro.js";

export function criarContratoController({ contratoService }) {
    const crud = criarControllerCrud({ service: contratoService, nome: "Contrato" });

    // GET /api/contrato/meus   (cliente ou profissional logado)
    async function listarMeus(req, res, next) {
        try {
            const dados = await contratoService.listarMeus(req.session.usuario);
            res.status(200).json({ sucesso: true, dados });
        } catch (erro) {
            responderErro(erro, res, next);
        }
    }

    // POST /api/contrato/solicitar   body: { id_servico, data_contrato, local, observacao }   (cliente logado)
    async function solicitar(req, res, next) {
        try {
            const dados = await contratoService.solicitar(req.body, req.session.usuario);
            res.status(201).json({ sucesso: true, mensagem: "Solicitação enviada ao profissional", dados });
        } catch (erro) {
            responderErro(erro, res, next);
        }
    }

    // GET /api/contrato/:id/acompanhamento
    async function acompanhar(req, res, next) {
        try {
            const dados = await contratoService.buscarAcompanhamento(req.params.id, req.session.usuario);
            res.status(200).json({ sucesso: true, dados });
        } catch (erro) {
            responderErro(erro, res, next);
        }
    }

    // PATCH /api/contrato/:id/cancelar   (cliente logado)
    async function cancelar(req, res, next) {
        try {
            const dados = await contratoService.cancelar(req.params.id, req.session.usuario);
            res.status(200).json({ sucesso: true, mensagem: "Serviço cancelado com sucesso", dados });
        } catch (erro) {
            responderErro(erro, res, next);
        }
    }

    // PATCH /api/contrato/:id/status   body: { acao: "aceitar" | "recusar" | "iniciar" | "concluir" }   (profissional logado)
    async function mudarStatus(req, res, next) {
        try {
            const dados = await contratoService.mudarStatus(req.params.id, req.body.acao, req.session.usuario);
            res.status(200).json({ sucesso: true, mensagem: `Serviço ${dados.status}`, dados });
        } catch (erro) {
            responderErro(erro, res, next);
        }
    }

    return { ...crud, listarMeus, solicitar, acompanhar, cancelar, mudarStatus };
}
