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

    return { listar, buscarPorId, criar, deletarPorId, atualizar, pesquisar, listarCategorias };
}