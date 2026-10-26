
<?php
session_start();

/* =========================================
   PROTEÇÃO DA PÁGINA
========================================= */

if (!isset($_SESSION["usuario"])) {
    header("Location: login.php");
    exit;
}

if (($_SESSION["usuario"]["tipo"] ?? "") !== "profissional") {
    header("Location: login.php");
    exit;
}

$usuario = $_SESSION["usuario"];

$idProfissional = (int) (
    $usuario["id_profissional"]
    ?? $usuario["id"]
    ?? 0
);

if ($idProfissional <= 0) {
    session_destroy();
    header("Location: login.php");
    exit;
}

/* =========================================
   FUNÇÕES PARA CONSUMIR A API
========================================= */

function consultarApi(string $endpoint): array
{
    $opcoes = [
        "http" => [
            "method" => "GET",
            "timeout" => 5,
            "ignore_errors" => true
        ]
    ];

    $contexto = stream_context_create($opcoes);

    $resposta = @file_get_contents(
        "http://localhost:3001/api/" . $endpoint,
        false,
        $contexto
    );

    if ($resposta === false) {
        return [];
    }

    $resultado = json_decode($resposta, true);

    if (!is_array($resultado)) {
        return [];
    }

    $dados = $resultado["dados"] ?? $resultado;

    if (!is_array($dados)) {
        return [];
    }

    // Se a API retornar um único objeto, transforma em lista.
    if (isset($dados["id_profissional"]) ||
        isset($dados["id_cliente"]) ||
        isset($dados["id_contrato"]) ||
        isset($dados["id_servico"]) ||
        isset($dados["id_avaliacao"])) {
        return [$dados];
    }

    return $dados;
}

function formatarPreco($valor): string
{
    return "R$ " . number_format(
        (float) $valor,
        2,
        ",",
        "."
    );
}

function escapar($valor): string
{
    return htmlspecialchars(
        (string) $valor,
        ENT_QUOTES,
        "UTF-8"
    );
}

/* =========================================
   BUSCAR DADOS
========================================= */

$profissionais = consultarApi("profissional");
$contratosApi = consultarApi("contrato");
$servicosApi = consultarApi("servico");
$clientesApi = consultarApi("cliente");
$avaliacoesApi = consultarApi("avaliacao");

/* Localiza o profissional da sessão */

$profissional = [];

foreach ($profissionais as $item) {
    if (
        (int) ($item["id_profissional"] ?? 0)
        === $idProfissional
    ) {
        $profissional = $item;
        break;
    }
}

$nome = $profissional["nome"] ?? $usuario["nome"] ?? "Profissional";
$email = $profissional["email"] ?? $usuario["email"] ?? "";
$foto = $profissional["foto"] ?? "";
$profissao = $profissional["profissao"] ?? "Profissional autônomo";
$saldo = (float) ($profissional["saldo"] ?? 0);

if ($foto === "") {
    $foto = "./img/perfil-padrao.png";
}

/* Indexa serviços e clientes para localizar os nomes */

$servicosPorId = [];

foreach ($servicosApi as $servico) {
    $id = (int) ($servico["id_servico"] ?? 0);

    if ($id > 0) {
        $servicosPorId[$id] = $servico;
    }
}

$clientesPorId = [];

foreach ($clientesApi as $cliente) {
    $id = (int) ($cliente["id_cliente"] ?? 0);

    if ($id > 0) {
        $clientesPorId[$id] = $cliente;
    }
}

/* Filtra contratos do profissional logado */

$contratos = [];

foreach ($contratosApi as $contrato) {
    if (
        (int) ($contrato["id_profissional"] ?? 0)
        === $idProfissional
    ) {
        $contratos[] = $contrato;
    }
}

/* Ordena do mais recente para o mais antigo */

usort($contratos, function ($a, $b) {
    return strcmp(
        $b["data_contrato"] ?? "",
        $a["data_contrato"] ?? ""
    );
});

/* =========================================
   INDICADORES
========================================= */

$totalSolicitados = count($contratos);
$totalPendentes = 0;
$totalConcluidos = 0;

foreach ($contratos as $contrato) {
    $status = mb_strtolower(
        trim($contrato["status"] ?? ""),
        "UTF-8"
    );

    if (in_array($status, ["concluído", "concluido"], true)) {
        $totalConcluidos++;
    } elseif (
        in_array(
            $status,
            ["pendente", "em andamento", "em andamento "],
            true
        )
    ) {
        $totalPendentes++;
    }
}

/* Avaliações relacionadas aos serviços do profissional */

$idsServicosProfissional = [];

foreach ($servicosApi as $servico) {
    if (
        (int) ($servico["id_profissional"] ?? 0)
        === $idProfissional
    ) {
        $idsServicosProfissional[] =
            (int) ($servico["id_servico"] ?? 0);
    }
}

$estrelas = [];

foreach ($avaliacoesApi as $avaliacao) {
    $idServico = (int) ($avaliacao["id_servico"] ?? 0);

    if (
        in_array($idServico, $idsServicosProfissional, true)
        && isset($avaliacao["estrelas"])
    ) {
        $estrelas[] = (float) $avaliacao["estrelas"];
    }
}

$mediaAvaliacao = count($estrelas) > 0
    ? array_sum($estrelas) / count($estrelas)
    : 0;

$totalAvaliacoes = count($estrelas);

/* Próximos serviços: contratos não concluídos e com data futura */

$dataHoje = date("Y-m-d");
$proximosServicos = [];

foreach ($contratos as $contrato) {
    $status = mb_strtolower(
        trim($contrato["status"] ?? ""),
        "UTF-8"
    );

    $dataContrato = substr(
        $contrato["data_contrato"] ?? "",
        0,
        10
    );

    $concluido = in_array(
        $status,
        ["concluído", "concluido"],
        true
    );

    if (
        !$concluido &&
        $dataContrato !== "" &&
        $dataContrato >= $dataHoje
    ) {
        $proximosServicos[] = $contrato;
    }
}

usort($proximosServicos, function ($a, $b) {
    return strcmp(
        $a["data_contrato"] ?? "",
        $b["data_contrato"] ?? ""
    );
});

$proximosServicos = array_slice($proximosServicos, 0, 3);

?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Painel do profissional | ConectaPRO</title>

    <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
    >

    <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
    >
    <link rel="stylesheet" href="./css/inicioProfissional.css">

</head>

<body>

<div class="layout">

    <?php include './partials/profissionalAside.php' ?>

    <!-- CONTEÚDO PRINCIPAL -->
    <main class="conteudo">

        <!-- Pesquisa e notificações -->
        <div class="barra-superior">

            <form class="campo-pesquisa" method="GET" action="inicioProfissional.php">
                <i class="bi bi-search"></i>

                <input
                    type="search"
                    name="busca"
                    placeholder="Pesquisar serviços..."
                    aria-label="Pesquisar serviços"
                    value="<?= escapar($_GET["busca"] ?? "") ?>"
                >
            </form>

            <a
                href="#atividade"
                class="notificacao"
                aria-label="Notificações"
                title="Ver atividade recente"
            >
                <i class="bi bi-bell-fill"></i>
            </a>

        </div>

        <!-- Saudação e avaliação -->
        <section class="boas-vindas">

            <div>
                <h1>
                    Olá, <?= escapar(explode(" ", trim($nome))[0]) ?>!
                </h1>

                <p>Seu perfil está ativo para os clientes</p>
            </div>

            <div class="avaliacao">

                <strong>Sua avaliação</strong>

                <div class="estrelas" aria-label="Avaliação média">
                    <?php for ($i = 1; $i <= 5; $i++): ?>
                        <i class="bi <?= $i <= round($mediaAvaliacao) ? "bi-star-fill" : "bi-star" ?>"></i>
                    <?php endfor; ?>
                </div>

                <span class="nota">
                    <?= number_format($mediaAvaliacao, 1, ",", ".") ?>
                    (<?= $totalAvaliacoes ?>)
                </span>

            </div>

        </section>

        <!-- CARTÕES DE RESUMO -->
        <?php include './partials/cartoesResumoProf.php' ?> 

        <!-- ATIVIDADES E PRÓXIMOS SERVIÇOS -->
        <section class="painel-inferior">

            <div id="atividade">

                <div class="titulo-secao">
                    <h2>Atividade recente</h2>
                    <a href="solicitacoes.php">Ver todas</a>
                </div>

                <?php
                $busca = trim($_GET["busca"] ?? "");
                $atividadesExibidas = 0;

                foreach ($contratos as $contrato):

                    $idServico = (int) ($contrato["id_servico"] ?? 0);
                    $idCliente = (int) ($contrato["id_cliente"] ?? 0);

                    $servico = $servicosPorId[$idServico] ?? [];
                    $cliente = $clientesPorId[$idCliente] ?? [];

                    $tituloServico = $servico["titulo"]
                        ?? $contrato["observacao"]
                        ?? "Serviço contratado";

                    $nomeCliente = $cliente["nome"] ?? "Cliente";

                    $status = $contrato["status"] ?? "Solicitação";

                    if (
                        $busca !== "" &&
                        stripos($tituloServico, $busca) === false &&
                        stripos($nomeCliente, $busca) === false &&
                        stripos($status, $busca) === false
                    ) {
                        continue;
                    }

                    if ($atividadesExibidas >= 5) {
                        break;
                    }

                    $atividadesExibidas++;

                    $dataContrato = $contrato["data_contrato"] ?? "";
                ?>

                    <a
                        href="solicitacoes.php"
                        class="atividade text-decoration-none"
                        style="color: inherit;"
                    >

                        <div class="atividade-icone">
                            <i class="bi bi-clipboard-check"></i>
                        </div>

                        <div class="atividade-texto">
                            <strong><?= escapar($status) ?></strong>

                            <p><?= escapar($tituloServico) ?></p>
                        </div>

                        <span class="atividade-data">
                            <?= $dataContrato !== ""
                                ? escapar(date("d/m/Y", strtotime($dataContrato)))
                                : "" ?>
                        </span>

                        <i class="bi bi-chevron-right atividade-seta"></i>

                    </a>

                <?php endforeach; ?>

                <?php if ($atividadesExibidas === 0): ?>
                    <div class="bg-white border rounded p-4 text-secondary">
                        <?= $busca !== ""
                            ? "Nenhuma atividade encontrada para essa pesquisa."
                            : "Você ainda não possui solicitações de serviços." ?>
                    </div>
                <?php endif; ?>

            </div>

            <!-- Próximos serviços -->
            <aside class="card-proximos">

                <h2>Próximos serviços</h2>

                <?php if (empty($proximosServicos)): ?>

                    <p class="vazio">
                        Você não possui serviços futuros agendados.
                    </p>

                <?php else: ?>

                    <?php foreach ($proximosServicos as $contrato):

                        $idServico = (int) ($contrato["id_servico"] ?? 0);
                        $idCliente = (int) ($contrato["id_cliente"] ?? 0);

                        $servico = $servicosPorId[$idServico] ?? [];
                        $cliente = $clientesPorId[$idCliente] ?? [];

                        $tituloServico = $servico["titulo"]
                            ?? $contrato["observacao"]
                            ?? "Serviço contratado";

                        $nomeCliente = $cliente["nome"] ?? "Cliente";

                        $dataContrato = $contrato["data_contrato"] ?? "";

                    ?>

                        <div class="proximo-item">

                            <strong>
                                <?= escapar($tituloServico) ?>
                            </strong>

                            <p>
                                <?= $dataContrato !== ""
                                    ? escapar(date("d/m/Y", strtotime($dataContrato)))
                                    : "Data não informada" ?>
                            </p>

                            <p>
                                Cliente: <?= escapar($nomeCliente) ?>
                            </p>

                        </div>

                    <?php endforeach; ?>

                <?php endif; ?>

            </aside>

        </section>

    </main>

</div>

</body>
</html>
