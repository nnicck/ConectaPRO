// Classe de validação do cliente: se algum campo estiver errado, lança um erro (vira status 400).

export default class Cliente {
    constructor({id_cliente, nome, email, telefone, localizacao, senha, foto}){
        if(!Number.isInteger(id_cliente) || id_cliente <= 0){
            throw new TypeError("O número deve ser inteiro e positivo");
        }

        if(typeof nome !== "string" || nome.trim() === ""){
            throw new TypeError("Nome é obrigatório");
        }

        if(typeof email !== "string" || !email.includes("@")){
            throw new TypeError("E-mail válido é obrigatório");
        }

        if(typeof telefone !== "string" || telefone.trim() === ""){
            throw new TypeError("Telefone é obrigatório");
        }

        if(typeof senha !== "string" || senha.trim() === ""){
            throw new TypeError("Senha é obrigatória");
        }

        // foto é opcional: null, undefined ou "" viram null
        if (foto && typeof foto !== "string") {
            throw new TypeError("Foto deve ser um endereço válido");
        }

        this.id_cliente = id_cliente;
        this.nome = nome.trim();
        this.email = email.trim();
        this.telefone = telefone.trim();
        this.localizacao = localizacao || null;
        this.senha = senha;
        this.foto = foto || null;
    }
}
