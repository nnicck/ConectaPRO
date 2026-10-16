"use client";
import Link from "next/link";
import styles from "./CardProfissional.module.css";

const dadosProfissionais = [
    {
        nome: "Ana Oliveira",
        profissao: "Diarista",
        local: "Santo André - SP",
        avaliacao: "4.9",
        foto: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
        nome: "Carlos Santos",
        profissao: "Eletricista",
        local: "São Caetano - SP",
        avaliacao: "4.8",
        foto: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
        nome: "Julia Costa",
        profissao: "Pintora",
        local: "São Paulo - SP",
        avaliacao: "4.9",
        foto: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
        nome: "Rafael Mendes",
        profissao: "Montador de móveis",
        local: "Santo André - SP",
        avaliacao: "4.8",
        foto: "https://randomuser.me/api/portraits/men/75.jpg",
    },
    {
        nome: "Beatriz Souza",
        profissao: "Jardineira",
        local: "São Caetano - SP",
        avaliacao: "5.0",
        foto: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    {
        nome: "Camila Ferreira",
        profissao: "Manicure",
        local: "São Paulo - SP",
        avaliacao: "4.9",
        foto: "https://randomuser.me/api/portraits/women/26.jpg",
    },
    {
        nome: "Lucas Martins",
        profissao: "Técnico de informática",
        local: "Santo André - SP",
        avaliacao: "4.8",
        foto: "https://randomuser.me/api/portraits/men/46.jpg",
    },
    {
        nome: "Mariana Costa",
        profissao: "Personal organizer",
        local: "São Caetano - SP",
        avaliacao: "5.0",
        foto: "https://randomuser.me/api/portraits/women/79.jpg",
    },
];

function Card({ profissional }) {
    const { nome, profissao, local, avaliacao, foto } = profissional;

    return (
        <div className={`card ${styles.profissionalCard}`}>
            <div className={styles.estrela}>
                <i className="bi bi-star-fill"></i>
            </div>

            <div className="card-body p-3">
                <div className="d-flex align-items-center gap-3">
                    <img
                        src={foto}
                        alt={`Foto de ${nome}`}
                        className={styles.foto}
                        loading="lazy"
                        onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = "/avatar.png";
                        }}
                    />

                    <div className="flex-grow-1">
                        <h6 className="fw-bold mb-1">{nome}</h6>

                        <span className="text-primary small fw-semibold">
                            {profissao}
                        </span>

                        <div className="text-secondary small mt-1">
                            <i className="bi bi-geo-alt me-1"></i>
                            {local}
                        </div>

                        <div className="small mt-1">
                            <i className="bi bi-star-fill text-warning me-1"></i>
                            <strong>{avaliacao}</strong>
                        </div>
                    </div>
                </div>

                <Link
                    href="/servicos"
                    className={`btn btn-outline-primary btn-sm w-100 mt-3 ${styles.botao}`}
                >
                    Ver perfil
                    <i className="bi bi-arrow-right ms-2"></i>
                </Link>
            </div>
        </div>
    );
}

export default function CardProfissional() {
    // Duplica a lista para manter o movimento infinito
    const profissionais = [...dadosProfissionais, ...dadosProfissionais];

    return (
        <div className={styles.carrossel}>
            <div className={styles.trilho}>
                {profissionais.map((profissional, i) => (
                    <div className={styles.item} key={`${profissional.nome}-${i}`}>
                        <Card profissional={profissional} />
                    </div>
                ))}
            </div>
        </div>
    );
}