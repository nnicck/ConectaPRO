// Regras de negócio dos serviços: validação, detalhes e leitura dos filtros da busca.

import Servico from "../models/Servico.js";
import { lerId, mesclar, semSenha } from "../utils/auxiliares.js";

export function criarServicoService({ servicoModel, profissionalModel, midiaModel }) {
    async function listar() {
        return servicoModel.listarTodos();
    }

    async function buscarPorId(idRecebido) {
        const id = lerId(idRecebido);
        const servico = await servicoModel.buscarPorId(id);

        if (!servico) {
            throw new Error(`Serviço ${id} não encontrado`);
        }

        return servico;
    }

    // Serviço + profissional (sem senha) + todas as mídias. Usado na página de detalhes.
    async function buscarDetalhes(idRecebido) {
        const servico = await buscarPorId(idRecebido);
        const profissional = await profissionalModel.buscarPorId(servico.id_profissional);
        const midias = await midiaModel.listarPorServico(servico.id_servico);

        return { ...servico, profissional: semSenha(profissional), midias };
    }

    // Serviços de um profissional, já com imagem e nota (mesmo formato da busca)
    async function listarPorProfissional(idRecebido) {
        return servicoModel.pesquisar({ idProfissional: lerId(idRecebido) });
    }

    async function deletarPorId(idRecebido) {
        const id = lerId(idRecebido);
        const deletado = await servicoModel.deletarPorId(id);

        if (!deletado) {
            throw new Error(`Serviço ${id} não encontrado`);
        }

        return true;
    }

    async function criar(dados) {
        const servico = new Servico({ ...dados, id_servico: 1 });
        const { id_servico, ...campos } = servico;

        return servicoModel.criar(campos);
    }

    async function atualizar(idRecebido, dados) {
        const id = lerId(idRecebido);
        const existente = await servicoModel.buscarPorId(id);

        if (!existente) {
            throw new Error(`Serviço ${id} não encontrado`);
        }

        const servico = new Servico({ ...mesclar(existente, dados), id_servico: id });
        const { id_servico, ...campos } = servico;

        return servicoModel.atualizar(id, campos);
    }

    // Aceita valor único ou lista (?categoria=A&categoria=B) e devolve sempre uma lista de textos
    function paraLista(valor) {
        if (valor === undefined || valor === null || valor === "") {
            return [];
        }

        return (Array.isArray(valor) ? valor : [valor])
            .map(item => String(item).trim())
            .filter(item => item !== "");
    }

    // Converte "50-100" em { min: 50, max: 100 } e "100-" em { min: 100, max: null }
    function lerFaixa(texto) {
        const partes = texto.split("-");

        if (partes.length !== 2) {
            throw new TypeError(`Faixa de preço inválida: ${texto}`);
        }

        const min = Number(partes[0]);
        const max = partes[1] === "" ? null : Number(partes[1]);

        if (!Number.isFinite(min) || min < 0 || (max !== null && (!Number.isFinite(max) || max < min))) {
            throw new TypeError(`Faixa de preço inválida: ${texto}`);
        }

        return { min, max };
    }

    async function pesquisar(consulta = {}) {
        const termo = paraLista(consulta.termo)[0] ?? "";
        const localizacao = paraLista(consulta.localizacao)[0] ?? "";

        if (termo.length > 100 || localizacao.length > 100) {
            throw new TypeError("Termo e localização devem ter no máximo 100 caracteres");
        }

        return servicoModel.pesquisar({
            termo,
            localizacao,
            categorias: paraLista(consulta.categoria),
            faixas: paraLista(consulta.faixa).map(lerFaixa)
        });
    }

    async function listarCategorias() {
        return servicoModel.listarCategorias();
    }

    return {
        listar, buscarPorId, buscarDetalhes, listarPorProfissional,
        criar, deletarPorId, atualizar, pesquisar, listarCategorias
    };
}
