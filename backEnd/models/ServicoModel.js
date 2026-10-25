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

    // Escapa os curingas do LIKE para que "%" e "_" digitados pelo usuário sejam tratados como texto
    function escaparLike(texto) {
        return texto.replace(/[\\%_]/g, "\\$&");
    }

    // Busca serviços já com os dados do profissional, a média das avaliações e a primeira imagem
    async function pesquisar({ termo = "", categorias = [], localizacao = "", faixas = [] } = {}) {
        const condicoes = [];
        const valores = [];

        if (termo) {
            const padrao = `%${escaparLike(termo)}%`;

            condicoes.push(
                "(s.titulo LIKE ? OR s.categoria LIKE ? OR s.tipo_servico LIKE ? OR s.tag LIKE ? OR s.descricao LIKE ? OR p.nome LIKE ? OR p.profissao LIKE ?)"
            );
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
                p.nome AS profissional_nome,
                p.foto AS profissional_foto,
                p.profissao AS profissional_profissao,
                p.localizacao AS profissional_localizacao,
                AVG(a.estrelas) AS media_estrelas,
                COUNT(a.id_avaliacao) AS total_avaliacoes,
                (
                    SELECT m.midia
                    FROM midias m
                    WHERE m.id_servico = s.id_servico AND m.tipo = 'Imagem'
                    ORDER BY m.id_midia
                    LIMIT 1
                ) AS imagem
            FROM servicos s
            JOIN profissionais p ON p.id_profissional = s.id_profissional
            LEFT JOIN avaliacoes a ON a.id_servico = s.id_servico
            ${where}
            GROUP BY s.id_servico, p.id_profissional
            ORDER BY s.titulo
        `;

        const [linhas] = await pool.query(sql, valores);

        return linhas.map(linha => ({
            ...linha,
            preco: Number(linha.preco),
            media_estrelas: linha.media_estrelas === null ? null : Number(linha.media_estrelas),
            total_avaliacoes: Number(linha.total_avaliacoes)
        }));
    }

    async function listarCategorias() {
        const [linhas] = await pool.query("SELECT DISTINCT categoria FROM servicos ORDER BY categoria");
        return linhas.map(linha => linha.categoria);
    }

    return {listarTodos, buscarPorId, criar, deletarPorId, atualizar, pesquisar, listarCategorias};
}
