"use client";

import Link from "next/link";
import BarraNavegacao from "@/components/BarraNavegacao";
import EtapasContaProfissonal from "@/components/EtapasContaProfissional";
import Rodape from "@/components/Rodape";
import BotoesNavegacao from "@/components/BotoesNavegacao";

export default function SegurancaProf() {
return (
<div className="d-flex flex-column min-vh-100">
<header>
<BarraNavegacao/>
</header>

        <main className="container py-5 flex-grow-1">
            <div className="row justify-content-center mt-4">
                <div className="col-12 col-lg-8">

                    <EtapasContaProfissonal etapaAtiva={4} />

                    <div className="mb-4" style={{ marginTop: "100px" }}>
                            <h2 className="fw-bold text-center">
                                Segurança
                            </h2>
                    </div>

                    <form>
                        {/* NOVA SENHA */}
                        <div className="form-group mb-4">
                            <label
                                htmlFor="senha"
                                className="form-label"
                            >
                                Nova senha
                            </label>

                            <input
                                type="password"
                                className="form-control"
                                id="senha"
                                placeholder="Digite sua senha"
                                autoComplete="new-password"
                                required
                            />
                        </div>

                        {/* CONFIRMAR SENHA */}
                        <div className="form-group mb-4">
                            <label
                                htmlFor="confirmarSenha"
                                className="form-label"
                            >
                                Confirmar senha
                            </label>

                            <input
                                type="password"
                                className="form-control"
                                id="confirmarSenha"
                                placeholder="Confirme sua senha"
                                autoComplete="new-password"
                                required
                            />
                        </div>

                        {/* BOTÃO PRÓXIMO */}
                       

                        <BotoesNavegacao
                        voltar="/criarContaProfissional/enderecoProf"
                         proximo="#"
                        />
                        
                    </form>

                </div>
            </div>
        </main>

        <Rodape />
    </div>
);

}