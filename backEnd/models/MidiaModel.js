// pool = conexões do MySQL,
export function criarMidiaModel({ pool }) {

    async function listarTodos() {
        const [linhas] = await pool.query("SELECT * FROM midias");
        return linhas;
    }

    async function buscarPorId(id) {
        const [linhas] = await pool.query("SELECT * FROM midias WHERE id_midia = ?", [id]);

        if (linhas.length === 0) {
            return null;
        }

        return { ...linhas[0] };
    }

    async function criar(midia) {
        const sql = "INSERT INTO midias (tipo, midia, id_servico) VALUES (?, ?, ?)";

        const valores = [
            midia.tipo,
            midia.midia,
            midia.id_servico
        ];

        const [resultado] = await pool.query(sql, valores);

        return { ...midia, id_midia: resultado.insertId };
    }

    async function deletarPorId(id) {
        const [resultado] = await pool.query("DELETE FROM midias WHERE id_midia = ?", [id]);

        if (resultado.affectedRows === 0) {
            return null;
        }

        return true;
    }

    async function atualizar(id, midia) {
        const sql = "UPDATE midias SET tipo = ?, midia = ?, id_servico = ? WHERE id_midia = ?";

        const valores = [
            midia.tipo,
            midia.midia,
            midia.id_servico,
            id
        ];

        const [resultado] = await pool.query(sql, valores);

        if (resultado.affectedRows === 0) {
            const existente = await buscarPorId(id);

            if (!existente) {
                return null;
            }
        }

        return { ...midia, id_midia: Number(id) };
    }

    return { listarTodos, buscarPorId, criar, deletarPorId, atualizar };
}