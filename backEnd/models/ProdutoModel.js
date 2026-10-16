// pool = conexões do MySQL,
export function criarProdutoModel({ pool }){

    async function listarTodos(){
        const [linhas] = await pool.query("SELECT * FROM produtos");
        return linhas.map(p => ({...p, preco: Number(p.preco)}));
    }

    async function buscarPorId(id){
        const [linhas] = await pool.query("SELECT * FROM produtos WHERE id = ?", [id]);

        if(linhas.length === 0){
            return null;
        }

        return {...linhas[0], preco: Number(linhas[0].preco)};
    }

    async function criar(produto){
        const sql = "INSERT INTO produtos(nome, preco, estoque, categoria) VALUES(?, ?, ?, ?)";
        const valores = [produto.nome, produto.preco, produto.estoque, produto.categoria];
        const [resultado] = await pool.query(sql, valores);
        return {...produto, id:resultado.insertId};
    }

    async function deletarPorId(id) {
        const [resultado] = await pool.query("DELETE FROM produtos WHERE id = ?", [id]);

        if (resultado.affectedRows === 0) { //Verifica se teve alguma linha afetada
            return null;
        }

        return true;
    }

    async function atualizar(id, produto) {
        const sql = "UPDATE produtos SET nome = ?, preco = ?, estoque = ?, categoria = ? WHERE id = ?";

        const valores = [produto.nome, produto.preco, produto.estoque, produto.categoria, id];
        const [resultado] = await pool.query(sql, valores);

        if (resultado.affectedRows === 0) { //Verifica se é o mesmo valor do registro
            const existente = await buscarPorId(id); //Verifica existencia
            if (!existente) { //Se não existir volta null
                return null;
            }
        }

        return { ...produto, id: Number(id) };
    }

    return {listarTodos, buscarPorId, criar, deletarPorId, atualizar};
}