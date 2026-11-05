// Rodapé do site (não aparece no painel do profissional).


export default function Rodape() {
    return (
        <footer className="text-white bg-marinho">
            <div className="container py-4 d-flex flex-column flex-md-row align-items-center justify-content-between gap-2">
                <span className="fw-semibold">
                    <i className="bi bi-link-45deg me-1"></i>ConectaPRO
                </span>
                <span className="small text-white-50">© 2026 ConectaPRO. Todos os direitos reservados.</span>
            </div>
        </footer>
    );
}
