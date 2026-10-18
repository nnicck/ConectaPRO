import BannerHome from "@/components/home/BannerHome";
import ServicosHome from "@/components/home/ServicosHome";
import ProfissionaisHome from "@/components/home/ProfissionaisHome";
import ComoFuncionaHome from "@/components/home/ComoFuncionaHome";
import PorQueEscolherHome from "@/components/home/PorQueEscolherHome";

export default function Home() {
  return (
    <main>
      {/* banner */}
      <BannerHome/>

      {/* seção serviços */}
      <ServicosHome/>

      {/* Profissionais em destaque */}
      <ProfissionaisHome/>

      {/* COMO FUNCIONA */}
      <ComoFuncionaHome/>

      {/* POR QUE ESCOLHER O CONECTAPRO */}
      <PorQueEscolherHome/>
    </main>
  );
}
