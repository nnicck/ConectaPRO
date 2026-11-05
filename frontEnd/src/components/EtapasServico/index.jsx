import styles from "./etapasServico.module.css";

// etapas: lista com o nome de cada etapa, em ordem
// cumpridas: quantas etapas, contando a partir da primeira, já foram cumpridas
export default function EtapasServico({ etapas, cumpridas }) {
    return (
        <ol className={styles.etapas} aria-label="Etapas do serviço">
            {etapas.map((etapa, index) => (
                <li
                    key={etapa}
                    className={`${styles.etapa} ${index < cumpridas ? styles.cumprida : ""}`}
                    aria-current={index === cumpridas - 1 ? "step" : undefined}
                >
                    <div className={styles.circulo}></div>
                    {etapa}
                </li>
            ))}
        </ol>
    );
}
