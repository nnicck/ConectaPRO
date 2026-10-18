import LoadingBuddy from "@/components/loading-buddy";

export default function Loading(){
    return (
        <main className="d-flex flex-column align-items-center justify-content-center gap-3">
            <LoadingBuddy/>
            <h2>Carregando...</h2>
        </main>
    )
}