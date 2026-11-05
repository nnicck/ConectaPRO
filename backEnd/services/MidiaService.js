// Regras de negócio das mídias (fotos dos serviços).

import Midia from "../models/Midia.js";
import { lerId, mesclar } from "../utils/auxiliares.js";

export function criarMidiaService({ midiaModel }) {
    async function listar() {
        return midiaModel.listarTodos();
    }

    async function listarPorServico(idRecebido) {
        return midiaModel.listarPorServico(lerId(idRecebido));
    }

    async function buscarPorId(idRecebido) {
        const id = lerId(idRecebido);
        const midia = await midiaModel.buscarPorId(id);

        if (!midia) {
            throw new Error(`Mídia ${id} não encontrada`);
        }

        return midia;
    }

    async function deletarPorId(idRecebido) {
        const id = lerId(idRecebido);
        const deletado = await midiaModel.deletarPorId(id);

        if (!deletado) {
            throw new Error(`Mídia ${id} não encontrada`);
        }

        return true;
    }

    async function criar(dados) {
        const midia = new Midia({ ...dados, id_midia: 1 });
        const { id_midia, ...campos } = midia;

        return midiaModel.criar(campos);
    }

    async function atualizar(idRecebido, dados) {
        const id = lerId(idRecebido);
        const existente = await midiaModel.buscarPorId(id);

        if (!existente) {
            throw new Error(`Mídia ${id} não encontrada`);
        }

        const midia = new Midia({ ...mesclar(existente, dados), id_midia: id });
        const { id_midia, ...campos } = midia;

        return midiaModel.atualizar(id, campos);
    }

    return { listar, listarPorServico, buscarPorId, criar, deletarPorId, atualizar };
}
