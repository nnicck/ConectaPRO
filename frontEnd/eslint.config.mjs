import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = defineConfig([
  ...nextVitals,
  {
    rules: {
      // As páginas carregam dados com o padrão "useEffect(() => { carregar(); }, [carregar])".
      // Essa regra nova do React acusa esse padrão (muito usado e correto aqui), então foi desligada.
      "react-hooks/set-state-in-effect": "off",
      // Usamos <img> comum de propósito: as fotos vêm do back-end (outra porta) e de uploads.
      "@next/next/no-img-element": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
