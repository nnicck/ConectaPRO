"use client";
import Sidebar from "@/components/Sidebar"
import Link from "next/link"
import CardsDashboard from "@/components/CardsDashboard"
import { useEffect, useState } from "react"; 
//UseEffect - Quando a tela atualizar vai pegar as informações
//UseState - Para Mostrar as informações na tela

export default function InicioProfissional() {
    const [contratos, setContratos] = useState([]);
    const [usuario, setUsuario] = useState(null);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        async function carregarDados() {
            try {
                // Verifica quem está logado
                const respostaAutenticar = await fetch(
                    "http://localhost:3001/api/autenticar/me",
                    { credentials: "include" }
                );

                if (!respostaAutenticar.ok) {
                    setUsuario(null);
                    return;
                }

                const resultadoAutenticar = await respostaAutenticar.json();
                const usuarioLogado = resultadoAutenticar.dados;

                // Verifica se é profissional
                if (usuarioLogado.tipo !== "profissional") {
                    setUsuario(null);
                    return;
                }

                // Busca os dados do profissional
                const respostaProfissional = await fetch(
                    `http://localhost:3001/api/profissional/${usuarioLogado.id}`,
                    { credentials: "include" }
                );

                if (!respostaProfissional.ok) {
                    throw new Error(
                        "Não foi possível carregar os dados do profissional."
                    );
                }

                const resultadoProfissional = await respostaProfissional.json();

                setUsuario({
                    ...usuarioLogado,
                    ...resultadoProfissional.dados
                });

                // Busca os contratos
                const respostaContratos = await fetch(
                    "http://localhost:3001/api/contrato",
                    { credentials: "include" }
                );

                if (!respostaContratos.ok) {
                    throw new Error("Não foi possível carregar os contratos.");
                }

                const resultadoContratos = await respostaContratos.json();

                // Filtra os contratos do profissional logado
                const contratosProfissional = resultadoContratos.dados.filter(
                    contrato =>
                        Number(contrato.id_profissional) ===
                        Number(usuarioLogado.id)
                );

                // Busca os serviços
                const respostaServicos = await fetch(
                    "http://localhost:3001/api/servico",
                    { credentials: "include" }
                );

                if (!respostaServicos.ok) {
                    throw new Error("Não foi possível carregar os serviços.");
                }

                const resultadoServicos = await respostaServicos.json();

                // Busca os clientes
                const respostaClientes = await fetch(
                    "http://localhost:3001/api/cliente",
                    { credentials: "include" }
                );

                if (!respostaClientes.ok) {
                    throw new Error("Não foi possível carregar os clientes.");
                }

                const resultadoClientes = await respostaClientes.json();

                // Relaciona cada contrato ao serviço e ao cliente
                const contratosComDados = contratosProfissional.map(contrato => {
                    const servico = resultadoServicos.dados.find(
                        item =>
                            Number(item.id_servico) ===
                            Number(contrato.id_servico)
                    );

                    const cliente = resultadoClientes.dados.find(
                        item =>
                            Number(item.id_cliente) ===
                            Number(contrato.id_cliente)
                    );

                    return {
                        ...contrato,
                        nome_servico:
                            servico?.nome_servico || "Serviço não encontrado",
                        nome_cliente:
                            cliente?.nome || "Cliente não encontrado",
                        preco: Number(servico?.preco || 0)
                    };
                });

                setContratos(contratosComDados);

            } catch (erro) {
                console.error("Erro ao carregar profissional:", erro);
                setUsuario(null);
            } finally {
                setCarregando(false);
            }
        }

        carregarDados();
    }, []);

    // Filtra os contratos por status
    const contratosAndamento = contratos.filter(
        contrato => contrato.status === "em andamento"
    );

    const contratosPendentes = contratos.filter(
        contrato => contrato.status === "pendente"
    );

    const contratosConcluidos = contratos.filter(
        contrato => contrato.status === "concluído"
    );

    // Soma os preços dos contratos em andamento
    const valor = contratosConcluidos.reduce(
        (total, contrato) => total + Number(contrato.preco),
        0
    );

    if (carregando) {
        return <p className="p-4">Carregando...</p>;
    }

    if (!usuario) {
        return <p className="p-4">Usuário não autenticado ou sem permissão.</p>;
    }

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
                <h1>Olá, {usuario.nome}</h1>
                <p>Seu perfil está ativo para os clientes</p>
                <div className="d-flex gap-4">
                    <CardsDashboard titCardDashboard="Serviços Solicitados" numDashboard={contratosPendentes.length}></CardsDashboard>
                    <CardsDashboard titCardDashboard="Serviços Em Andamentos" numDashboard={contratosAndamento.length}></CardsDashboard>
                    <CardsDashboard titCardDashboard="Serviços Concluidos" numDashboard={contratosConcluidos.length}></CardsDashboard>
                    <CardsDashboard titCardDashboard="Ganho no mês" numDashboard={valor}></CardsDashboard>
                </div>
            </div>

            <div className="mt-5">
                <h3>Meus serviços</h3>
                <p>Vejas seus serviços em andamento e histórico</p>
                <div className="table-responsive mt-4">
                <table className="table align-middle">
                    <thead>
                        <tr>
                            <th>Serviço</th>
                            <th>Cliente</th>
                            <th>Data de conclusão</th>
                            <th>Status</th>
                            <th>Valor</th>
                        </tr>
                    </thead>

                    <tbody>
                        {contratosConcluidos.length > 0 ? (
                            contratosConcluidos.map(contrato => (
                                <tr key={contrato.id_contrato}>
                                    <td>{contrato.observacao}</td>

                                    <td>{contrato.nome_cliente}</td>

                                    <td>
                                        {contrato.data_conclusao
                                        ? new Date(contrato.data_conclusao).toLocaleDateString("pt-BR", {
                                            timeZone: "UTC"
                                        })
                                        : "-"}
                                    </td>

                                    <td>
                                        <span className="badge bg-success">
                                            {contrato.status}
                                        </span>
                                    </td>

                                    <td>
                                        {Number(contrato.preco).toLocaleString("pt-BR", {
                                            style: "currency",
                                            currency: "BRL"
                                        })}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">
                                    Nenhum serviço concluído.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

                </div>
        </div>
        </main>
        </>
    )
}