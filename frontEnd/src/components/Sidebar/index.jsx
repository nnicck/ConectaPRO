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

        <Link href="/estoque" className="text-white text-decoration-none p-2 sidebar-link">
            Estoque
        </Link>

        <Link href="/cadastro" className="text-white text-decoration-none p-2 sidebar-link">
            Cadastro
        </Link>

        <Link href="/financeiro" className="text-white text-decoration-none p-2 sidebar-link">
            Financeiro
        </Link>

        <Link href="/dashboard" className="text-white text-decoration-none p-2 sidebar-link">
            Dashboard
        </Link>

    </div>
);

}