import Avatar from "@/components/ui/Avatar";
import { anoDe, cidadeDoEndereco, formatarTelefone } from "@/lib/formatar";

// Cabeçalho do perfil público do profissional:
// capa colorida, foto com selo de verificado, nome, profissão e etiquetas de contato.
//   aoVerServicos -> função do botão "Ver serviços" (troca para a aba Serviços)
export default function InfoPrimaria({ profissional, aoVerServicos }) {
    return (
        <section className="card-cp perfil-cabecalho">
            <div className="perfil-capa" />

            <div className="perfil-corpo">
                <div className="d-flex flex-column flex-md-row align-items-center align-items-md-end gap-3 text-center text-md-start">
                    <div className="perfil-foto flex-shrink-0">
                        <Avatar src={profissional.foto} nome={profissional.nome} tamanho={120} />
                        <span className="selo-verificado" title="Profissional verificado"><i className="bi bi-check-lg"></i></span>
                    </div>

                    <div className="flex-grow-1 min-w-0 pb-md-1">
                        <h1 className="h3 fw-bold mb-1">{profissional.nome}</h1>
                        <div className="text-primary fw-semibold">{profissional.profissao}</div>
                    </div>

                    {aoVerServicos && (
                        <button type="button" className="btn btn-primary px-4 mb-md-1" onClick={aoVerServicos}>
                            <i className="bi bi-briefcase me-2"></i>Ver serviços
                        </button>
                    )}
                </div>

                {/* etiquetas com ícone */}
                <div className="d-flex flex-wrap justify-content-center justify-content-md-start align-items-center gap-2 mt-3">
                    <span className="info-chip"><i className="bi bi-geo-alt"></i>{cidadeDoEndereco(profissional.localizacao)}</span>
                    <span className="info-chip"><i className="bi bi-calendar3"></i>Membro desde {anoDe(profissional.data_ingresso)}</span>
                    <span className="info-chip"><i className="bi bi-telephone"></i>{formatarTelefone(profissional.telefone)}</span>
                    <span className="info-chip text-break"><i className="bi bi-envelope"></i>{profissional.email}</span>
                </div>
            </div>
        </section>
    );
}
