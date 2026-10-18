import Servico from "../models/Servico.js";

export function criarServicoService({ servicoModel }) {
    async function listar() {
        return servicoModel.listarTodos();
    }

    async function buscarPorId(idRecebido) {
        const id = Number(idRecebido);

        if (!Number.isInteger(id) || id <= 0) {
            throw new Error("ID deve ser um número inteiro positivo");
        }

        const servico = await servicoModel.buscarPorId(id);

        if (!servico) {
            throw new Error(`Serviço ${id} não encontrado`);
        }

        return servico;
    }

    async function deletarPorId(idRecebido) {
        const id = Number(idRecebido);

        if (!Number.isInteger(id) || id <= 0) {
            throw new Error("ID deve ser um número inteiro positivo");
        }

        const deletado = await servicoModel.deletarPorId(id);

        if (!deletado) {
            throw new Error(`Serviço ${id} não encontrado`);
        }

        // Retorna true pois o serviço foi deletado com sucesso
        return true;
    }

    async function criar(dados) {
        const servico = new Servico({ id_servico: 1, ...dados });

        return servicoModel.criar({
            titulo: servico.titulo,
            categoria: servico.categoria,
            tipo_servico: servico.tipo_servico,
            tag: servico.tag,
            descricao: servico.descricao,
            tempo_prestacao: servico.tempo_prestacao,
            preco: servico.preco,
            id_profissional: servico.id_profissional
        });
    }

    async function atualizar(idRecebido, dados) {
        const id = Number(idRecebido);

        if (!Number.isInteger(id) || id <= 0) {
            throw new Error("ID deve ser um número inteiro positivo");
        }

        const servicoExistente = await servicoModel.buscarPorId(id);

        if (!servicoExistente) {
            throw new Error(`Serviço ${id} não encontrado`);
        }

        const servico = new Servico({ id_servico: id, ...dados });

        return servicoModel.atualizar(id, {
            titulo: servico.titulo,
            categoria: servico.categoria,
            tipo_servico: servico.tipo_servico,
            tag: servico.tag,
            descricao: servico.descricao,
            tempo_prestacao: servico.tempo_prestacao,
            preco: servico.preco,
            id_profissional: servico.id_profissional
        });
    }

    return { listar, buscarPorId, criar, deletarPorId, atualizar };
}