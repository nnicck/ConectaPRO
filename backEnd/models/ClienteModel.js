// pool = conexões do MySQL,
export function criarClienteModel({ pool }){

    async function listarTodos(){
        const [linhas] = await pool.query("SELECT * FROM clientes");
        return linhas.map(c => ({...c}));
    }

    async function buscarPorId(id){
        const [linhas] = await pool.query("SELECT * FROM clientes WHERE id_cliente = ?", [id]);

        if(linhas.length === 0){
            return null;
        }

        return {...linhas[0]};
    }

    async function criar(cliente){
        const sql = "INSERT INTO clientes(nome, email, telefone, senha, foto) VALUES(?, ?, ?, ?, ?)";

        const valores = [
            cliente.nome,
            cliente.email,
            cliente.telefone,
            cliente.senha,
            cliente.foto
        ];

        const [resultado] = await pool.query(sql, valores);
        return {...cliente, id_cliente:resultado.insertId};
    }

    async function deletarPorId(id) {
        const [resultado] = await pool.query("DELETE FROM clientes WHERE id_cliente = ?", [id]);

        if (resultado.affectedRows === 0) { //Verifica se teve alguma linha afetada
            return null;
        }

        return true;
    }

    async function atualizar(id, cliente) {
        const sql = "UPDATE clientes SET nome = ?, email = ?, telefone = ?, senha = ?, foto = ? WHERE id_cliente = ?";

        const valores = [
            cliente.nome,
            cliente.email,
            cliente.telefone,
            cliente.senha,
            cliente.foto,
            id
        ];

        const [resultado] = await pool.query(sql, valores);

        if (resultado.affectedRows === 0) { //Verifica se é o mesmo valor do registro
            const existente = await buscarPorId(id); //Verifica existencia
            if (!existente) { //Se não existir volta null
                return null;
            }
        }

        return { ...cliente, id_cliente: Number(id) };
    }

    return {listarTodos, buscarPorId, criar, deletarPorId, atualizar};
}