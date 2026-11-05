// =====================================================================
// ClienteModel — SQL da tabela "clientes"
// pool = conjunto de conexões com o MySQL (criado em config/database.js)
// =====================================================================
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
        const sql = "INSERT INTO clientes(nome, email, telefone, localizacao, senha, foto) VALUES(?, ?, ?, ?, ?, ?)";

        const valores = [
            cliente.nome,
            cliente.email,
            cliente.telefone,
            cliente.localizacao,
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
        const sql = "UPDATE clientes SET nome = ?, email = ?, telefone = ?, localizacao = ?, senha = ?, foto = ? WHERE id_cliente = ?";

        const valores = [
            cliente.nome,
            cliente.email,
            cliente.telefone,
            cliente.localizacao,
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

    async function buscarPorEmail(email) {
        const [linhas] = await pool.query("SELECT * FROM clientes WHERE email = ?", [email]);
        return linhas[0] ?? null;
    }

    return {listarTodos, buscarPorId, criar, deletarPorId, atualizar, buscarPorEmail};
}