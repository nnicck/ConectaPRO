export function criarServicoController({ servicoService }) {
    async function listar(req, res, next) {
        try {
            const servicos = await servicoService.listar();
            res.status(200).json({ sucesso: true, dados: servicos });
        } catch (erro) {
            next(erro);
        }
    }

    async function buscar(req, res, next) {
        try {
            const servico = await servicoService.buscarPorId(req.params.id);
            res.status(200).json({ sucesso: true, dados: servico });
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
            await servicoService.deletarPorId(req.params.id);
            res.status(200).json({
                sucesso: true,
                mensagem: "Serviço excluído com sucesso"
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
            const servicoAtualizado = await servicoService.atualizar(
                req.params.id,
                req.body
            );

            res.status(200).json({
                sucesso: true,
                mensagem: "Serviço atualizado com sucesso",
                dados: servicoAtualizado
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
            const servicoNovo = await servicoService.criar(req.body);
            res.status(201).json({ sucesso: true, dados: servicoNovo });
        } catch (erro) {
            res.status(400).json({ sucesso: false, erro: erro.message });
        }
    }

    async function pesquisar(req, res, next) {
        try {
            const servicos = await servicoService.pesquisar(req.query);
            res.status(200).json({ sucesso: true, dados: servicos });
        } catch (erro) {
            if (erro instanceof TypeError) {
                return res.status(400).json({ sucesso: false, erro: erro.message });
            }

            next(erro);
        }
    }

    async function listarCategorias(req, res, next) {
        try {
            const categorias = await servicoService.listarCategorias();
            res.status(200).json({ sucesso: true, dados: categorias });
        } catch (erro) {
            next(erro);
        }
    }

    return { listar, buscar, criar, deletar, atualizar, pesquisar, listarCategorias };
}