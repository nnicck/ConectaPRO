export default class Cliente {
    constructor({id_cliente, nome, email, telefone, senha, foto}){
        if(!Number.isInteger(id_cliente) || id_cliente <= 0){
            throw new TypeError("O número deve ser inteiro e positivo");
        }

        if(typeof nome !== "string" || nome.trim() === ""){
            throw new TypeError("Nome é obrigatório");
        }

        if(typeof email !== "string" || email.trim() === ""){
            throw new TypeError("E-mail é obrigatório");
        }

        if(typeof telefone !== "string" || telefone.trim() === ""){
            throw new TypeError("Telefone é obrigatório");
        }

        if(typeof senha !== "string" || senha.trim() === ""){
            throw new TypeError("Senha é obrigatória");
        }

        if (foto !== null && (typeof foto !== "string" || foto.trim() === "")) {
            throw new TypeError("Foto deve ser um endereço válido");
        }

        this.id_cliente = id_cliente;
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.senha = senha;
        this.foto = foto ?? null;
    }
}