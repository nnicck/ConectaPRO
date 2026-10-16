// pool = conexões do MySQL,
export function criarProfissionalModel({ pool }){

    async function listarTodos(){
        const [linhas] = await pool.query("SELECT * FROM profissionais");
        return linhas.map(p => ({...p, saldo: Number(p.saldo)}));
    }

    async function buscarPorId(id){
        const [linhas] = await pool.query("SELECT * FROM profissionais WHERE id_profissional = ?", [id]);

        if(linhas.length === 0){
            return null;
        }

        return {...linhas[0]};
    }

    async function criar(profissional){
        const sql = "INSERT INTO profissionais(nome, email, telefone, senha, foto, localizacao, profissao, visao_geral, idioma, data_ingresso, saldo) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

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
        return {...profissional, id_profissional:resultado.insertId};
    }

    async function deletarPorId(id) {
        const [resultado] = await pool.query("DELETE FROM profissionais WHERE id_profissional = ?", [id]);

        if (resultado.affectedRows === 0) { //Verifica se teve alguma linha afetada
            return null;
        }

        return true;
    }

    async function atualizar(id, profissional) {
        const sql = "UPDATE profissionais SET nome = ?, email = ?, telefone = ?, senha = ?, foto = ?, localizacao = ?, profissao = ?, visao_geral = ?, idioma = ?, data_ingresso = ?, saldo = ? WHERE id_profissional = ?";

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

        if (resultado.affectedRows === 0) { //Verifica se é o mesmo valor do registro
            const existente = await buscarPorId(id); //Verifica existencia
            if (!existente) { //Se não existir volta null
                return null;
            }
        }

        return { ...profissional, id_profissional: Number(id), saldo: Number(profissional.saldo) };
    }

    return {listarTodos, buscarPorId, criar, deletarPorId, atualizar};
}