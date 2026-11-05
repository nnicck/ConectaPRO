// =====================================================================
// ContratoModel — SQL da tabela "contratos"
// pool = conjunto de conexões com o MySQL (criado em config/database.js)
// =====================================================================
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

    // Contrato + serviço + profissional + cliente, em uma única consulta.
    // Não traz senha nem outros dados sensíveis.
    const SQL_DETALHADO = `
        SELECT
            c.*,
            s.titulo AS servico_titulo,
            s.descricao AS servico_descricao,
            s.categoria AS servico_categoria,
            s.preco AS servico_preco,
            (SELECT m.midia FROM midias m WHERE m.id_servico = s.id_servico AND m.tipo = 'Imagem'
              ORDER BY m.id_midia LIMIT 1) AS servico_imagem,
            p.nome AS profissional_nome,
            p.foto AS profissional_foto,
            p.profissao AS profissional_profissao,
            p.telefone AS profissional_telefone,
            p.email AS profissional_email,
            cl.nome AS cliente_nome,
            cl.foto AS cliente_foto,
            cl.telefone AS cliente_telefone,
            cl.email AS cliente_email
        FROM contratos c
        JOIN servicos s ON s.id_servico = c.id_servico
        JOIN profissionais p ON p.id_profissional = c.id_profissional
        JOIN clientes cl ON cl.id_cliente = c.id_cliente
    `;

    // Organiza a linha "achatada" do SQL em objetos aninhados
    function montarDetalhado(linha) {
        return {
            id_contrato: linha.id_contrato,
            data_contrato: linha.data_contrato,
            local: linha.local,
            observacao: linha.observacao,
            data_conclusao: linha.data_conclusao,
            status: linha.status,
            id_cliente: linha.id_cliente,
            id_profissional: linha.id_profissional,
            id_servico: linha.id_servico,
            servico: {
                id_servico: linha.id_servico,
                titulo: linha.servico_titulo,
                descricao: linha.servico_descricao,
                categoria: linha.servico_categoria,
                imagem: linha.servico_imagem,
                preco: Number(linha.servico_preco)
            },
            profissional: {
                id_profissional: linha.id_profissional,
                nome: linha.profissional_nome,
                foto: linha.profissional_foto,
                profissao: linha.profissional_profissao,
                telefone: linha.profissional_telefone,
                email: linha.profissional_email
            },
            cliente: {
                id_cliente: linha.id_cliente,
                nome: linha.cliente_nome,
                foto: linha.cliente_foto,
                telefone: linha.cliente_telefone,
                email: linha.cliente_email
            }
        };
    }

    async function buscarAcompanhamento(id) {
        const [linhas] = await pool.query(`${SQL_DETALHADO} WHERE c.id_contrato = ?`, [id]);
        return linhas.length === 0 ? null : montarDetalhado(linhas[0]);
    }

    // Contratos de um cliente ou de um profissional (mais recentes primeiro)
    async function listarDoUsuario(tipo, id) {
        const coluna = tipo === "cliente" ? "c.id_cliente" : "c.id_profissional";
        const [linhas] = await pool.query(
            `${SQL_DETALHADO} WHERE ${coluna} = ? ORDER BY c.data_contrato DESC, c.id_contrato DESC`,
            [id]
        );
        return linhas.map(montarDetalhado);
    }

    async function atualizarStatus(id, status, dataConclusao = null) {
        await pool.query(
            "UPDATE contratos SET status = ?, data_conclusao = ? WHERE id_contrato = ?",
            [status, dataConclusao, id]
        );
    }

    return { listarTodos, buscarPorId, criar, deletarPorId, atualizar, buscarAcompanhamento, listarDoUsuario, atualizarStatus };
}
