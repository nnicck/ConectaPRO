// Controller de mídias (fotos dos serviços): CRUD padrão + fotos de um serviço.

import { criarControllerCrud } from "../utils/controllerCrud.js";
import { responderErro } from "../utils/responderErro.js";

export function criarMidiaController({ midiaService }) {
    const crud = criarControllerCrud({ service: midiaService, nome: "Mídia", feminino: true });

    // GET /api/midia/servico/:id
    async function listarPorServico(req, res, next) {
        try {
            const dados = await midiaService.listarPorServico(req.params.id);
            res.status(200).json({ sucesso: true, dados });
        } catch (erro) {
            responderErro(erro, res, next);
        }
    }

    return { ...crud, listarPorServico };
}
