// Regras do login: procura o e-mail na tabela do tipo escolhido e confere a senha.

import { erroValidacao } from "../utils/responderErro.js";

export function criarAutenticarService({ clienteModel, profissionalModel }) {
    // tipo ("cliente" ou "profissional") é opcional: se vier, procura só naquela tabela
    async function login({ email, senha, tipo }) {
        if (!email || !senha) {
            throw erroValidacao("Informe e-mail e senha");
        }

        const encontrados = [];

        if (tipo !== "profissional") {
            const cliente = await clienteModel.buscarPorEmail(email.trim());

            if (cliente && cliente.senha === senha) {
                encontrados.push({ id: cliente.id_cliente, nome: cliente.nome, email: cliente.email, foto: cliente.foto, tipo: "cliente" });
            }
        }

        if (tipo !== "cliente") {
            const profissional = await profissionalModel.buscarPorEmail(email.trim());

            if (profissional && profissional.senha === senha) {
                encontrados.push({ id: profissional.id_profissional, nome: profissional.nome, email: profissional.email, foto: profissional.foto, tipo: "profissional" });
            }
        }

        if (encontrados.length !== 1) {
            throw new Error("E-mail ou senha inválidos");
        }

        return encontrados[0];
    }

    return { login };
}
