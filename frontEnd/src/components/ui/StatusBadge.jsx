import { STATUS } from "@/lib/formatar";

// Etiqueta colorida com o status do contrato (pendente, concluído...)
export default function StatusBadge({ status }) {
    const info = STATUS[status] ?? { rotulo: status, cor: "secondary" };

    return (
        <span className={`badge-status bg-${info.cor}-subtle text-${info.cor}-emphasis border border-${info.cor}-subtle`}>
            {info.rotulo}
        </span>
    );
}
