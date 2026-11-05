import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@fontsource-variable/inter"; // fonte Inter instalada pelo npm (funciona sem internet)
import "./globals.css";

import LayoutPrincipal from "@/components/LayoutPrincipal";
import { SessaoProvider } from "@/lib/sessao";
import RegistroStyledComponents from "@/lib/registroStyledComponents";

export const metadata = {
  title: "ConectaPRO",
  description: "ConectaPro é um site de contratação de profissionais autônomos que conecta clientes a prestadores de serviços de forma rápida, prática e segura. A plataforma permite buscar profissionais, visualizar perfis, contratar serviços, agendar atendimentos e acompanhar solicitações em um só lugar",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        {/* faz o CSS do styled-components (LoadingTruck) chegar junto com o HTML */}
        <RegistroStyledComponents>
          <SessaoProvider>
            <LayoutPrincipal>
              {children}
            </LayoutPrincipal>
          </SessaoProvider>
        </RegistroStyledComponents>
      </body>
    </html>
  );
}
