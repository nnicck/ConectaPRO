
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

                if (
                    !isset($resultado["dados"]) &&
                    array_is_list($resultado)
                ) {
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

                    $destino = $tipoUsuario === "cliente"
                        ? "inicioCliente.php"
                        : "inicioProfissional.php";

                    header("Location: " . $destino);
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

    <?php include_once "includes/metalinks.php"; ?>

    <link rel="stylesheet" href="./css/login.css">
</head>
<body>

<?php include "./partials/topbar.php"; ?>

<main class="login-page d-flex min-vh-100">

    <section class="side-banner d-flex flex-column justify-content-between">
        <div class="banner-content">
            <h1 class="text-center">ConectaPRO</h1>

            <h2>
                Conectando clientes aos melhores
                profissionais autônomos.
            </h2>

            <p>
                Encontre eletricistas, diaristas, pedreiros,
                encanadores e muitos outros profissionais
                em um único lugar.
            </p>
        </div>

        <div class="banner-benefits">
            <p>✔️ Profissionais verificados.</p>
            <p>⭐ Avaliações e histórico de serviços.</p>
            <p>💬 Chat e acompanhamento da contratação.</p>
        </div>
    </section>

    <section class="login-form d-flex align-items-center justify-content-center">
        <form
            id="formLogin"
            class="w-100"
            method="POST"
            action="login.php"
        >
            <div class="mb-4">
                <h1 class="text-center">Entrar</h1>
                <p class="text-center">
                    Faça login para acessar sua conta.
                </p>
            </div>

            <input
                type="hidden"
                name="tipoUsuario"
                id="tipoUsuario"
                value="<?= htmlspecialchars($tipoUsuario ?? "", ENT_QUOTES, "UTF-8") ?>"
            >

            <div class="user-type d-flex gap-3 mb-4">
                <button
                    type="button"
                    class="btn btn-tipo flex-fill"
                    data-tipo="cliente"
                    aria-pressed="<?= ($tipoUsuario ?? "") === "cliente" ? "true" : "false" ?>"
                >
                    Cliente
                </button>

                <button
                    type="button"
                    class="btn btn-tipo flex-fill"
                    data-tipo="profissional"
                    aria-pressed="<?= ($tipoUsuario ?? "") === "profissional" ? "true" : "false" ?>"
                >
                    Profissional
                </button>
            </div>

            <div class="mb-3">
                <label for="email" class="form-label">E-mail</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    class="form-control form-control-lg"
                    placeholder="Digite seu e-mail"
                    autocomplete="email"
                    value="<?= htmlspecialchars($email ?? "", ENT_QUOTES, "UTF-8") ?>"
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

            <p class="mb-4">
                Ainda não tem uma conta?
                <a href="cadastroCliente.php">Cadastre-se</a>
            </p>

            <?php if ($erro !== ""): ?>
                <p class="text-danger" role="alert">
                    <?= htmlspecialchars($erro, ENT_QUOTES, "UTF-8") ?>
                </p>
            <?php endif; ?>

            <button
                type="submit"
                id="btnAcessar"
                class="btn btn-acessar w-100 py-3"
            >
                Acessar
            </button>
        </form>
    </section>

</main>

<script>
    const botoesTipo = document.querySelectorAll(".btn-tipo");
    const campoTipo = document.getElementById("tipoUsuario");
    const formLogin = document.getElementById("formLogin");

    function atualizarTipoSelecionado() {
        botoesTipo.forEach((botao) => {
            const selecionado =
                botao.dataset.tipo === campoTipo.value;

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

    formLogin.addEventListener("submit", (event) => {
        if (!campoTipo.value) {
            event.preventDefault();
            alert("Selecione Cliente ou Profissional.");
        }
    });

    atualizarTipoSelecionado();
</script>

<?php include "./partials/bottom.php"; ?>

</body>
</html>
