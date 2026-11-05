// Endereço do back-end. Pode ser trocado criando um arquivo .env.local com NEXT_PUBLIC_API_URL=...
export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// Função única para conversar com a API.
// Exemplos:
//   const servicos = await api("/servico");
//   await api("/servico", { metodo: "POST", dados: { titulo: "..." } });
//   await api(`/servico/${id}`, { metodo: "DELETE" });
// Devolve o campo "dados" da resposta ou lança um Error com a mensagem do back-end.
export async function api(caminho, { metodo = "GET", dados } = {}) {
    let resposta;

    try {
        resposta = await fetch(`${API_URL}/api${caminho}`, {
            method: metodo,
            credentials: "include", // envia o cookie da sessão (login)
            headers: dados ? { "Content-Type": "application/json" } : undefined,
            body: dados ? JSON.stringify(dados) : undefined
        });
    } catch {
        throw new Error("Não foi possível conectar ao servidor. Verifique se o back-end está rodando.");
    }

    const resultado = await resposta.json().catch(() => ({}));

    if (!resposta.ok || resultado.sucesso === false) {
        throw new Error(resultado.erro || resultado.mensagem || "Algo deu errado. Tente novamente.");
    }

    // a maioria das rotas devolve { sucesso, dados }; se não houver "dados", devolve a resposta inteira
    return "dados" in resultado ? resultado.dados : resultado;
}

// Envia um arquivo de imagem (input type="file") e devolve a URL onde ele ficou salvo
export async function enviarImagem(arquivo) {
    if (!arquivo.type.startsWith("image/")) {
        throw new Error("Selecione um arquivo de imagem.");
    }

    if (arquivo.size > 5 * 1024 * 1024) {
        throw new Error("A imagem deve ter no máximo 5 MB.");
    }

    // transforma o arquivo em texto base64 ("data:image/png;base64,....")
    const base64 = await new Promise((resolve, reject) => {
        const leitor = new FileReader();
        leitor.onload = () => resolve(leitor.result);
        leitor.onerror = () => reject(new Error("Não foi possível ler a imagem."));
        leitor.readAsDataURL(arquivo);
    });

    const { url } = await api("/upload", { metodo: "POST", dados: { arquivo: base64 } });
    return url;
}
