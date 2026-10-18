import Sidebar from "@/components/Sidebar"
import Link from "next/link"
export default function inicioProfissional(){
    return(
        <>
        <main className="d-flex gap-3">
        <Sidebar></Sidebar>

        <div className="container">
            <form className="mt-4 w-100">
                <div className="input-group">
                <input className="form-control border-0 rounded-1 py-3 shadow" placeholder="O que você precisa?" />
                <Link href="/" className="btn btn-primary fw-bold px-4 rounded-1 ms-3 shadow d-flex align-items-center">Buscar</Link>
                </div>
            </form>

            <div className="mt-5">
                <h1>Olá, nome!</h1>
                <p>Seu perfil está ativo para os clientes</p>
            </div>




        </div>





        </main>
        
        
        </>
    )
}