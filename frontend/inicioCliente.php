<?php
session_start();

$usuario = null;
$listaContratos = [];
$erro = "";
$carregando = true;

// Verifica se existe uma sessão PHP autenticada.
if (!isset($_SESSION["usuario"])) {
    header("Location: login.php");
    exit;
}

$sessao = $_SESSION["usuario"];

if (($sessao["tipo"] ?? "") !== "cliente") {
    header("Location: login.php");
    exit;
}

$idUsuario = $sessao["id"] ?? null;

if (!$idUsuario) {
    $erro = "Não foi possível identificar sua conta.";
} else {
    $contexto = stream_context_create([
        "http" => [
            "method" => "GET",
            "timeout" => 10,
            "ignore_errors" => true
        ]
    ]);

    // Busca os dados completos do cliente.
    $urlCliente = "http://localhost:3001/api/cliente/"
        . rawurlencode((string) $idUsuario);

    $respostaCliente = @file_get_contents(
        $urlCliente,
        false,
        $contexto
    );

    if ($respostaCliente === false) {
        $erro = "Não foi possível carregar os dados do cliente.";
    } else {
        $resultadoCliente = json_decode($respostaCliente, true);
        $dadosCliente = $resultadoCliente["dados"] ?? null;

        if (!is_array($dadosCliente)) {
            $erro = "Os dados do cliente são inválidos.";
        } else {
            $usuario = array_merge($sessao, $dadosCliente);

            // Busca os contratos.
            $respostaContratos = @file_get_contents(
                "http://localhost:3001/api/contrato",
                false,
                $contexto
            );

            if ($respostaContratos === false) {
                $erro = "Não foi possível carregar os contratos.";
            } else {
                $resultadoContratos = json_decode(
                    $respostaContratos,
                    true
                );

                $contratos = $resultadoContratos["dados"] ?? [];

                if (!is_array($contratos)) {
                    $contratos = [];
                }

                foreach ($contratos as $contrato) {
                    if (
                        is_array($contrato) &&
                        (string) ($contrato["id_cliente"] ?? "") ===
                        (string) $idUsuario
                    ) {
                        $listaContratos[] = $contrato;
                    }
                }
            }
        }
    }
}

$carregando = false;

function escapar($valor): string
{
    return htmlspecialchars(
        (string) ($valor ?? ""),
        ENT_QUOTES,
        "UTF-8"
    );
}

function dataContrato($data): string
{
    if (!$data) {
        return "Não informada";
    }

    try {
        $dataObj = new DateTime($data, new DateTimeZone("UTC"));
        return $dataObj->format("d/m/Y");
    } catch (Exception $e) {
        return "Data inválida";
    }
}
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Início | ConectaPRO</title>

    <?php include_once "includes/metalinks.php"; ?>

    <link rel="stylesheet" href="./css/inicioCliente.css">
</head>
<body>

<?php include "./partials/topbar.php"; ?>

<main class="inicio-cliente d-flex flex-column gap-5 py-5">

    <?php if ($erro !== ""): ?>
        <div class="container alert alert-warning" role="alert">
            <?= escapar($erro) ?>
        </div>
    <?php endif; ?>

    <?php if ($usuario !== null): ?>

        <section class="perfil-cliente container-fluid d-flex align-items-center justify-content-start gap-4 px-5 w-75">
            <img
                src="<?= escapar(!empty($usuario["foto"]) ? $usuario["foto"] : "img/avatar.png") ?>"
                alt="Foto de perfil"
                class="foto-perfil border border-2 border-dark rounded-circle"
            >

            <div class="dados-cliente">
                <h1><?= escapar($usuario["nome"] ?? "Cliente") ?></h1>

                <p>
                    <strong>E-mail:</strong>
                    <?= escapar($usuario["email"] ?? "") ?>
                </p>

                <p>
                    <strong>Telefone:</strong>
                    <?= escapar($usuario["telefone"] ?? "Não informado") ?>
                </p>

                <p>
                    <strong>Endereço:</strong>
                    <?= escapar(
                        !empty($usuario["localizacao"])
                            ? $usuario["localizacao"]
                            : "Não informado"
                    ) ?>
                </p>
            </div>
        </section>

        <section class="atividade-cliente container-fluid d-flex flex-column px-5 gap-3 w-75">
            <h2>Atividade</h2>

            <div class="estatistica-contratos d-flex gap-5">
                <div class="d-flex flex-column align-items-center">
                    <h3><?= count($listaContratos) ?></h3>
                    <p>Serviços contratados</p>
                </div>
            </div>
        </section>

        <section class="servicos-cliente container-fluid d-flex flex-column px-5 gap-3 w-75">
            <h2>Serviços solicitados</h2>

            <div class="lista-servicos d-flex flex-wrap gap-4">

                <?php if (count($listaContratos) > 0): ?>

                    <?php foreach ($listaContratos as $contrato): ?>
                        <article class="card-servico border border-1 border-dark rounded-5 overflow-hidden">

                            <img
                                src="<?= escapar(!empty($contrato["foto"]) ? $contrato["foto"] : "imagem.png") ?>"
                                alt="Imagem do serviço"
                                class="imagem-servico w-100 object-fit-contain"
                            >

                            <div class="detalhes-servico p-3 border-top border-2 border-dark">
                                <h3 class="h5">
                                    <?= escapar($contrato["observacao"] ?? "Serviço solicitado") ?>
                                </h3>

                                <p class="mb-1">
                                    <strong>Status:</strong>
                                    <?= escapar($contrato["status"] ?? "Não informado") ?>
                                </p>

                                <p class="mb-0">
                                    <strong>Data:</strong>
                                    <?= escapar(dataContrato($contrato["data_contrato"] ?? null)) ?>
                                </p>
                            </div>

                        </article>
                    <?php endforeach; ?>

                <?php else: ?>

                    <p>Você ainda não solicitou nenhum serviço.</p>

                <?php endif; ?>

            </div>
        </section>

    <?php endif; ?>

</main>

<?php include "./partials/bottom.php"; ?>

</body>
</html>