export function criarAvaliacaoController({ avaliacaoService }) {
    async function listar(req, res, next) {
        try {
            const avaliacoes = await avaliacaoService.listar();
            res.status(200).json({ sucesso: true, dados: avaliacoes });
        } catch (erro) {
            next(erro);
        }
    }

    async function buscar(req, res, next) {
        try {
            const avaliacao = await avaliacaoService.buscarPorId(req.params.id);
            res.status(200).json({ sucesso: true, dados: avaliacao });
        } catch (erro) {
            if (erro instanceof TypeError) {
                return res.status(400).json({ erro: erro.message });
            }

            if (erro.message.includes("não encontrado")) {
                return res.status(404).json({ erro: erro.message });
            }

            next(erro);
        }
    }

    async function deletar(req, res, next) {
        try {
            await avaliacaoService.deletarPorId(req.params.id);
            res.status(200).json({
                sucesso: true,
                mensagem: "Avaliação excluída com sucesso"
            });
        } catch (erro) {
            if (erro.message.includes("ID deve")) {
                return res.status(400).json({ erro: erro.message });
            }

            if (erro.message.includes("não encontrado")) {
                return res.status(404).json({ erro: erro.message });
            }

            next(erro);
        }
    }

    async function atualizar(req, res, next) {
        try {
            const avaliacaoAtualizada = await avaliacaoService.atualizar(
                req.params.id,
                req.body
            );

            res.status(200).json({
                sucesso: true,
                mensagem: "Avaliação atualizada com sucesso",
                dados: avaliacaoAtualizada
            });
        } catch (erro) {
            if (erro.message.includes("ID deve")) {
                return res.status(400).json({ erro: erro.message });
            }

            if (erro.message.includes("não encontrado")) {
                return res.status(404).json({ erro: erro.message });
            }

            if (erro instanceof TypeError || erro instanceof Error) {
                return res.status(400).json({
                    sucesso: false,
                    erro: erro.message
                });
            }

            next(erro);
        }
    }

    async function criar(req, res, next) {
        try {
            const avaliacaoNova = await avaliacaoService.criar(req.body);
            res.status(201).json({ sucesso: true, dados: avaliacaoNova });
        } catch (erro) {
            res.status(400).json({ sucesso: false, erro: erro.message });
        }
    }

    async function listarPorProfissional(req, res, next) {
        try {
            const avaliacoes = await avaliacaoService.listarPorProfissional(req.params.id);
            res.status(200).json({ sucesso: true, dados: avaliacoes });
        } catch (erro) {
            next(erro);
        }
    }

    return { listar, buscar, criar, deletar, atualizar, listarPorProfissional };
}