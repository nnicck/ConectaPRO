export default class Midia {
    constructor({ id_midia, tipo, midia, id_servico }) {
        if (!Number.isInteger(id_midia) || id_midia <= 0) {
            throw new TypeError("O número deve ser inteiro e positivo");
        }

        if (typeof tipo !== "string" || tipo.trim() === "") {
            throw new TypeError("Tipo de mídia é obrigatório");
        }

        if (typeof midia !== "string" || midia.trim() === "") {
            throw new TypeError("Endereço da mídia é obrigatório");
        }

        if (!Number.isInteger(id_servico) || id_servico <= 0) {
            throw new TypeError("ID do serviço deve ser inteiro e positivo");
        }

        this.id_midia = id_midia;
        this.tipo = tipo;
        this.midia = midia;
        this.id_servico = id_servico;
    }
}