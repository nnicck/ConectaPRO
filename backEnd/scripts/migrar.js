// Recria o banco do zero: apaga as tabelas, roda os arquivos da pasta migrations em ordem
// alfabética (criar tabelas -> inserir dados) e mostra quantos registros ficaram em cada tabela.
// Uso: npm run migrar
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import mysql from "mysql2/promise";
import { carregarAmbiente } from "../config/ambiente.js";

carregarAmbiente(".env");

// Tabelas do sistema, na ordem certa para apagar (quem depende de outra vem primeiro)
const TABELAS = ["contratos", "midias", "servicos", "profissionais", "clientes"];

// Tabelas que existiam em versões antigas e não são mais usadas (são apagadas se existirem)
const TABELAS_ANTIGAS = ["avaliacoes"];

let conexao;

try {
    conexao = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASS || "",
        multipleStatements: true // permite rodar o arquivo .sql inteiro de uma vez
    });
} catch (erro) {
    console.error(`Não foi possível conectar ao MySQL em ${process.env.DB_HOST}:${process.env.DB_PORT} (${erro.code ?? erro.message}).`);
    console.error("Confira se o MySQL/Docker está ligado e se DB_USER e DB_PASS do .env estão certos.");
    process.exit(1);
}

try {
    await conexao.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
    await conexao.query(`USE \`${process.env.DB_NAME}\``);

    await conexao.query("SET FOREIGN_KEY_CHECKS = 0");
    for (const tabela of [...TABELAS_ANTIGAS, ...TABELAS]) {
        await conexao.query(`DROP TABLE IF EXISTS ${tabela}`);
    }
    await conexao.query("SET FOREIGN_KEY_CHECKS = 1");

    const pasta = join(import.meta.dirname, "..", "migrations");
    const arquivos = readdirSync(pasta).filter(nome => nome.endsWith(".sql")).sort();

    for (const arquivo of arquivos) {
        console.log(`Executando ${arquivo}...`);
        await conexao.query(readFileSync(join(pasta, arquivo), "utf8"));
    }

    for (const tabela of [...TABELAS].reverse()) {
        const [[{ total }]] = await conexao.query(`SELECT COUNT(*) AS total FROM ${tabela}`);
        console.log(`  ${tabela}: ${total} registro(s)`);
    }

    console.log("Banco pronto!");
} catch (erro) {
    console.error(`Falha na migração: ${erro.message}`);
    process.exitCode = 1;
} finally {
    await conexao.end();
}
