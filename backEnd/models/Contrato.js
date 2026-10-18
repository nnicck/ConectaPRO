export default class Contrato {
    constructor({ id_contrato, data_contrato, local, observacao, data_conclusao, status, id_cliente, id_profissional, id_servico }) {
        if (!Number.isInteger(id_contrato) || id_contrato <= 0) {
            throw new TypeError("O número deve ser inteiro e positivo");
        }

        if (typeof data_contrato !== "string" || data_contrato.trim() === "") {
            throw new TypeError("Data do contrato é obrigatória");
        }

        if (local !== null && local !== undefined && (typeof local !== "string" || local.trim() === "")) {
            throw new TypeError("Local deve ser um texto válido");
        }

        if (observacao !== null && observacao !== undefined && typeof observacao !== "string") {
            throw new TypeError("Observação deve ser um texto válido");
        }

        if (data_conclusao !== null && data_conclusao !== undefined && (typeof data_conclusao !== "string" || data_conclusao.trim() === "")) {
            throw new TypeError("Data de conclusão deve ser válida");
        }

        if (typeof status !== "string" || status.trim() === "") {
            throw new TypeError("Status é obrigatório");
        }

        if (!Number.isInteger(id_cliente) || id_cliente <= 0) {
            throw new TypeError("ID do cliente deve ser inteiro e positivo");
        }

        if (!Number.isInteger(id_profissional) || id_profissional <= 0) {
            throw new TypeError("ID do profissional deve ser inteiro e positivo");
        }

        if (!Number.isInteger(id_servico) || id_servico <= 0) {
            throw new TypeError("ID do serviço deve ser inteiro e positivo");
        }

        this.id_contrato = id_contrato;
        this.data_contrato = data_contrato;
        this.local = local ?? null;
        this.observacao = observacao ?? null;
        this.data_conclusao = data_conclusao ?? null;
        this.status = status;
        this.id_cliente = id_cliente;
        this.id_profissional = id_profissional;
        this.id_servico = id_servico;
    }
}