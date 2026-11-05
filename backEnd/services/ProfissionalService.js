// Regras de negócio dos profissionais (validação + nunca devolver a senha).

import Profissional from "../models/Profissional.js";
import { hoje, lerId, mesclar, semSenha } from "../utils/auxiliares.js";

export function criarProfissionalService({ profissionalModel }) {
    async function listar() {
        const profissionais = await profissionalModel.listarTodos();
        return profissionais.map(semSenha);
    }

    async function buscarPorId(idRecebido) {
        const id = lerId(idRecebido);
        const profissional = await profissionalModel.buscarPorId(id);

        if (!profissional) {
            throw new Error(`Profissional ${id} não encontrado`);
        }

        return semSenha(profissional);
    }

    async function deletarPorId(idRecebido) {
        const id = lerId(idRecebido);
        const deletado = await profissionalModel.deletarPorId(id);

        if (!deletado) {
            throw new Error(`Profissional ${id} não encontrado`);
        }

        return true;
    }

    // Novo profissional entra com data de hoje e saldo zero (se não forem informados)
    async function criar(dados) {
        const profissional = new Profissional({
            ...dados,
            id_profissional: 1,
            data_ingresso: dados.data_ingresso || hoje(),
            saldo: dados.saldo ?? 0
        });
        const { id_profissional, ...campos } = profissional;

        return semSenha(await profissionalModel.criar(campos));
    }

    // Só os campos enviados são alterados. Senha vazia = mantém a senha atual.
    async function atualizar(idRecebido, dados) {
        const id = lerId(idRecebido);
        const existente = await profissionalModel.buscarPorId(id);

        if (!existente) {
            throw new Error(`Profissional ${id} não encontrado`);
        }

        if (!dados.senha) delete dados.senha;

        const profissional = new Profissional({ ...mesclar(existente, dados), id_profissional: id });
        const { id_profissional, ...campos } = profissional;

        return semSenha(await profissionalModel.atualizar(id, campos));
    }

    return { listar, buscarPorId, criar, deletarPorId, atualizar };
}
