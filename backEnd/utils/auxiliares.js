// Funções pequenas usadas em vários lugares do back-end.

import { erroValidacao } from "./responderErro.js";

// Remove a senha antes de devolver o usuário para o front-end
export function semSenha(usuario) {
    if (!usuario) return usuario;
    const { senha, ...resto } = usuario;
    return resto;
}

// Data de hoje no formato do MySQL: "2026-11-04"
export function hoje() {
    const agora = new Date();
    const mes = String(agora.getMonth() + 1).padStart(2, "0");
    const dia = String(agora.getDate()).padStart(2, "0");
    return `${agora.getFullYear()}-${mes}-${dia}`;
}

// Confere se o texto é uma data real no formato "AAAA-MM-DD" (ex.: recusa "2026-02-31" e "abc")
export function dataValida(texto) {
    if (typeof texto !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(texto)) return false;
    const data = new Date(`${texto}T00:00:00Z`);
    return !Number.isNaN(data.getTime()) && data.toISOString().slice(0, 10) === texto;
}

// Converte o id da URL em número e valida
export function lerId(idRecebido) {
    const id = Number(idRecebido);

    if (!Number.isInteger(id) || id <= 0) {
        throw erroValidacao("ID deve ser um número inteiro positivo");
    }

    return id;
}

// Junta os dados que já estão no banco com os que chegaram na requisição.
// Campos não enviados (undefined) continuam com o valor antigo — assim o front
// pode mandar só o que mudou (ex.: editar perfil sem mandar a senha de novo).
export function mesclar(existente, novos = {}) {
    const resultado = { ...existente };

    for (const [campo, valor] of Object.entries(novos)) {
        if (valor !== undefined) {
            resultado[campo] = valor;
        }
    }

    return resultado;
}

// Middleware: só deixa passar quem está logado (opcionalmente de um tipo específico)
export function exigirLogin(tipo) {
    return (req, res, next) => {
        const usuario = req.session.usuario;

        if (!usuario) {
            return res.status(401).json({ sucesso: false, erro: "Faça login para continuar" });
        }

        if (tipo && usuario.tipo !== tipo) {
            return res.status(403).json({ sucesso: false, erro: `Acesso negado: área exclusiva para ${tipo}` });
        }

        next();
    };
}
