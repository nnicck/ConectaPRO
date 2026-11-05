"use client";

// Campos de endereço usados no cadastro e no editar perfil. Tudo é digitado à mão.
//   endereco    -> objeto { cep, rua, numero, bairro, cidade, estado }
//   aoMudar     -> recebe o objeto atualizado a cada letra digitada
//   obrigatorio -> marca rua, número, bairro, cidade e estado com * e "required"
export default function CamposEndereco({ endereco, aoMudar, obrigatorio = false }) {
    // Atualiza só o campo que mudou, mantendo os outros
    function mudar(campo, valor) {
        aoMudar({ ...endereco, [campo]: valor });
    }

    const marca = obrigatorio ? " *" : "";

    return (
        <div className="row g-3">
            <div className="col-md-4">
                <label htmlFor="cep" className="form-label">CEP</label>
                <input id="cep" className="form-control" maxLength={9} placeholder="00000-000"
                    value={endereco.cep} onChange={(e) => mudar("cep", e.target.value)} />
            </div>
            <div className="col-md-8">
                <label htmlFor="rua" className="form-label">Rua{marca}</label>
                <input id="rua" className="form-control" maxLength={120} required={obrigatorio}
                    value={endereco.rua} onChange={(e) => mudar("rua", e.target.value)} />
            </div>
            <div className="col-md-8">
                <label htmlFor="bairro" className="form-label">Bairro{marca}</label>
                <input id="bairro" className="form-control" maxLength={80} required={obrigatorio}
                    value={endereco.bairro} onChange={(e) => mudar("bairro", e.target.value)} />
            </div>
            <div className="col-md-4">
                <label htmlFor="numero" className="form-label">Número{marca}</label>
                <input id="numero" className="form-control" maxLength={10} required={obrigatorio}
                    value={endereco.numero} onChange={(e) => mudar("numero", e.target.value)} />
            </div>
            <div className="col-md-8">
                <label htmlFor="cidade" className="form-label">Cidade{marca}</label>
                <input id="cidade" className="form-control" maxLength={80} required={obrigatorio}
                    value={endereco.cidade} onChange={(e) => mudar("cidade", e.target.value)} />
            </div>
            <div className="col-md-4">
                <label htmlFor="estado" className="form-label">Estado (UF){marca}</label>
                <input id="estado" className="form-control text-uppercase" maxLength={2} placeholder="SP" required={obrigatorio}
                    value={endereco.estado} onChange={(e) => mudar("estado", e.target.value)} />
            </div>
        </div>
    );
}
