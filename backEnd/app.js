// =====================================================================
// app.js — monta o servidor Express do ConectaPRO
//
// A organização segue sempre o mesmo caminho:
//   rota (routes)  ->  controller (lê a requisição e responde)
//                  ->  service    (regras de negócio)
//                  ->  model      (SQL no banco de dados)
// =====================================================================

import express from "express";
import cors from "cors";
import session from "express-session";
import { criarPool, verificarBanco } from "./config/database.js";

// ---------- Models (acesso ao banco) ----------
import { criarClienteModel } from "./models/ClienteModel.js";
import { criarProfissionalModel } from "./models/ProfissionalModel.js";
import { criarServicoModel } from "./models/ServicoModel.js";
import { criarMidiaModel } from "./models/MidiaModel.js";
import { criarContratoModel } from "./models/ContratoModel.js";

// ---------- Services (regras de negócio) ----------
import { criarClienteService } from "./services/ClienteService.js";
import { criarProfissionalService } from "./services/ProfissionalService.js";
import { criarServicoService } from "./services/ServicoService.js";
import { criarMidiaService } from "./services/MidiaService.js";
import { criarContratoService } from "./services/ContratoService.js";
import { criarAutenticarService } from "./services/AutenticarService.js";

// ---------- Controllers ----------
import { criarClienteController } from "./controllers/ClienteController.js";
import { criarProfissionalController } from "./controllers/ProfissionalController.js";
import { criarServicoController } from "./controllers/ServicoController.js";
import { criarMidiaController } from "./controllers/MidiaController.js";
import { criarContratoController } from "./controllers/ContratoController.js";
import { criarAutenticarController } from "./controllers/AutenticarController.js";
import { criarUploadController, PASTA_UPLOADS } from "./controllers/UploadController.js";

// ---------- Rotas ----------
// (nomes de arquivo em minúsculo: Linux/Docker diferenciam maiúsculas de minúsculas)
import { criarClienteRoutes } from "./routes/clienteRoutes.js";
import { criarProfissionalRoutes } from "./routes/profissionalRoutes.js";
import { criarServicoRoutes } from "./routes/servicoRoutes.js";
import { criarMidiaRoutes } from "./routes/midiaRoutes.js";
import { criarContratoRoutes } from "./routes/contratoRoutes.js";
import { criarAutenticarRoutes } from "./routes/autenticarRoutes.js";
import { criarUploadRoutes } from "./routes/uploadRoutes.js";

export const app = express();

// =====================================================================
// MIDDLEWARES (rodam antes de todas as rotas)
// =====================================================================

// CORS: o front-end (porta 3000) e o back-end (porta 3001) são "sites" diferentes.
// credentials: true permite enviar o cookie de login entre eles.
app.use(cors({ origin: ["http://localhost:3000", "http://127.0.0.1:3000"], credentials: true }));

// Lê o JSON do corpo da requisição (limite maior para caber a imagem em base64 do upload)
app.use(express.json({ limit: "8mb" }));

// No Express 5, req.body fica "undefined" quando a requisição não tem corpo
// (ex.: PUT ou PATCH vazio), o que quebrava as rotas. Aqui ele vira um objeto vazio.
app.use((req, res, next) => {
    req.body ??= {};
    next();
});

// Imagens enviadas ficam disponíveis em http://localhost:3001/uploads/<arquivo>
app.use("/uploads", express.static(PASTA_UPLOADS));

// Sessão de login (cookie). Sem SESSION_SECRET o express-session daria erro em TODAS as rotas,
// então usamos um valor padrão de desenvolvimento e avisamos no terminal.
if (!process.env.SESSION_SECRET) {
    console.warn("Aviso: SESSION_SECRET não está no .env. Usando um valor padrão de desenvolvimento.");
}

app.use(session({
    secret: process.env.SESSION_SECRET || "conectapro-segredo-de-desenvolvimento",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,               // o JavaScript da página não consegue ler o cookie
        secure: false,                // true só quando o site usar HTTPS
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000   // login dura 24 horas
    }
}));

// =====================================================================
// BANCO DE DADOS
// =====================================================================
const pool = criarPool();
await verificarBanco(pool); // só avisa no terminal se algo estiver errado

// =====================================================================
// MONTAGEM DAS CAMADAS (model -> service -> controller -> rotas)
// =====================================================================

// Models
const clienteModel = criarClienteModel({ pool });
const profissionalModel = criarProfissionalModel({ pool });
const servicoModel = criarServicoModel({ pool });
const midiaModel = criarMidiaModel({ pool });
const contratoModel = criarContratoModel({ pool });

// Services
const clienteService = criarClienteService({ clienteModel });
const profissionalService = criarProfissionalService({ profissionalModel });
const servicoService = criarServicoService({ servicoModel, profissionalModel, midiaModel });
const midiaService = criarMidiaService({ midiaModel });
const contratoService = criarContratoService({ contratoModel, servicoModel, profissionalModel });
const autenticarService = criarAutenticarService({ clienteModel, profissionalModel });

// Controllers
const clienteController = criarClienteController({ clienteService });
const profissionalController = criarProfissionalController({ profissionalService });
const servicoController = criarServicoController({ servicoService });
const midiaController = criarMidiaController({ midiaService });
const contratoController = criarContratoController({ contratoService });
const autenticarController = criarAutenticarController({ autenticarService });
const uploadController = criarUploadController();

// =====================================================================
// ROTAS
// =====================================================================

// Rota de teste: http://localhost:3001/api/check
app.get("/api/check", (req, res) => {
    res.status(200).json({ status: "ok", mensagem: "Servidor funcionando via HTTP" });
});

app.use("/api/cliente", criarClienteRoutes({ clienteController }));
app.use("/api/profissional", criarProfissionalRoutes({ profissionalController }));
app.use("/api/servico", criarServicoRoutes({ servicoController }));
app.use("/api/midia", criarMidiaRoutes({ midiaController }));
app.use("/api/contrato", criarContratoRoutes({ contratoController }));
app.use("/api/autenticar", criarAutenticarRoutes({ autenticarController }));
app.use("/api/upload", criarUploadRoutes({ uploadController }));

// Qualquer rota que não existe
app.use((req, res) => {
    res.status(404).json({ erro: `A rota ${req.method} ${req.originalUrl} não existe.` });
});

// Erros que nenhum controller tratou (último recurso)
app.use((erro, req, res, _next) => {
    // JSON mal formatado ou corpo grande demais
    if (erro.type === "entity.parse.failed") {
        return res.status(400).json({ erro: "JSON inválido no corpo da requisição" });
    }
    if (erro.type === "entity.too.large") {
        return res.status(413).json({ erro: "Arquivo grande demais" });
    }

    console.error(`Erro de sistema: ${erro.message}`);
    res.status(500).json({ erro: "Falha interna do servidor" });
});
