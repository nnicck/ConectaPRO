// Ciclo de vida de um contrato:
// pendente -> aceito -> em andamento -> concluído
// pendente -> recusado (profissional)   |   pendente/aceito/em andamento -> cancelado (cliente)
import { dataValida } from "../utils/auxiliares.js";

export const STATUS_CONTRATO = ["pendente", "aceito", "em andamento", "concluído", "recusado", "cancelado"];

export default class Contrato {
    constructor({ id_contrato, data_contrato, local, observacao, data_conclusao, status, id_cliente, id_profissional, id_servico }) {
        id_cliente = Number(id_cliente);
        id_profissional = Number(id_profissional);
        id_servico = Number(id_servico);

        if (!Number.isInteger(id_contrato) || id_contrato <= 0) {
            throw new TypeError("O número deve ser inteiro e positivo");
        }

        if (!dataValida(data_contrato)) {
            throw new TypeError("Data do contrato é obrigatória (formato AAAA-MM-DD)");
        }

        if (local && typeof local !== "string") {
            throw new TypeError("Local deve ser um texto válido");
        }

        if (observacao && typeof observacao !== "string") {
            throw new TypeError("Observação deve ser um texto válido");
        }

        if (data_conclusao && !dataValida(data_conclusao)) {
            throw new TypeError("Data de conclusão deve ser válida");
        }

        if (!STATUS_CONTRATO.includes(status)) {
            throw new TypeError(`Status inválido. Use: ${STATUS_CONTRATO.join(", ")}`);
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
        this.local = local || null;
        this.observacao = observacao || null;
        this.data_conclusao = data_conclusao || null;
        this.status = status;
        this.id_cliente = id_cliente;
        this.id_profissional = id_profissional;
        this.id_servico = id_servico;
    }
}
