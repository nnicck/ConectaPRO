import Link from "next/link";
import styles from "./CardProfissional.module.css";
import Avatar from "@/components/ui/Avatar";
import { anoDe, cidadeDoEndereco } from "@/lib/formatar";

// Card de um profissional no carrossel "Profissionais em destaque" da home
export default function CardProfissional({ profissional }) {
    const cidade = cidadeDoEndereco(profissional.localizacao);

    return (
        <div className={styles.profissionalCard}>
            {/* foto + nome + profissão */}
            <div className="d-flex align-items-center gap-3">
                <Avatar src={profissional.foto} nome={profissional.nome} tamanho={56} />

                <div className="min-w-0">
                    <h6 className="fw-bold mb-0 text-truncate" title={profissional.nome}>{profissional.nome}</h6>
                    <span className="text-primary small fw-semibold d-block text-truncate">{profissional.profissao}</span>
                </div>
            </div>

            {/* cidade à esquerda e ano de entrada à direita */}
            <div className={styles.detalhes}>
                <span className="text-truncate" title={cidade}>
                    <i className="bi bi-geo-alt me-1"></i>{cidade}
                </span>
                <span className={styles.desde}>Desde {anoDe(profissional.data_ingresso)}</span>
            </div>

            <Link href={`/perfilProfissional/${profissional.id_profissional}`} className={`btn btn-outline-primary btn-sm w-100 ${styles.botao}`}>
                Ver perfil <i className="bi bi-arrow-right ms-2"></i>
            </Link>
        </div>
    );
}
