export default class Avaliacao {
    constructor({ id_avaliacao, estrelas, comentario, data_avaliacao, id_servico }) {
        if (!Number.isInteger(id_avaliacao) || id_avaliacao <= 0) {
            throw new TypeError("O número deve ser inteiro e positivo");
        }

        if (!Number.isFinite(estrelas) || estrelas < 1 || estrelas > 5) {
            throw new RangeError("A avaliação deve ser entre 1 e 5 estrelas");
        }

        if (comentario !== null && comentario !== undefined && typeof comentario !== "string") {
            throw new TypeError("Comentário deve ser um texto válido");
        }

        if (typeof data_avaliacao !== "string" || data_avaliacao.trim() === "") {
            throw new TypeError("Data da avaliação é obrigatória");
        }

        if (!Number.isInteger(id_servico) || id_servico <= 0) {
            throw new TypeError("ID do serviço deve ser inteiro e positivo");
        }

        this.id_avaliacao = id_avaliacao;
        this.estrelas = estrelas;
        this.comentario = comentario ?? null;
        this.data_avaliacao = data_avaliacao;
        this.id_servico = id_servico;
    }
}