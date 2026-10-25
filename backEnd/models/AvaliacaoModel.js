// pool = conexões do MySQL,
export function criarAvaliacaoModel({ pool }) {

    async function listarTodos() {
        const [linhas] = await pool.query("SELECT * FROM avaliacoes");
        return linhas;
    }

    async function buscarPorId(id) {
        const [linhas] = await pool.query("SELECT * FROM avaliacoes WHERE id_avaliacao = ?", [id]);

        if (linhas.length === 0) {
            return null;
        }

        return { ...linhas[0] };
    }

    async function criar(avaliacao) {
        const sql = "INSERT INTO avaliacoes (estrelas, comentario, data_avaliacao, id_servico) VALUES (?, ?, ?, ?)";

        const valores = [
            avaliacao.estrelas,
            avaliacao.comentario,
            avaliacao.data_avaliacao,
            avaliacao.id_servico
        ];

        const [resultado] = await pool.query(sql, valores);

        return { ...avaliacao, id_avaliacao: resultado.insertId };
    }

    async function deletarPorId(id) {
        const [resultado] = await pool.query("DELETE FROM avaliacoes WHERE id_avaliacao = ?", [id]);

        if (resultado.affectedRows === 0) {
            return null;
        }

        return true;
    }

    async function atualizar(id, avaliacao) {
        const sql = "UPDATE avaliacoes SET estrelas = ?, comentario = ?, data_avaliacao = ?, id_servico = ? WHERE id_avaliacao = ?";

        const valores = [
            avaliacao.estrelas,
            avaliacao.comentario,
            avaliacao.data_avaliacao,
            avaliacao.id_servico,
            id
        ];

        const [resultado] = await pool.query(sql, valores);

        if (resultado.affectedRows === 0) {
            const existente = await buscarPorId(id);

            if (!existente) {
                return null;
            }
        }

        return { ...avaliacao, id_avaliacao: Number(id) };
    }

    return { listarTodos, buscarPorId, criar, deletarPorId, atualizar };
}