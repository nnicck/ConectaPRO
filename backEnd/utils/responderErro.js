// Converte os erros lançados pelos services em respostas HTTP com o status correto.
// Assim cada controller só precisa chamar responderErro(erro, res, next) no catch.

// Erros do MySQL que significam "o banco não está acessível"
const BANCO_FORA = ["ECONNREFUSED", "ETIMEDOUT", "ENOTFOUND", "PROTOCOL_CONNECTION_LOST", "ER_ACCESS_DENIED_ERROR", "ER_BAD_DB_ERROR"];

// Erros do MySQL que significam "as tabelas estão diferentes do código" (faltou rodar a migração)
const BANCO_DESATUALIZADO = ["ER_NO_SUCH_TABLE", "ER_BAD_FIELD_ERROR"];

export function responderErro(erro, res, next) {
    const mensagem = erro.message || "";

    if (mensagem.includes("não encontrad")) { // pega "não encontrado" e "não encontrada"
        return res.status(404).json({ sucesso: false, erro: mensagem });
    }

    if (mensagem.startsWith("Faça login")) {
        return res.status(401).json({ sucesso: false, erro: mensagem });
    }

    if (mensagem.startsWith("Acesso negado")) {
        return res.status(403).json({ sucesso: false, erro: mensagem });
    }

    if (mensagem.startsWith("Não é possível")) {
        return res.status(409).json({ sucesso: false, erro: mensagem });
    }

    // e-mail, telefone ou outro campo UNIQUE repetido
    if (erro.code === "ER_DUP_ENTRY") {
        return res.status(409).json({
            sucesso: false,
            erro: "Já existe um cadastro com esses dados (e-mail ou telefone já usado)."
        });
    }

    // id de cliente, profissional ou serviço que não existe
    if (erro.code === "ER_NO_REFERENCED_ROW_2") {
        return res.status(400).json({ sucesso: false, erro: "Registro relacionado não existe." });
    }

    // texto maior do que a coluna aceita (ex.: endereço com mais de 300 letras)
    if (erro.code === "ER_DATA_TOO_LONG") {
        const coluna = /column '(\w+)'/.exec(mensagem)?.[1];
        return res.status(400).json({ sucesso: false, erro: `O campo ${coluna ?? ""} está grande demais.`.replace("  ", " ") });
    }

    // data ou número em formato que o MySQL não aceita
    if (["ER_TRUNCATED_WRONG_VALUE", "ER_TRUNCATED_WRONG_VALUE_FOR_FIELD", "ER_WRONG_VALUE", "WARN_DATA_TRUNCATED"].includes(erro.code)) {
        return res.status(400).json({ sucesso: false, erro: "Algum campo foi enviado em formato inválido (confira datas e números)." });
    }

    if (BANCO_FORA.includes(erro.code)) {
        console.error(`Banco de dados indisponível (${erro.code}): ${mensagem}`);
        return res.status(503).json({
            sucesso: false,
            erro: "Banco de dados indisponível. Confira se o MySQL está rodando e os dados do arquivo .env (DB_PORT, DB_USER, DB_PASS, DB_NAME)."
        });
    }

    if (BANCO_DESATUALIZADO.includes(erro.code)) {
        console.error(`Banco desatualizado (${erro.code}): ${mensagem}`);
        return res.status(500).json({
            sucesso: false,
            erro: "O banco de dados está desatualizado. No back-end, rode: npm run migrar"
        });
    }

    // erros de validação (classes em /models e conferências dos services)
    if (erro instanceof TypeError || erro instanceof RangeError || erro.validacao) {
        return res.status(400).json({ sucesso: false, erro: mensagem });
    }

    next(erro);
}

// Cria um erro de validação (vira status 400)
export function erroValidacao(mensagem) {
    const erro = new Error(mensagem);
    erro.validacao = true;
    return erro;
}
