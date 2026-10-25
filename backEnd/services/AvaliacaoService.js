import Avaliacao from "../models/Avaliacao.js";

export function criarAvaliacaoService({ avaliacaoModel }) {
    async function listar() {
        return avaliacaoModel.listarTodos();
    }

    async function buscarPorId(idRecebido) {
        const id = Number(idRecebido);

        if (!Number.isInteger(id) || id <= 0) {
            throw new Error("ID deve ser um número inteiro positivo");
        }

        const avaliacao = await avaliacaoModel.buscarPorId(id);

        if (!avaliacao) {
            throw new Error(`Avaliação ${id} não encontrada`);
        }

        return avaliacao;
    }

    async function deletarPorId(idRecebido) {
        const id = Number(idRecebido);

        if (!Number.isInteger(id) || id <= 0) {
            throw new Error("ID deve ser um número inteiro positivo");
        }

        const deletada = await avaliacaoModel.deletarPorId(id);

        if (!deletada) {
            throw new Error(`Avaliação ${id} não encontrada`);
        }

        // Retorna true pois a avaliação foi deletada com sucesso
        return true;
    }

    async function criar(dados) {
        const avaliacao = new Avaliacao({ id_avaliacao: 1, ...dados });

        return avaliacaoModel.criar({
            estrelas: avaliacao.estrelas,
            comentario: avaliacao.comentario,
            data_avaliacao: avaliacao.data_avaliacao,
            id_servico: avaliacao.id_servico
        });
    }

    async function atualizar(idRecebido, dados) {
        const id = Number(idRecebido);

        if (!Number.isInteger(id) || id <= 0) {
            throw new Error("ID deve ser um número inteiro positivo");
        }

        const avaliacaoExistente = await avaliacaoModel.buscarPorId(id);

        if (!avaliacaoExistente) {
            throw new Error(`Avaliação ${id} não encontrada`);
        }

        const avaliacao = new Avaliacao({ id_avaliacao: id, ...dados });

        return avaliacaoModel.atualizar(id, {
            estrelas: avaliacao.estrelas,
            comentario: avaliacao.comentario,
            data_avaliacao: avaliacao.data_avaliacao,
            id_servico: avaliacao.id_servico
        });
    }

    return { listar, buscarPorId, criar, deletarPorId, atualizar };
}