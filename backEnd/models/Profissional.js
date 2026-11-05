// Classe de validação do profissional: se algum campo estiver errado, lança um erro (vira status 400).

import { dataValida } from "../utils/auxiliares.js";

export default class Profissional {
    constructor({id_profissional, nome, email, telefone, senha, foto, localizacao, profissao, visao_geral, idioma, data_ingresso, saldo}){
        if(!Number.isInteger(id_profissional) || id_profissional <= 0){
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
        if(foto && typeof foto !== "string"){
            throw new TypeError("Foto deve ser um endereço válido");
        }

        if(typeof profissao !== "string" || profissao.trim() === ""){
            throw new TypeError("Profissão é obrigatória");
        }

        if(!dataValida(data_ingresso)){
            throw new TypeError("Data de ingresso é obrigatória (formato AAAA-MM-DD)");
        }

        if (!Number.isFinite(Number(saldo)) || Number(saldo) < 0){
            throw new TypeError("Saldo deve ser um número maior ou igual a zero");
        }

        this.id_profissional = id_profissional;
        this.nome = nome.trim();
        this.email = email.trim();
        this.telefone = telefone.trim();
        this.senha = senha;
        this.foto = foto || null;
        this.localizacao = localizacao || null;
        this.profissao = profissao.trim();
        this.visao_geral = visao_geral || null;
        this.idioma = idioma || null;
        this.data_ingresso = data_ingresso;
        this.saldo = Number(saldo);
    }
}
