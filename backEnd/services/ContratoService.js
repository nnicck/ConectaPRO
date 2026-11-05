// Regras de negócio dos contratos: quem pode fazer o quê e em qual status.

import Contrato from "../models/Contrato.js";
import { hoje, lerId, mesclar } from "../utils/auxiliares.js";
import { erroValidacao } from "../utils/responderErro.js";

// Nestes status o serviço não pode mais ser cancelado
const STATUS_NAO_CANCELAVEIS = ["concluído", "cancelado", "recusado"];

// Ações que o profissional pode fazer: de qual status sai -> para qual status vai
const ACOES_PROFISSIONAL = {
    aceitar:  { de: ["pendente"], para: "aceito" },
    recusar:  { de: ["pendente"], para: "recusado" },
    iniciar:  { de: ["aceito"], para: "em andamento" },
    concluir: { de: ["aceito", "em andamento"], para: "concluído" }
};

export function criarContratoService({ contratoModel, servicoModel, profissionalModel }) {
    async function listar() {
        return contratoModel.listarTodos();
    }

    async function buscarPorId(idRecebido) {
        const id = lerId(idRecebido);
        const contrato = await contratoModel.buscarPorId(id);

        if (!contrato) {
            throw new Error(`Contrato ${id} não encontrado`);
        }

        return contrato;
    }

    async function deletarPorId(idRecebido) {
        const id = lerId(idRecebido);
        const deletado = await contratoModel.deletarPorId(id);

        if (!deletado) {
            throw new Error(`Contrato ${id} não encontrado`);
        }

        return true;
    }

    async function criar(dados) {
        const contrato = new Contrato({ ...dados, id_contrato: 1 });
        const { id_contrato, ...campos } = contrato;

        return contratoModel.criar(campos);
    }

    async function atualizar(idRecebido, dados) {
        const id = lerId(idRecebido);
        const existente = await contratoModel.buscarPorId(id);

        if (!existente) {
            throw new Error(`Contrato ${id} não encontrado`);
        }

        const contrato = new Contrato({ ...mesclar(existente, dados), id_contrato: id });
        const { id_contrato, ...campos } = contrato;

        return contratoModel.atualizar(id, campos);
    }

    // Contratos do usuário logado (cliente vê os que pediu, profissional vê os que recebeu)
    async function listarMeus(usuario) {
        return contratoModel.listarDoUsuario(usuario.tipo, usuario.id);
    }

    // Cliente logado pede um serviço. O profissional vem do próprio serviço.
    async function solicitar({ id_servico, data_contrato, local, observacao }, usuario) {
        if (usuario?.tipo !== "cliente") {
            throw new Error("Acesso negado: apenas clientes podem solicitar serviços");
        }

        if (!data_contrato) {
            throw erroValidacao("Informe a data desejada para o serviço");
        }

        if (data_contrato < hoje()) {
            throw erroValidacao("A data do serviço não pode estar no passado");
        }

        const servico = await servicoModel.buscarPorId(lerId(id_servico));

        if (!servico) {
            throw new Error(`Serviço ${id_servico} não encontrado`);
        }

        return criar({
            data_contrato,
            local,
            observacao,
            status: "pendente",
            id_cliente: usuario.id,
            id_profissional: servico.id_profissional,
            id_servico: servico.id_servico
        });
    }

    // Só o cliente ou o profissional do contrato podem ver o acompanhamento
    async function buscarAcompanhamento(idRecebido, usuario) {
        const id = lerId(idRecebido);
        const acompanhamento = await contratoModel.buscarAcompanhamento(id);

        if (!acompanhamento) {
            throw new Error(`Contrato ${id} não encontrado`);
        }

        const ehCliente = usuario?.tipo === "cliente" && acompanhamento.id_cliente === usuario.id;
        const ehProfissional = usuario?.tipo === "profissional" && acompanhamento.id_profissional === usuario.id;

        if (!ehCliente && !ehProfissional) {
            throw new Error("Acesso negado: este contrato não pertence a você");
        }

        return acompanhamento;
    }

    // Cancelar não apaga nada: só muda o status para "cancelado"
    async function cancelar(idRecebido, usuario) {
        const contrato = await buscarPorId(idRecebido);

        if (usuario?.tipo !== "cliente" || contrato.id_cliente !== usuario.id) {
            throw new Error("Acesso negado: este contrato não pertence a você");
        }

        if (STATUS_NAO_CANCELAVEIS.includes(contrato.status)) {
            throw new Error(`Não é possível cancelar um serviço ${contrato.status}`);
        }

        await contratoModel.atualizarStatus(contrato.id_contrato, "cancelado");

        return { ...contrato, status: "cancelado" };
    }

    // Profissional aceita, recusa, inicia ou conclui um contrato dele.
    // Ao concluir, grava a data de conclusão e soma o valor do serviço ao saldo.
    async function mudarStatus(idRecebido, acao, usuario) {
        const regra = ACOES_PROFISSIONAL[acao];

        if (!regra) {
            throw erroValidacao(`Ação inválida. Use: ${Object.keys(ACOES_PROFISSIONAL).join(", ")}`);
        }

        const contrato = await buscarPorId(idRecebido);

        if (usuario?.tipo !== "profissional" || contrato.id_profissional !== usuario.id) {
            throw new Error("Acesso negado: este contrato não pertence a você");
        }

        if (!regra.de.includes(contrato.status)) {
            throw new Error(`Não é possível ${acao} um serviço com status "${contrato.status}"`);
        }

        const dataConclusao = regra.para === "concluído" ? hoje() : contrato.data_conclusao;
        await contratoModel.atualizarStatus(contrato.id_contrato, regra.para, dataConclusao);

        if (regra.para === "concluído") {
            const servico = await servicoModel.buscarPorId(contrato.id_servico);
            await profissionalModel.somarSaldo(contrato.id_profissional, servico?.preco ?? 0);
        }

        return { ...contrato, status: regra.para, data_conclusao: dataConclusao };
    }

    return {
        listar, buscarPorId, criar, deletarPorId, atualizar,
        listarMeus, solicitar, buscarAcompanhamento, cancelar, mudarStatus
    };
}
