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

    // Contrato + serviço + profissional + média das avaliações do profissional, em uma única consulta.
    // Não traz senha nem outros dados sensíveis do profissional.
    async function buscarAcompanhamento(id) {
        const sql = `
            SELECT
                c.*,
                s.titulo AS servico_titulo,
                s.descricao AS servico_descricao,
                s.preco AS servico_preco,
                p.nome AS profissional_nome,
                p.foto AS profissional_foto,
                p.profissao AS profissional_profissao,
                p.telefone AS profissional_telefone,
                p.email AS profissional_email,
                (
                    SELECT AVG(a.estrelas)
                    FROM avaliacoes a
                    JOIN servicos sa ON sa.id_servico = a.id_servico
                    WHERE sa.id_profissional = p.id_profissional
                ) AS media_estrelas,
                (
                    SELECT COUNT(*)
                    FROM avaliacoes a
                    JOIN servicos sa ON sa.id_servico = a.id_servico
                    WHERE sa.id_profissional = p.id_profissional
                ) AS total_avaliacoes
            FROM contratos c
            JOIN servicos s ON s.id_servico = c.id_servico
            JOIN profissionais p ON p.id_profissional = c.id_profissional
            WHERE c.id_contrato = ?
        `;

        const [linhas] = await pool.query(sql, [id]);

        if (linhas.length === 0) {
            return null;
        }

        const linha = linhas[0];

        return {
            id_contrato: linha.id_contrato,
            data_contrato: linha.data_contrato,
            local: linha.local,
            observacao: linha.observacao,
            data_conclusao: linha.data_conclusao,
            status: linha.status,
            id_cliente: linha.id_cliente,
            servico: {
                id_servico: linha.id_servico,
                titulo: linha.servico_titulo,
                descricao: linha.servico_descricao,
                preco: Number(linha.servico_preco)
            },
            profissional: {
                id_profissional: linha.id_profissional,
                nome: linha.profissional_nome,
                foto: linha.profissional_foto,
                profissao: linha.profissional_profissao,
                telefone: linha.profissional_telefone,
                email: linha.profissional_email,
                media_estrelas: linha.media_estrelas === null ? null : Number(linha.media_estrelas),
                total_avaliacoes: Number(linha.total_avaliacoes)
            }
        };
    }

    async function atualizarStatus(id, status) {
        await pool.query("UPDATE contratos SET status = ? WHERE id_contrato = ?", [status, id]);
    }

    return { listarTodos, buscarPorId, criar, deletarPorId, atualizar, buscarAcompanhamento, atualizarStatus };
}