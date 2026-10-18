import express from "express";
import cors from "cors";
import session from "express-session";
import { criarPool } from "./config/database.js";

// Models
import { criarClienteModel } from "./models/ClienteModel.js";
import { criarProfissionalModel } from "./models/ProfissionalModel.js";
import { criarServicoModel } from "./models/ServicoModel.js";
import { criarMidiaModel } from "./models/MidiaModel.js";
import { criarAvaliacaoModel } from "./models/AvaliacaoModel.js";
import { criarContratoModel } from "./models/ContratoModel.js";

// Services
import { criarClienteService } from "./services/ClienteService.js";
import { criarProfissionalService } from "./services/ProfissionalService.js";
import { criarServicoService } from "./services/ServicoService.js";
import { criarMidiaService } from "./services/MidiaService.js";
import { criarAvaliacaoService } from "./services/AvaliacaoService.js";
import { criarContratoService } from "./services/ContratoService.js";

// Controllers
import { criarClienteController } from "./controllers/ClienteController.js";
import { criarProfissionalController } from "./controllers/ProfissionalController.js";
import { criarServicoController } from "./controllers/ServicoController.js";
import { criarMidiaController } from "./controllers/MidiaController.js";
import { criarAvaliacaoController } from "./controllers/AvaliacaoController.js";
import { criarContratoController } from "./controllers/ContratoController.js";

// Routes
import { criarClienteRoutes } from "./routes/clienteRoutes.js";
import { criarProfissionalRoutes } from "./routes/profissionalRoutes.js";
import { criarServicoRoutes } from "./routes/servicoRoutes.js";
import { criarMidiaRoutes } from "./routes/midiaRoutes.js";
import { criarAvaliacaoRoutes } from "./routes/avaliacaoRoutes.js";
import { criarContratoRoutes } from "./routes/contratoRoutes.js";

// Autenticar (service, controller e routes)
import { criarAutenticarService } from "./services/AutenticarService.js";
import { criarAutenticarController } from "./controllers/AutenticarController.js";
import { criarAutenticarRoutes } from "./routes/AutenticarRoutes.js";

export const app = express();

// cors necessário pelo frontend e backend usarem portas diferentes
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// middleware: "ensina" o express a ler json no corpo da requisição
app.use(express.json());

// habilitar sessão
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000
    }
}));

// Conexão com o banco de dados
const pool = criarPool();

// ==================== CLIENTE ====================
const clienteModel = criarClienteModel({ pool });
const clienteService = criarClienteService({ clienteModel });
const clienteController = criarClienteController({ clienteService });
const clienteRoutes = criarClienteRoutes({ clienteController });

// ==================== PROFISSIONAL ====================
const profissionalModel = criarProfissionalModel({ pool });
const profissionalService = criarProfissionalService({ profissionalModel });
const profissionalController = criarProfissionalController({ profissionalService });
const profissionalRoutes = criarProfissionalRoutes({ profissionalController });

// ==================== SERVICO ====================
const servicoModel = criarServicoModel({ pool });
const servicoService = criarServicoService({ servicoModel });
const servicoController = criarServicoController({ servicoService });
const servicoRoutes = criarServicoRoutes({ servicoController });

// ==================== MIDIA ====================
const midiaModel = criarMidiaModel({ pool });
const midiaService = criarMidiaService({ midiaModel });
const midiaController = criarMidiaController({ midiaService });
const midiaRoutes = criarMidiaRoutes({ midiaController });

// ==================== AVALIACAO ====================
const avaliacaoModel = criarAvaliacaoModel({ pool });
const avaliacaoService = criarAvaliacaoService({ avaliacaoModel });
const avaliacaoController = criarAvaliacaoController({ avaliacaoService });
const avaliacaoRoutes = criarAvaliacaoRoutes({ avaliacaoController });

// ==================== CONTRATO ====================
const contratoModel = criarContratoModel({ pool });
const contratoService = criarContratoService({ contratoModel });
const contratoController = criarContratoController({ contratoService });
const contratoRoutes = criarContratoRoutes({ contratoController });

// ==================== AUTENTICAR ===================
const autenticarService = criarAutenticarService({ clienteModel, profissionalModel });
const autenticarController = criarAutenticarController({ autenticarService });
const autenticarRoutes = criarAutenticarRoutes({ autenticarController });

// Rota de teste do servidor
app.get("/api/check", (req, res) => {
    res.status(200).json({
        status: "ok",
        mensagem: "Servidor funcionando via HTTP"
    });
});

// Registro das rotas
app.use("/api/cliente", clienteRoutes);
app.use("/api/profissional", profissionalRoutes);
app.use("/api/servico", servicoRoutes);
app.use("/api/midia", midiaRoutes);
app.use("/api/avaliacao", avaliacaoRoutes);
app.use("/api/contrato", contratoRoutes);
app.use("/api/autenticar", autenticarRoutes);

app.use((req, res) => {
    res.status(404).json({
        erro: `A rota ${req.method} ${req.originalUrl} não existe.`
    });
});

app.use((erro, req, res, _next) => {
    console.error(`Erro de sistema: ${erro.message}`);

    res.status(500).json({
        erro: "Falha interna do servidor"
    });
});