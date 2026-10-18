import Midia from "../models/Midia.js";

export function criarMidiaService({ midiaModel }) {
    async function listar() {
        return midiaModel.listarTodos();
    }

    async function buscarPorId(idRecebido) {
        const id = Number(idRecebido);

        if (!Number.isInteger(id) || id <= 0) {
            throw new Error("ID deve ser um número inteiro positivo");
        }

        const midia = await midiaModel.buscarPorId(id);

        if (!midia) {
            throw new Error(`Mídia ${id} não encontrada`);
        }

        return midia;
    }

    async function deletarPorId(idRecebido) {
        const id = Number(idRecebido);

        if (!Number.isInteger(id) || id <= 0) {
            throw new Error("ID deve ser um número inteiro positivo");
        }

        const deletado = await midiaModel.deletarPorId(id);

        if (!deletado) {
            throw new Error(`Mídia ${id} não encontrada`);
        }

        // Retorna true pois a mídia foi deletada com sucesso
        return true;
    }

    async function criar(dados) {
        const midia = new Midia({ id_midia: 1, ...dados });

        return midiaModel.criar({
            tipo: midia.tipo,
            midia: midia.midia,
            id_servico: midia.id_servico
        });
    }

    async function atualizar(idRecebido, dados) {
        const id = Number(idRecebido);

        if (!Number.isInteger(id) || id <= 0) {
            throw new Error("ID deve ser um número inteiro positivo");
        }

        const midiaExistente = await midiaModel.buscarPorId(id);

        if (!midiaExistente) {
            throw new Error(`Mídia ${id} não encontrada`);
        }

        const midia = new Midia({ id_midia: id, ...dados });

        return midiaModel.atualizar(id, {
            tipo: midia.tipo,
            midia: midia.midia,
            id_servico: midia.id_servico
        });
    }

    return { listar, buscarPorId, criar, deletarPorId, atualizar };
}