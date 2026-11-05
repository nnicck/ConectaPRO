/** @type {import('next').NextConfig} */
const nextConfig = {
  // deixa o styled-components gerar nomes de classe iguais no servidor e no navegador
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
