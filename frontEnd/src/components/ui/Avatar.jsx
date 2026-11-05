"use client";

// Foto redonda de perfil. Se não houver foto (ou ela não carregar), mostra o avatar padrão.
export default function Avatar({ src, nome = "", tamanho = 48, className = "" }) {
    return (
        <img
            src={src || "/avatar.png"}
            alt={nome ? `Foto de ${nome}` : "Foto de perfil"}
            width={tamanho}
            height={tamanho}
            className={`avatar ${className}`}
            style={{ width: tamanho, height: tamanho }}
            onError={(evento) => {
                evento.currentTarget.onerror = null;
                evento.currentTarget.src = "/avatar.png";
            }}
        />
    );
}
