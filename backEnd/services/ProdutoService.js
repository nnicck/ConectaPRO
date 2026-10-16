import Produto from "../models/Produto.js";

export function criarProdutoService({ produtoModel }){
    async function listar(){
        return produtoModel.listarTodos();
    }

    async function buscarPorId(idRecebido){
        const id = Number(idRecebido);
        
        if(!Number.isInteger(id) || id <= 0){
            throw new Error("ID deve ser um número inteiro positivo");
        }

        const produto = await produtoModel.buscarPorId(id);
        
        if(!produto){
            throw new Error(`Produto ${id} não encontrado`);
        }

        return produto;
    }

    async function deletarPorId(idRecebido) {
        const id = Number(idRecebido);

        if (!Number.isInteger(id) || id <= 0) {
            throw new Error("ID deve ser um número inteiro positivo");
        }

        const deletado = await produtoModel.deletarPorId(id);

        if (!deletado) {
            throw new Error(`Produto ${id} não encontrado`);
        }

        //Lança true pois, o produto foi deletado com sucesso
        return true;
    }

    async function criar(dados){
        const produto = new Produto({ id: 1,  ...dados});

        return produtoModel.criar({
            nome: produto.nome,
            preco: produto.preco,
            estoque: produto.estoque,
            categoria: produto.categoria
        });
    }

    async function atualizar(idRecebido, dados) {
        const id = Number(idRecebido);

        if (!Number.isInteger(id) || id <= 0) {
            throw new Error("ID deve ser um número inteiro positivo");
        }

        const produtoExistente = await produtoModel.buscarPorId(id);

        if (!produtoExistente) {
            throw new Error(`Produto ${id} não encontrado`);
        }

        const produto = new Produto({ id, ...dados });

        return produtoModel.atualizar(id, {
            nome: produto.nome,
            preco: produto.preco,
            estoque: produto.estoque,
            categoria: produto.categoria
        });
    }

    return {listar, buscarPorId, criar, deletarPorId, atualizar };
}