import Profissional from "../models/Profissional.js";

export function criarProfissionalService({ profissionalModel }) {
    async function listar() {
        return profissionalModel.listarTodos();
    }

    async function buscarPorId(idRecebido) {
        const id = Number(idRecebido);

        if (!Number.isInteger(id) || id <= 0) {
            throw new Error("ID deve ser um número inteiro positivo");
        }

        const profissional = await profissionalModel.buscarPorId(id);

        if (!profissional) {
            throw new Error(`Profissional ${id} não encontrado`);
        }

        return profissional;
    }

    async function deletarPorId(idRecebido) {
        const id = Number(idRecebido);

        if (!Number.isInteger(id) || id <= 0) {
            throw new Error("ID deve ser um número inteiro positivo");
        }

        const deletado = await profissionalModel.deletarPorId(id);

        if (!deletado) {
            throw new Error(`Profissional ${id} não encontrado`);
        }

        // Retorna true pois o profissional foi deletado com sucesso
        return true;
    }

    async function criar(dados) {
        const profissional = new Profissional({ id_profissional: 1, ...dados });

        return profissionalModel.criar({
            nome: profissional.nome,
            email: profissional.email,
            telefone: profissional.telefone,
            senha: profissional.senha,
            foto: profissional.foto,
            localizacao: profissional.localizacao,
            profissao: profissional.profissao,
            visao_geral: profissional.visao_geral,
            idioma: profissional.idioma,
            data_ingresso: profissional.data_ingresso,
            saldo: profissional.saldo
        });
    }

    async function atualizar(idRecebido, dados) {
        const id = Number(idRecebido);

        if (!Number.isInteger(id) || id <= 0) {
            throw new Error("ID deve ser um número inteiro positivo");
        }

        const profissionalExistente = await profissionalModel.buscarPorId(id);

        if (!profissionalExistente) {
            throw new Error(`Profissional ${id} não encontrado`);
        }

        const profissional = new Profissional({ id_profissional: id, ...dados });

        return profissionalModel.atualizar(id, {
            nome: profissional.nome,
            email: profissional.email,
            telefone: profissional.telefone,
            senha: profissional.senha,
            foto: profissional.foto,
            localizacao: profissional.localizacao,
            profissao: profissional.profissao,
            visao_geral: profissional.visao_geral,
            idioma: profissional.idioma,
            data_ingresso: profissional.data_ingresso,
            saldo: profissional.saldo
        });
    }

    return { listar, buscarPorId, criar, deletarPorId, atualizar };
}