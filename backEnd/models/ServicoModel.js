// =====================================================================
// ServicoModel — SQL da tabela "servicos"
// pool = conjunto de conexões com o MySQL (criado em config/database.js)
// =====================================================================
export function criarServicoModel({ pool }) {

    // O MySQL devolve DECIMAL como texto ("45.00"); aqui vira número
    function converter(servico) {
        return { ...servico, preco: Number(servico.preco) };
    }

    async function listarTodos() {
        const [linhas] = await pool.query("SELECT * FROM servicos");
        return linhas.map(converter);
    }

    async function buscarPorId(id) {
        const [linhas] = await pool.query("SELECT * FROM servicos WHERE id_servico = ?", [id]);
        return linhas.length === 0 ? null : converter(linhas[0]);
    }

    async function criar(servico) {
        const sql = `
            INSERT INTO servicos
                (titulo, categoria, tipo_servico, tag, descricao, tempo_prestacao, preco, id_profissional)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

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
        return converter({ ...servico, id_servico: resultado.insertId });
    }

    // Devolve null se o serviço não existir.
    // As fotos e os pedidos do serviço são apagados junto (ON DELETE CASCADE no banco).
    async function deletarPorId(id) {
        const [resultado] = await pool.query("DELETE FROM servicos WHERE id_servico = ?", [id]);
        return resultado.affectedRows === 0 ? null : true;
    }

    async function atualizar(id, servico) {
        const sql = `
            UPDATE servicos
            SET titulo = ?, categoria = ?, tipo_servico = ?, tag = ?, descricao = ?,
                tempo_prestacao = ?, preco = ?, id_profissional = ?
            WHERE id_servico = ?
        `;

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

        // affectedRows = 0 pode ser "não existe" ou "nada mudou": confere qual dos dois
        if (resultado.affectedRows === 0 && !(await buscarPorId(id))) {
            return null;
        }

        return converter({ ...servico, id_servico: Number(id) });
    }

    // Escapa os curingas do LIKE para que "%" e "_" digitados pelo usuário sejam tratados como texto
    function escaparLike(texto) {
        return texto.replace(/[\\%_]/g, "\\$&");
    }

    // Busca de serviços com filtros. Cada filtro é opcional:
    //   termo          -> procura no título, categoria, tag, descrição, nome e profissão
    //   categorias     -> ["Elétrica", "Limpeza"]
    //   localizacao    -> parte do endereço do profissional ("Santo André")
    //   faixas         -> [{ min: 0, max: 50 }, { min: 100, max: null }]  (null = sem limite)
    //   idProfissional -> só os serviços de um profissional
    // Cada serviço já vem com os dados do profissional e a primeira foto (capa).
    async function pesquisar({ termo = "", categorias = [], localizacao = "", faixas = [], idProfissional = null } = {}) {
        const condicoes = []; // pedaços do WHERE
        const valores = [];   // valores dos "?" na mesma ordem

        if (idProfissional) {
            condicoes.push("s.id_profissional = ?");
            valores.push(idProfissional);
        }

        if (termo) {
            const padrao = `%${escaparLike(termo)}%`;
            condicoes.push(`(
                s.titulo LIKE ? OR s.categoria LIKE ? OR s.tipo_servico LIKE ? OR s.tag LIKE ?
                OR s.descricao LIKE ? OR p.nome LIKE ? OR p.profissao LIKE ?
            )`);
            valores.push(padrao, padrao, padrao, padrao, padrao, padrao, padrao);
        }

        if (categorias.length > 0) {
            condicoes.push(`s.categoria IN (${categorias.map(() => "?").join(", ")})`);
            valores.push(...categorias);
        }

        if (localizacao) {
            condicoes.push("p.localizacao LIKE ?");
            valores.push(`%${escaparLike(localizacao)}%`);
        }

        if (faixas.length > 0) {
            const partes = faixas.map(({ min, max }) => {
                if (max === null) {
                    valores.push(min);
                    return "s.preco >= ?";
                }

                valores.push(min, max);
                return "(s.preco >= ? AND s.preco <= ?)";
            });

            condicoes.push(`(${partes.join(" OR ")})`);
        }

        const where = condicoes.length > 0 ? `WHERE ${condicoes.join(" AND ")}` : "";

        const sql = `
            SELECT
                s.*,
                p.nome        AS profissional_nome,
                p.foto        AS profissional_foto,
                p.profissao   AS profissional_profissao,
                p.localizacao AS profissional_localizacao,
                (
                    SELECT m.midia
                    FROM midias m
                    WHERE m.id_servico = s.id_servico AND m.tipo = 'Imagem'
                    ORDER BY m.id_midia
                    LIMIT 1
                ) AS imagem
            FROM servicos s
            JOIN profissionais p ON p.id_profissional = s.id_profissional
            ${where}
            ORDER BY s.titulo
        `;

        const [linhas] = await pool.query(sql, valores);
        return linhas.map(converter);
    }

    // Categorias que já têm algum serviço cadastrado (usadas nos filtros da busca)
    async function listarCategorias() {
        const [linhas] = await pool.query("SELECT DISTINCT categoria FROM servicos ORDER BY categoria");
        return linhas.map((linha) => linha.categoria);
    }

    return { listarTodos, buscarPorId, criar, deletarPorId, atualizar, pesquisar, listarCategorias };
}
