import styles from "./CardProfissional.module.css";
import Link from "next/link";

export default function CardProfissional({ profissional }) {
    return (
        <div className={`card ${styles.profissionalCard}`}>
            <div className={styles.estrela}>
                <i className="bi bi-star-fill"></i>
            </div>

            <div className="card-body p-3">
                <div className="d-flex align-items-center gap-3">
                    <img
                        src={profissional.foto || "/avatar.png"}
                        className={styles.foto}
                        loading="lazy"
                    />

                    <div className="flex-grow-1">
                        <h6 className="fw-bold mb-1">
                            {profissional.nome}
                        </h6>

                        <span className="text-primary small fw-semibold">
                            {profissional.profissao}
                        </span>

                        <div className="text-secondary small mt-1">
                            <i className="bi bi-geo-alt me-1"></i>
                            {profissional.localizacao ||
                                "Localização não informada"}
                        </div>

                        <div className="small mt-1">
                            <i className="bi bi-star-fill text-warning me-1"></i>
                            <strong>Sem avaliações</strong>
                        </div>
                    </div>
                </div>

                <Link
                    href={`/profissional/${profissional.id_profissional}`}
                    className={`btn btn-outline-primary btn-sm w-100 mt-3 ${styles.botao}`}
                >
                    Ver perfil
                    <i className="bi bi-arrow-right ms-2"></i>
                </Link>
            </div>
        </div>
    );
}