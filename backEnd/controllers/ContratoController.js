export function criarContratoController({ contratoService }) {
    async function listar(req, res, next) {
        try {
            const contratos = await contratoService.listar();
            res.status(200).json({ sucesso: true, dados: contratos });
        } catch (erro) {
            next(erro);
        }
    }

    async function buscar(req, res, next) {
        try {
            const contrato = await contratoService.buscarPorId(req.params.id);
            res.status(200).json({ sucesso: true, dados: contrato });
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
            await contratoService.deletarPorId(req.params.id);
            res.status(200).json({
                sucesso: true,
                mensagem: "Contrato excluído com sucesso"
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
            const contratoAtualizado = await contratoService.atualizar(
                req.params.id,
                req.body
            );

            res.status(200).json({
                sucesso: true,
                mensagem: "Contrato atualizado com sucesso",
                dados: contratoAtualizado
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
            const contratoNovo = await contratoService.criar(req.body);
            res.status(201).json({ sucesso: true, dados: contratoNovo });
        } catch (erro) {
            res.status(400).json({ sucesso: false, erro: erro.message });
        }
    }

    function responderErro(erro, res, next) {
        if (erro.message.includes("ID deve")) {
            return res.status(400).json({ sucesso: false, erro: erro.message });
        }

        if (erro.message.includes("não encontrado")) {
            return res.status(404).json({ sucesso: false, erro: erro.message });
        }

        if (erro.message.startsWith("Acesso negado")) {
            return res.status(403).json({ sucesso: false, erro: erro.message });
        }

        if (erro.message.startsWith("Não é possível")) {
            return res.status(409).json({ sucesso: false, erro: erro.message });
        }

        next(erro);
    }

    async function acompanhar(req, res, next) {
        if (!req.session.usuario) {
            return res.status(401).json({ sucesso: false, erro: "Faça login para continuar" });
        }

        try {
            const acompanhamento = await contratoService.buscarAcompanhamento(
                req.params.id,
                req.session.usuario
            );

            res.status(200).json({ sucesso: true, dados: acompanhamento });
        } catch (erro) {
            responderErro(erro, res, next);
        }
    }

    async function cancelar(req, res, next) {
        if (!req.session.usuario) {
            return res.status(401).json({ sucesso: false, erro: "Faça login para continuar" });
        }

        try {
            const contrato = await contratoService.cancelar(req.params.id, req.session.usuario);

            res.status(200).json({
                sucesso: true,
                mensagem: "Serviço cancelado com sucesso",
                dados: contrato
            });
        } catch (erro) {
            responderErro(erro, res, next);
        }
    }

    return { listar, buscar, criar, deletar, atualizar, acompanhar, cancelar };
}