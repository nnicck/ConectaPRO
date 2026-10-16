import InfoPrimaria from "@/components/perfilProfissional-comp/infoPrimaria";
import Navegacao from "@/components/perfilProfissional-comp/navegacao";
import Servicos from "@/components/perfilProfissional-comp/servicos";
import Avaliacoes from "@/components/perfilProfissional-comp/avaliacoes";
import "./peprofissional.css";

export default function Perfil() {
  return (
    <main className="container py-4">
      <div className="perfil d-flex flex-column gap-4">
        <InfoPrimaria />

        <Navegacao />

        <section id="desc">
          <p className="desc">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Eos repellendus dolore iure ducimus maiores delectus
            dolores illum perferendis amet sint odit dolorum totam,
            inventore, maxime nihil optio explicabo ea! Nulla.
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Sed quasi, accusantium harum eaque quisquam expedita
            assumenda odio dolore illo, ipsum architecto. Dolor nobis
            ut itaque error similique repudiandae eos doloribus.
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Sunt deserunt tenetur distinctio porro vero unde maxime
            repudiandae commodi!
          </p>
        </section>

        <Servicos />

        <Avaliacoes />
      </div>
    </main>
  );
}