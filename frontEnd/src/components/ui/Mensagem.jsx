// Mensagens padrão de carregando / erro / sucesso

// Carregando de página inteira: spinner centralizado.
// Use <Carregando pequeno /> dentro de modais e cards (spinner pequeno ao lado do texto).
export function Carregando({ texto = "Carregando...", pequeno = false }) {
    if (pequeno) {
        return (
            <div className="d-flex align-items-center gap-2 texto-suave py-4">
                <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                <span>{texto}</span>
            </div>
        );
    }

    return (
        <div className="d-flex flex-column align-items-center justify-content-center gap-3 py-5" role="status">
            <span className="spinner-border text-primary" style={{ width: "2.5rem", height: "2.5rem" }} aria-hidden="true"></span>
            <span className="fw-semibold texto-suave">{texto}</span>
        </div>
    );
}

export function Alerta({ tipo = "danger", children }) {
    if (!children) return null;
    return <div className={`alert alert-${tipo} mb-3`} role="alert">{children}</div>;
}

export function Vazio({ icone = "bi-inbox", children }) {
    return (
        <div className="text-center texto-suave py-5">
            <i className={`bi ${icone} d-block mb-2`} style={{ fontSize: "2.5rem" }}></i>
            {children}
        </div>
    );
}
