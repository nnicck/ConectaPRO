import "bootstrap/dist/css/bootstrap.min.css";

import Link from "next/link";
export default function Sidebar() {
return (
<div className="bg-dark text-white d-flex flex-column gap-4 p-3"
style={{ width: "250px", minHeight: "100vh" }}>

        <div className="text-center mb-4">
            <img
                src="/#"
                alt="Foto de perfil"
                className="rounded-circle mb-2"
                width="70"
                height="70"
            />
            <div>Nicole</div>
        </div>

        <Link href="/inicioProfissional" className="text-white text-decoration-none p-2 ">
            Inicio
        </Link>

        <Link href="/inicioProfissional/solicitacoesProfissional" className="text-white text-decoration-none p-2">
            Solicitações
        </Link>

        <Link href="/dashboard" className="text-white text-decoration-none p-2">
            Dashboard
        </Link>

    </div>
);

}