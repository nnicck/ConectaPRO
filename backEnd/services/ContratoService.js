import Contrato from "../models/Contrato.js";

export function criarContratoService({ contratoModel }) {
    async function listar() {
        return contratoModel.listarTodos();
    }

    async function buscarPorId(idRecebido) {
        const id = Number(idRecebido);

        if (!Number.isInteger(id) || id <= 0) {
            throw new Error("ID deve ser um número inteiro positivo");
        }

        const contrato = await contratoModel.buscarPorId(id);

        if (!contrato) {
            throw new Error(`Contrato ${id} não encontrado`);
        }

        return contrato;
    }

    async function deletarPorId(idRecebido) {
        const id = Number(idRecebido);

        if (!Number.isInteger(id) || id <= 0) {
            throw new Error("ID deve ser um número inteiro positivo");
        }

        const deletado = await contratoModel.deletarPorId(id);

        if (!deletado) {
            throw new Error(`Contrato ${id} não encontrado`);
        }

        // Retorna true pois o contrato foi deletado com sucesso
        return true;
    }

    async function criar(dados) {
        const contrato = new Contrato({ id_contrato: 1, ...dados });

        return contratoModel.criar({
            data_contrato: contrato.data_contrato,
            local: contrato.local,
            observacao: contrato.observacao,
            data_conclusao: contrato.data_conclusao,
            status: contrato.status,
            id_cliente: contrato.id_cliente,
            id_profissional: contrato.id_profissional,
            id_servico: contrato.id_servico
        });
    }

    async function atualizar(idRecebido, dados) {
        const id = Number(idRecebido);

        if (!Number.isInteger(id) || id <= 0) {
            throw new Error("ID deve ser um número inteiro positivo");
        }

        const contratoExistente = await contratoModel.buscarPorId(id);

        if (!contratoExistente) {
            throw new Error(`Contrato ${id} não encontrado`);
        }

        const contrato = new Contrato({ id_contrato: id, ...dados });

        return contratoModel.atualizar(id, {
            data_contrato: contrato.data_contrato,
            local: contrato.local,
            observacao: contrato.observacao,
            data_conclusao: contrato.data_conclusao,
            status: contrato.status,
            id_cliente: contrato.id_cliente,
            id_profissional: contrato.id_profissional,
            id_servico: contrato.id_servico
        });
    }

    return { listar, buscarPorId, criar, deletarPorId, atualizar };
}