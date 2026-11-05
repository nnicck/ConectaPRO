// Funções pequenas de formatação usadas em várias telas

export function formatarPreco(valor) {
    return Number(valor || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// "2026-11-04" -> "04/11/2026"
export function formatarData(data) {
    if (!data) return "-";
    const [ano, mes, dia] = String(data).slice(0, 10).split("-");
    return `${dia}/${mes}/${ano}`;
}

// "11981100001" -> "(11) 98110-0001"
export function formatarTelefone(telefone) {
    const numeros = String(telefone ?? "").replace(/\D/g, "");
    if (numeros.length === 11) return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
    if (numeros.length === 10) return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 6)}-${numeros.slice(6)}`;
    return telefone || "-";
}

export function anoDe(data) {
    return data ? String(data).slice(0, 4) : "-";
}

// Data de hoje no formato do input type="date"
export function hojeISO() {
    const agora = new Date();
    agora.setMinutes(agora.getMinutes() - agora.getTimezoneOffset());
    return agora.toISOString().slice(0, 10);
}

// ---------- Endereço ----------
// O banco tem uma única coluna "localizacao". Guardamos no formato:
//   "Rua das Flores, 120 - Bela Vista, São Paulo - SP, 01234-000"
// e desmontamos de volta para preencher o formulário de edição.

export function montarEndereco({ rua, numero, bairro, cidade, estado, cep }) {
    const linha1 = [rua, numero].filter(Boolean).join(", ");
    const linha2 = [linha1, bairro].filter(Boolean).join(" - ");
    const cidadeUf = [cidade, estado?.toUpperCase()].filter(Boolean).join(" - ");
    return [linha2, cidadeUf, cep].filter(Boolean).join(", ");
}

export function lerEndereco(texto) {
    const vazio = { rua: "", numero: "", bairro: "", cidade: "", estado: "", cep: "" };
    if (!texto) return vazio;

    const completo = /^(.*?), (.*?) - (.*?), (.*?) - ([A-Za-z]{2})(?:, (\d{5}-?\d{3}))?$/.exec(texto);
    if (completo) {
        const [, rua, numero, bairro, cidade, estado, cep = ""] = completo;
        return { rua, numero, bairro, cidade, estado, cep };
    }

    const soCidade = /^(.*?) - ([A-Za-z]{2})$/.exec(texto);
    if (soCidade) {
        return { ...vazio, cidade: soCidade[1], estado: soCidade[2] };
    }

    return { ...vazio, rua: texto };
}

// Só "Cidade - UF" (para mostrar em cards e perfis)
export function cidadeDoEndereco(texto) {
    const { cidade, estado } = lerEndereco(texto);
    return cidade ? `${cidade}${estado ? ` - ${estado}` : ""}` : texto || "Não informado";
}

// ---------- Status dos contratos ----------
export const STATUS = {
    "pendente":     { rotulo: "Pendente",     cor: "warning" },
    "aceito":       { rotulo: "Aceito",       cor: "primary" },
    "em andamento": { rotulo: "Em andamento", cor: "info" },
    "concluído":    { rotulo: "Concluído",    cor: "success" },
    "recusado":     { rotulo: "Recusado",     cor: "danger" },
    "cancelado":    { rotulo: "Cancelado",    cor: "secondary" }
};

// Categorias usadas nos formulários de serviço
export const CATEGORIAS = ["Construção", "Elétrica", "Encanamento", "Limpeza", "Pintura", "Jardinagem", "Tecnologia", "Outros"];

// Ícone (Bootstrap Icons) de cada categoria, usado quando o serviço não tem foto
export function iconeCategoria(categoria = "") {
    const icones = {
        "Construção": "bi-bricks",
        "Elétrica": "bi-lightning-charge",
        "Encanamento": "bi-droplet",
        "Limpeza": "bi-stars",
        "Pintura": "bi-palette",
        "Jardinagem": "bi-tree",
        "Tecnologia": "bi-laptop"
    };
    return icones[categoria] || "bi-tools";
}
