// pool = conexões do MySQL,
export function criarServicoModel({ pool }){

    async function listarTodos(){
        const [linhas] = await pool.query("SELECT * FROM servicos");
        return linhas.map(s => ({...s, preco: Number(s.preco)}));
    }

    async function buscarPorId(id){
        const [linhas] = await pool.query("SELECT * FROM servicos WHERE id_servico = ?", [id]);

        if(linhas.length === 0){
            return null;
        }

        return {...linhas[0], preco: Number(linhas[0].preco)};
    }

    async function criar(servico) {
        const sql = "INSERT INTO servicos (titulo, categoria, tipo_servico, tag, descricao, tempo_prestacao, preco, id_profissional) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

        const valores = [
            servico.titulo,
            servico.categoria,
            servico.tipo_servico,
            servico.tag,
            servico.descricao,
            servico.tempo_prestacao,
            servico.preco,
            servico.id_profissional
        ];

        const [resultado] = await pool.query(sql, valores);

        return {...servico, id_servico: resultado.insertId, preco: Number(servico.preco)};
    }

    async function deletarPorId(id) {
        const [resultado] = await pool.query("DELETE FROM servicos WHERE id_servico = ?", [id]);

        if (resultado.affectedRows === 0) {
            return null;
        }

        return true;
    }

    async function atualizar(id, servico) {
        const sql = "UPDATE servicos SET titulo = ?, categoria = ?, tipo_servico = ?, tag = ?, descricao = ?, tempo_prestacao = ?, preco = ?, id_profissional = ? WHERE id_servico = ?";

        const valores = [
            servico.titulo,
            servico.categoria,
            servico.tipo_servico,
            servico.tag,
            servico.descricao,
            servico.tempo_prestacao,
            servico.preco,
            servico.id_profissional,
            id
        ];

        const [resultado] = await pool.query(sql, valores);

        if (resultado.affectedRows === 0) {
            const existente = await buscarPorId(id);

            if (!existente) {
                return null;
            }
        }

        return {...servico, id_servico: Number(id), preco: Number(servico.preco)};
    }

    return {listarTodos, buscarPorId, criar, deletarPorId, atualizar};
}
