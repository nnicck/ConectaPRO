export default class Servico {
    constructor({ id_servico, titulo, categoria, tipo_servico, tag, descricao, tempo_prestacao, preco, id_profissional }) {
        if (!Number.isInteger(id_servico) || id_servico <= 0) {
            throw new TypeError("O número deve ser inteiro e positivo");
        }

        if (typeof titulo !== "string" || titulo.trim() === "") {
            throw new TypeError("Título é obrigatório");
        }

        if (typeof categoria !== "string" || categoria.trim() === "") {
            throw new TypeError("Categoria é obrigatória");
        }

        if (typeof tipo_servico !== "string" || tipo_servico.trim() === "") {
            throw new TypeError("Tipo de serviço é obrigatório");
        }

        if (!Number.isFinite(Number(preco)) || Number(preco) < 0) {
            throw new TypeError("Preço deve ser um número maior ou igual a zero");
        }

        if (!Number.isInteger(id_profissional) || id_profissional <= 0) {
            throw new TypeError("ID do profissional deve ser inteiro e positivo");
        }

        if (tag !== null && tag !== undefined && (typeof tag !== "string" || tag.trim() === "")) {
            throw new TypeError("Tag deve ser um texto válido");
        }

        if (descricao !== null && descricao !== undefined && typeof descricao !== "string") {
            throw new TypeError("Descrição deve ser um texto válido");
        }

        if (tempo_prestacao !== null && tempo_prestacao !== undefined && (typeof tempo_prestacao !== "string" || tempo_prestacao.trim() === "")) {
            throw new TypeError("Tempo de prestação deve ser um texto válido");
        }

        this.id_servico = id_servico;
        this.titulo = titulo;
        this.categoria = categoria;
        this.tipo_servico = tipo_servico;
        this.tag = tag ?? null;
        this.descricao = descricao ?? null;
        this.tempo_prestacao = tempo_prestacao ?? null;
        this.preco = Number(preco);
        this.id_profissional = id_profissional;
    }
}