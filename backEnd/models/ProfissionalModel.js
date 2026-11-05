// =====================================================================
// ProfissionalModel — SQL da tabela "profissionais"
// pool = conjunto de conexões com o MySQL (criado em config/database.js)
// =====================================================================
export function criarProfissionalModel({ pool }) {

    // O MySQL devolve DECIMAL como texto ("2450.00"); aqui vira número
    function converter(profissional) {
        return { ...profissional, saldo: Number(profissional.saldo) };
    }

    async function listarTodos() {
        const [linhas] = await pool.query("SELECT * FROM profissionais ORDER BY nome");
        return linhas.map(converter);
    }

    async function buscarPorId(id) {
        const [linhas] = await pool.query("SELECT * FROM profissionais WHERE id_profissional = ?", [id]);
        return linhas.length === 0 ? null : converter(linhas[0]);
    }

    // Usado no login
    async function buscarPorEmail(email) {
        const [linhas] = await pool.query("SELECT * FROM profissionais WHERE email = ?", [email]);
        return linhas[0] ?? null;
    }

    async function criar(profissional) {
        const sql = `
            INSERT INTO profissionais
                (nome, email, telefone, senha, foto, localizacao, profissao, visao_geral, idioma, data_ingresso, saldo)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const valores = [
            profissional.nome,
            profissional.email,
            profissional.telefone,
            profissional.senha,
            profissional.foto,
            profissional.localizacao,
            profissional.profissao,
            profissional.visao_geral,
            profissional.idioma,
            profissional.data_ingresso,
            profissional.saldo
        ];

        const [resultado] = await pool.query(sql, valores);
        return { ...profissional, id_profissional: resultado.insertId };
    }

    // Devolve null se o profissional não existir
    async function deletarPorId(id) {
        const [resultado] = await pool.query("DELETE FROM profissionais WHERE id_profissional = ?", [id]);
        return resultado.affectedRows === 0 ? null : true;
    }

    async function atualizar(id, profissional) {
        const sql = `
            UPDATE profissionais
            SET nome = ?, email = ?, telefone = ?, senha = ?, foto = ?, localizacao = ?,
                profissao = ?, visao_geral = ?, idioma = ?, data_ingresso = ?, saldo = ?
            WHERE id_profissional = ?
        `;

        const valores = [
            profissional.nome,
            profissional.email,
            profissional.telefone,
            profissional.senha,
            profissional.foto,
            profissional.localizacao,
            profissional.profissao,
            profissional.visao_geral,
            profissional.idioma,
            profissional.data_ingresso,
            profissional.saldo,
            id
        ];

        const [resultado] = await pool.query(sql, valores);

        // affectedRows = 0 pode ser "não existe" ou "nada mudou": confere qual dos dois
        if (resultado.affectedRows === 0 && !(await buscarPorId(id))) {
            return null;
        }

        return { ...profissional, id_profissional: Number(id), saldo: Number(profissional.saldo) };
    }

    // Soma um valor ao saldo (usado quando um contrato é concluído)
    async function somarSaldo(id, valor) {
        await pool.query("UPDATE profissionais SET saldo = saldo + ? WHERE id_profissional = ?", [valor, id]);
    }

    return { listarTodos, buscarPorId, buscarPorEmail, criar, deletarPorId, atualizar, somarSaldo };
}
