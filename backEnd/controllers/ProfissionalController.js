export function criarProfissionalController({ profissionalService }) {
    async function listar(req, res, next) {
        try {
            const profissionais = await profissionalService.listar();
            res.status(200).json({ sucesso: true, dados: profissionais });
        } catch (erro) {
            next(erro);
        }
    }

    async function buscar(req, res, next) {
        try {
            const profissional = await profissionalService.buscarPorId(req.params.id);
            res.status(200).json({ sucesso: true, dados: profissional });
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
            await profissionalService.deletarPorId(req.params.id);
            res.status(200).json({
                sucesso: true,
                mensagem: "Profissional excluído com sucesso"
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
            const profissionalAtualizado = await profissionalService.atualizar(
                req.params.id,
                req.body
            );

            res.status(200).json({
                sucesso: true,
                mensagem: "Profissional atualizado com sucesso",
                dados: profissionalAtualizado
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
            const profissionalNovo = await profissionalService.criar(req.body);
            res.status(201).json({ sucesso: true, dados: profissionalNovo });
        } catch (erro) {
            res.status(400).json({ sucesso: false, erro: erro.message });
        }
    }

    return { listar, buscar, criar, deletar, atualizar };
}