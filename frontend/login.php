<?php
session_start();

$erro = "";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $email = trim($_POST["email"] ?? "");
    $senha = $_POST["senha"] ?? "";
    $tipoUsuario = $_POST["tipoUsuario"] ?? "";

    if (!in_array($tipoUsuario, ["cliente", "profissional"], true)) {
        $erro = "Selecione Cliente ou Profissional.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $erro = "Informe um e-mail válido.";
    } elseif ($senha === "") {
        $erro = "Informe sua senha.";
    } else {
        // Consulta a rota correspondente ao tipo selecionado
        $endpoint = $tipoUsuario === "cliente"
            ? "http://localhost:3001/api/cliente"
            : "http://localhost:3001/api/profissional";

        $opcoes = [
            "http" => [
                "method" => "GET",
                "ignore_errors" => true,
                "timeout" => 10
            ]
        ];

        $contexto = stream_context_create($opcoes);
        $resposta = @file_get_contents($endpoint, false, $contexto);

        if ($resposta === false) {
            $erro = "Não foi possível conectar ao servidor.";
        } else {
            $resultado = json_decode($resposta, true);

            if (!is_array($resultado)) {
                $erro = "Resposta inválida do servidor.";
            } else {
                $usuarios = $resultado["dados"] ?? [];

                // Aceita também uma resposta que seja diretamente uma lista
                if (!isset($resultado["dados"]) && array_is_list($resultado)) {
                    $usuarios = $resultado;
                }

                if (!is_array($usuarios)) {
                    $usuarios = [];
                }

                $usuarioEncontrado = null;

                foreach ($usuarios as $usuario) {
                    if (
                        is_array($usuario) &&
                        strtolower(trim($usuario["email"] ?? "")) === strtolower($email) &&
                        ($usuario["senha"] ?? "") === $senha
                    ) {
                        $usuarioEncontrado = $usuario;
                        break;
                    }
                }

                if ($usuarioEncontrado === null) {
                    $erro = "E-mail ou senha inválidos.";
                } else {
                    session_regenerate_id(true);

                    $_SESSION["usuario"] = [
                        "id" => $usuarioEncontrado["id"]
                            ?? $usuarioEncontrado["id_cliente"]
                            ?? $usuarioEncontrado["id_profissional"]
                            ?? null,
                        "nome" => $usuarioEncontrado["nome"] ?? "",
                        "email" => $usuarioEncontrado["email"] ?? $email,
                        "tipo" => $tipoUsuario
                    ];

                    if ($tipoUsuario === "cliente") {
                        header("Location: inicioCliente.php");
                    } else {
                        header("Location: inicioProfissional.php");
                    }

                    exit;
                }
            }
        }
    }
}
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Entrar | ConectaPRO</title>

    <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
    >

    <link rel="stylesheet" href="./css/login.css">
    <link rel="stylesheet" href="./css/topBar.css">
</head>

<body>

<?php include './partials/topbar.php' ?>
<main class="d-flex  login-layout">

    <!-- Lado esquerdo: banner -->
    <section class="side-banner d-flex flex-column justify-content-between">

        <div class="banner-conteudo">
            <h1 class="text-center mb-4">ConectaPRO</h1>

            <h2>
                Conectando clientes aos melhores profissionais autônomos.
            </h2>

            <p class="mt-4">
                Encontre eletricistas, diaristas, pedreiros,
                encanadores e muitos outros profissionais verificados
                em um único lugar.
            </p>
        </div>

        <div class="banner-beneficios">
            <p>✔️ Profissionais verificados.</p>
            <p>⭐ Avaliações e histórico de serviços.</p>
            <p>💬 Chat e acompanhamento da contratação.</p>
        </div>

    </section>

    <!-- Lado direito: formulário -->
    <section class="login-conteudo d-flex justify-content-center">

        <form method="POST" action="login.php" class="formulario">

            <div class="text-center login-titulo">
                <h2>Entrar</h2>
                <p class="subtitulo">
                    Faça login para acessar sua conta.
                </p>
            </div>

            <!-- Tipo de usuário -->
            <div class="tipo-usuario mb-4">

                <button
                    type="button"
                    class="btn-tipo"
                    data-tipo="cliente"
                    aria-pressed="false"
                >
                    Cliente
                </button>

                <button
                    type="button"
                    class="btn-tipo"
                    data-tipo="profissional"
                    aria-pressed="false"
                >
                    Profissional
                </button>

            </div>

            <input
                type="hidden"
                name="tipoUsuario"
                id="tipoUsuario"
                value="<?= htmlspecialchars($_POST["tipoUsuario"] ?? "", ENT_QUOTES, "UTF-8") ?>"
            >

            <div class="mb-4">
                <label for="email" class="form-label">E-mail</label>

                <input
                    type="email"
                    name="email"
                    id="email"
                    class="form-control form-control-lg"
                    placeholder="Digite seu e-mail"
                    autocomplete="email"
                    value="<?= htmlspecialchars($_POST["email"] ?? "", ENT_QUOTES, "UTF-8") ?>"
                    required
                >
            </div>

            <div class="mb-3">
                <label for="senha" class="form-label">Senha</label>

                <input
                    type="password"
                    name="senha"
                    id="senha"
                    class="form-control form-control-lg"
                    placeholder="Digite sua senha"
                    autocomplete="current-password"
                    required
                >
            </div>

            <p class="link-cadastro mb-4">
                Ainda não tem uma conta?
                <a href="cadastro.php">Cadastre-se</a>
            </p>

            <?php if ($erro !== ""): ?>
                <div class="alert alert-danger" role="alert">
                    <?= htmlspecialchars($erro, ENT_QUOTES, "UTF-8") ?>
                </div>
            <?php endif; ?>

            <button type="submit" class="btn-acessar">
                Acessar
            </button>

        </form>

    </section>

</main>

<script>
    const botoesTipo = document.querySelectorAll(".btn-tipo");
    const campoTipo = document.getElementById("tipoUsuario");

    function atualizarTipoSelecionado() {
        botoesTipo.forEach((botao) => {
            const selecionado = botao.dataset.tipo === campoTipo.value;

            botao.classList.toggle("selecionado", selecionado);
            botao.setAttribute(
                "aria-pressed",
                selecionado ? "true" : "false"
            );
        });
    }

    botoesTipo.forEach((botao) => {
        botao.addEventListener("click", () => {
            campoTipo.value = botao.dataset.tipo;
            atualizarTipoSelecionado();
        });
    });

    atualizarTipoSelecionado();
</script>

<?php include './partials/bottom.php' ?>

</body>
</html>