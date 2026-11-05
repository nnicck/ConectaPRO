// Regras de negócio dos clientes (validação + nunca devolver a senha).

import Cliente from "../models/Cliente.js";
import { lerId, mesclar, semSenha } from "../utils/auxiliares.js";

export function criarClienteService({ clienteModel }) {
    async function listar() {
        const clientes = await clienteModel.listarTodos();
        return clientes.map(semSenha);
    }

    async function buscarPorId(idRecebido) {
        const id = lerId(idRecebido);
        const cliente = await clienteModel.buscarPorId(id);

        if (!cliente) {
            throw new Error(`Cliente ${id} não encontrado`);
        }

        return semSenha(cliente);
    }

    async function deletarPorId(idRecebido) {
        const id = lerId(idRecebido);
        const deletado = await clienteModel.deletarPorId(id);

        if (!deletado) {
            throw new Error(`Cliente ${id} não encontrado`);
        }

        return true;
    }

    async function criar(dados) {
        const cliente = new Cliente({ ...dados, id_cliente: 1 });
        const { id_cliente, ...campos } = cliente;

        return semSenha(await clienteModel.criar(campos));
    }

    // Só os campos enviados são alterados. Senha vazia = mantém a senha atual.
    async function atualizar(idRecebido, dados) {
        const id = lerId(idRecebido);
        const existente = await clienteModel.buscarPorId(id);

        if (!existente) {
            throw new Error(`Cliente ${id} não encontrado`);
        }

        if (!dados.senha) delete dados.senha;

        const cliente = new Cliente({ ...mesclar(existente, dados), id_cliente: id });
        const { id_cliente, ...campos } = cliente;

        return semSenha(await clienteModel.atualizar(id, campos));
    }

    return { listar, buscarPorId, criar, deletarPorId, atualizar };
}
