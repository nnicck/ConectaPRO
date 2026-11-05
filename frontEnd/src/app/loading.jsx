import LoadingTruck from "@/components/LoadingTruck";

// Tela mostrada pelo Next.js enquanto uma página está sendo carregada.
// O caminhão fica centralizado na horizontal e na vertical.
export default function Loading() {
    return (
        <main
            className="flex-grow-1 d-flex flex-column align-items-center justify-content-center gap-3 py-5"
            style={{ minHeight: "75vh" }}
        >
            <LoadingTruck />
            <p className="fw-semibold texto-suave mb-0">Carregando...</p>
        </main>
    );
}
