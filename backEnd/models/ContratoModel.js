// pool = conexões do MySQL,
export function criarContratoModel({ pool }) {

    async function listarTodos() {
        const [linhas] = await pool.query("SELECT * FROM contratos");
        return linhas;
    }

    async function buscarPorId(id) {
        const [linhas] = await pool.query("SELECT * FROM contratos WHERE id_contrato = ?", [id]);

        if (linhas.length === 0) {
            return null;
        }

        return { ...linhas[0] };
    }

    async function criar(contrato) {
        const sql = "INSERT INTO contratos (data_contrato, local, observacao, data_conclusao, status, id_cliente, id_profissional, id_servico) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

        const valores = [
            contrato.data_contrato,
            contrato.local,
            contrato.observacao,
            contrato.data_conclusao,
            contrato.status,
            contrato.id_cliente,
            contrato.id_profissional,
            contrato.id_servico
        ];

        const [resultado] = await pool.query(sql, valores);

        return { ...contrato, id_contrato: resultado.insertId };
    }

    async function deletarPorId(id) {
        const [resultado] = await pool.query("DELETE FROM contratos WHERE id_contrato = ?", [id]);

        if (resultado.affectedRows === 0) {
            return null;
        }

        return true;
    }

    async function atualizar(id, contrato) {
        const sql = "UPDATE contratos SET data_contrato = ?, local = ?, observacao = ?, data_conclusao = ?, status = ?, id_cliente = ?, id_profissional = ?, id_servico = ? WHERE id_contrato = ?";

        const valores = [
            contrato.data_contrato,
            contrato.local,
            contrato.observacao,
            contrato.data_conclusao,
            contrato.status,
            contrato.id_cliente,
            contrato.id_profissional,
            contrato.id_servico,
            id
        ];

        const [resultado] = await pool.query(sql, valores);

        if (resultado.affectedRows === 0) {
            const existente = await buscarPorId(id);

            if (!existente) {
                return null;
            }
        }

        return { ...contrato, id_contrato: Number(id) };
    }

    return { listarTodos, buscarPorId, criar, deletarPorId, atualizar };
}