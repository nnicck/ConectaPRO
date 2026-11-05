// Classe de validação do serviço: se algum campo estiver errado, lança um erro (vira status 400).

export default class Servico {
    constructor({ id_servico, titulo, categoria, tipo_servico, tag, descricao, tempo_prestacao, preco, id_profissional }) {
        // ids podem chegar como texto vindo de formulários ("3"), então convertemos
        id_profissional = Number(id_profissional);

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

        if (preco === "" || preco === null || !Number.isFinite(Number(preco)) || Number(preco) < 0) {
            throw new TypeError("Preço deve ser um número maior ou igual a zero");
        }

        if (!Number.isInteger(id_profissional) || id_profissional <= 0) {
            throw new TypeError("ID do profissional deve ser inteiro e positivo");
        }

        if (tag && typeof tag !== "string") {
            throw new TypeError("Tag deve ser um texto válido");
        }

        if (descricao && typeof descricao !== "string") {
            throw new TypeError("Descrição deve ser um texto válido");
        }

        if (tempo_prestacao && typeof tempo_prestacao !== "string") {
            throw new TypeError("Tempo de prestação deve ser um texto válido");
        }

        this.id_servico = id_servico;
        this.titulo = titulo.trim();
        this.categoria = categoria.trim();
        this.tipo_servico = tipo_servico.trim();
        this.tag = tag || null;
        this.descricao = descricao || null;
        this.tempo_prestacao = tempo_prestacao || null;
        this.preco = Number(preco);
        this.id_profissional = id_profissional;
    }
}
