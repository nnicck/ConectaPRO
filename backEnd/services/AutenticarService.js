export function criarAutenticarService({ clienteModel, profissionalModel }) {
    async function login({ email, senha }) {
        if (!email || !senha) {
            throw new Error("Informe e-mail e senha");
        }

        const clientes = await clienteModel.listarTodos();
        const profissionais = await profissionalModel.listarTodos();

        const encontrados = [
            ...clientes
                .filter(u => u.email === email && u.senha === senha)
                .map(u => ({
                    id: u.id_cliente,
                    nome: u.nome,
                    email: u.email,
                    tipo: "cliente"
                })),
            ...profissionais
                .filter(u => u.email === email && u.senha === senha)
                .map(u => ({
                    id: u.id_profissional,
                    nome: u.nome,
                    email: u.email,
                    tipo: "profissional"
                }))
        ];

        if (encontrados.length !== 1) {
            throw new Error("E-mail ou senha inválidos");
        }

        return encontrados[0];
    }

    return { login };
}
