// Conexão com o MySQL (pool = conjunto de conexões reaproveitadas entre as requisições).

import mysql from "mysql2/promise";

export function criarPool(){
    return mysql.createPool({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASS || "",
        database: process.env.DB_NAME,
        // devolve DATE como texto "2026-11-04" em vez de objeto Date
        // (evita a data "voltar um dia" por causa do fuso horário)
        dateStrings: true,
        connectionLimit: 10, // limite de conexões simultâneas
        waitForConnections: true, // cria uma fila de novas requisições. será usado caso as 10 conexões simultâneas esteja efetivamente em uso, para não perder nenhuma requisição, se estiver falso, não ficará em fila
        queueLimit: 0 // tamanho da fila. quantas requisições ficarão aguardando as 10 finalizarem. usar 0 apenas em ambientes de teste, em produção, limitar a 30, 40, 50, dependendo do servidor
    })
}

// Confere, ao ligar o servidor, se o banco está acessível e com as tabelas atuais.
// Não derruba o servidor: só mostra no terminal o que precisa ser feito.
export async function verificarBanco(pool) {
    try {
        // consulta colunas de todas as tabelas usadas pelo sistema
        await pool.query("SELECT id_cliente FROM clientes LIMIT 1");
        await pool.query("SELECT id_profissional, saldo FROM profissionais LIMIT 1");
        await pool.query("SELECT id_servico FROM servicos LIMIT 1");
        await pool.query("SELECT id_midia FROM midias LIMIT 1");
        await pool.query("SELECT id_contrato, data_conclusao FROM contratos LIMIT 1");
        console.log("Banco de dados conectado.");
    } catch (erro) {
        if (["ER_NO_SUCH_TABLE", "ER_BAD_FIELD_ERROR"].includes(erro.code)) {
            console.error("\n*** O banco de dados está desatualizado ou vazio. Rode: npm run migrar ***\n");
        } else {
            console.error(`\n*** Não foi possível conectar ao MySQL (${erro.code ?? erro.message}).`);
            console.error(`*** Confira se o MySQL/Docker está rodando em ${process.env.DB_HOST}:${process.env.DB_PORT} e os dados do .env. ***\n`);
        }
    }
}
