"use client";

// Menu lateral escuro do painel do profissional.

import Link from "next/link";
import { usePathname } from "next/navigation";
import Avatar from "@/components/ui/Avatar";

const MENU = [
    { href: "/inicioProfissional", rotulo: "Início" },
    { href: "/inicioProfissional/meusServicos", rotulo: "Meus serviços" },
    { href: "/inicioProfissional/solicitacoesProfissional", rotulo: "Solicitações" },
    { href: "/inicioProfissional/agenda", rotulo: "Agenda/Financeiro" },
    { href: "/inicioProfissional/editarPerfil", rotulo: "Editar perfil" }
];

// Menu lateral escuro do painel do profissional
export default function Sidebar({ profissional, aoSair }) {
    const caminho = usePathname();

    return (
        <aside className="sidebar-cp d-flex flex-column py-3 py-lg-4">
            {/* No computador: foto grande centralizada. No celular: foto pequena ao lado do nome. */}
            <div className="sidebar-topo d-flex flex-lg-column align-items-center gap-3 gap-lg-0 px-3 mb-2 mb-lg-5 text-lg-center">
                <Avatar src={profissional?.foto} nome={profissional?.nome} tamanho={84} className="mb-lg-3 border border-2 border-white" />
                <div className="min-w-0">
                    <div className="fw-semibold text-truncate">{profissional?.nome ?? "..."}</div>
                    {profissional && (
                        <Link href={`/perfilProfissional/${profissional.id_profissional}`} className="small text-white-50">
                            Ver meu perfil público
                        </Link>
                    )}
                </div>
                <button type="button" onClick={aoSair} className="btn btn-sm btn-outline-light ms-auto d-lg-none">Sair</button>
            </div>

            <nav className="sidebar-menu d-flex flex-row flex-lg-column flex-grow-1 pe-lg-1">
                {MENU.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`link-menu ${caminho === item.href ? "ativo" : ""}`}
                    >
                        {item.rotulo}
                    </Link>
                ))}
            </nav>

            <button type="button" onClick={aoSair} className="link-menu btn btn-link border-0 w-100 mt-3 d-none d-lg-block">
                Sair
            </button>
        </aside>
    );
}
