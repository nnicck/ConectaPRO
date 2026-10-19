export default class Profissional {
    constructor({id_profissional, nome, email, telefone, senha, foto, localizacao, profissao, visao_geral, idioma, data_ingresso, saldo}){
        if(!Number.isInteger(id_profissional) || id_profissional <= 0){
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

        if(foto !== null && (typeof foto !== "string" || foto.trim() === "")){
            throw new TypeError("Foto deve ser um endereço válido");
        }

        if(typeof profissao !== "string" || profissao.trim() === ""){
            throw new TypeError("Profissão é obrigatória");
        }

        // if(typeof data_ingresso !== "string" || data_ingresso.trim() === ""){
        //     throw new TypeError("Data de ingresso é obrigatória");
        // }

        if (!Number.isFinite(Number(saldo)) || Number(saldo) < 0){
            throw new TypeError("Saldo deve ser um número maior ou igual a zero");
        }

        this.id_profissional = id_profissional;
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.senha = senha;
        this.foto = foto;
        this.foto = foto ?? null;
        this.localizacao = localizacao ?? null;
        this.profissao = profissao;
        this.visao_geral = visao_geral ?? null;
        this.idioma = idioma ?? null;
        this.data_ingresso = data_ingresso ?? null;
        this.saldo = saldo;
    }
}