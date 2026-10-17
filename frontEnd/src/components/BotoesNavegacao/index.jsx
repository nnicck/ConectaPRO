import Link from "next/link";

export default function BotoesNavegacao({ voltar, proximo }) {
    return (
        <div
            className="row justify-content-center"
            style={{ marginTop: "60px" }}
        >
            <div className="col-12 col-md-8 col-lg-6">
                <div className="d-flex" style={{ gap: "60px" }}>
                    <Link
                        href={voltar}
                        className="btn btn-outline-primary flex-fill py-2"
                    >
                        Voltar
                    </Link>

                    <Link
                        href={proximo}
                        className="btn btn-primary flex-fill py-2"
                    >
                        Próximo
                    </Link>
                </div>
            </div>
        </div>
    );
}