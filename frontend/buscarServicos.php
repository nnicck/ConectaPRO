<?php
$busca = trim($_GET["busca"] ?? "");
$categoria = trim($_GET["categoria"] ?? "");
$localizacao = trim($_GET["localizacao"] ?? "");

$profissionais = [];
$erro = "";

$contexto = stream_context_create([
    "http" => [
        "method" => "GET",
        "timeout" => 10,
        "ignore_errors" => true
    ]
]);

$resposta = @file_get_contents(
    "http://localhost:3001/api/profissional",
    false,
    $contexto
);

if ($resposta === false) {
    $erro = "Não foi possível carregar os profissionais.";
} else {
    $resultado = json_decode($resposta, true);
    $profissionais = $resultado["dados"] ?? [];

    // Também aceita uma resposta que seja diretamente uma lista.
    if (!isset($resultado["dados"]) && is_array($resultado)) {
        $profissionais = $resultado;
    }

    if (!is_array($profissionais)) {
        $profissionais = [];
    }

    $profissionais = array_values(array_filter(
        $profissionais,
        function ($profissional) use ($busca, $categoria, $localizacao) {
            if (!is_array($profissional)) {
                return false;
            }

            $nome = mb_strtolower(
                trim($profissional["nome"] ?? ""),
                "UTF-8"
            );

            $profissao = mb_strtolower(
                trim($profissional["profissao"] ?? ""),
                "UTF-8"
            );

            $termo = mb_strtolower($busca, "UTF-8");

            $correspondeBusca = $termo === ""
                || mb_strpos($nome, $termo) !== false
                || mb_strpos($profissao, $termo) !== false;

            $categoriaProfissional = mb_strtolower(
                trim($profissional["categoria"] ?? ""),
                "UTF-8"
            );

            $correspondeCategoria = $categoria === ""
                || $categoriaProfissional === mb_strtolower($categoria, "UTF-8")
                || $profissao === mb_strtolower($categoria, "UTF-8");

            $endereco = mb_strtolower(
                trim($profissional["localizacao"] ?? ""),
                "UTF-8"
            );

            $correspondeLocalizacao = $localizacao === ""
                || mb_strpos(
                    $endereco,
                    mb_strtolower($localizacao, "UTF-8")
                ) !== false;

            return $correspondeBusca
                && $correspondeCategoria
                && $correspondeLocalizacao;
        }
    ));
}

function escapar($valor): string
{
    return htmlspecialchars(
        (string) ($valor ?? ""),
        ENT_QUOTES,
        "UTF-8"
    );
}

function formatarPreco($valor): string
{
    if ($valor === null || $valor === "") {
        return "Consulte o profissional";
    }

    if (is_numeric($valor)) {
        return "R$ " . number_format((float) $valor, 2, ",", ".");
    }

    // Preserva valores já formatados, como "50,00".
    return "R$ " . escapar($valor);
}
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Buscar profissionais | ConectaPRO</title>

    <?php include_once "includes/metalinks.php"; ?>

    <link rel="stylesheet" href="./css/buscarServicos.css">
</head>
<body>

<?php include "./partials/topbar.php"; ?>

<div class="pagina-busca d-flex flex-column min-vh-100">

    <!-- Banner de busca -->
    <section class="banner-busca text-white">
        <div class="container">
            <div class="row align-items-center g-4">

                <div class="col-12 col-lg-4">
                    <h1>
                        Encontre o profissional ideal
                        para o que você precisa.
                    </h1>
                </div>

                <div class="col-12 col-lg-8">
                    <form method="GET" action="buscarServicos.php">
                        <div class="input-group campo-busca">
                            <input
                                type="search"
                                name="busca"
                                class="form-control"
                                placeholder="O que você procura?"
                                aria-label="Buscar profissionais"
                                value="<?= escapar($busca) ?>"
                            >

                            <button
                                class="btn btn-primary botao-buscar"
                                type="submit"
                            >
                                Buscar
                            </button>
                        </div>
                    </form>

                    <div class="sugestoes-busca d-flex flex-wrap gap-2 mt-3">
                        <?php foreach (["Diarista", "Desenvolvedor"] as $termo): ?>
                            <a
                                class="btn btn-light rounded-pill sugestao"
                                href="buscarServicos.php?<?= http_build_query(["busca" => $termo]) ?>"
                            >
                                <?= escapar($termo) ?>
                            </a>
                        <?php endforeach; ?>
                    </div>
                </div>

            </div>
        </div>
    </section>

    <!-- Filtros e resultados -->
    <main class="conteudo-busca flex-grow-1 py-4">
        <div class="container-fluid px-3 px-lg-5">
            <div class="row g-4">

                <!-- Filtros laterais -->
                <aside class="col-12 col-lg-4 col-xl-3">
                    <form
                        method="GET"
                        action="buscarServicos.php"
                        class="painel-filtros"
                    >
                        <h2>Filtros</h2>

                        <input
                            type="hidden"
                            name="busca"
                            value="<?= escapar($busca) ?>"
                        >

                        <div class="mb-4">
                            <label for="categoria" class="form-label">
                                Categoria
                            </label>

                            <select
                                id="categoria"
                                name="categoria"
                                class="form-select"
                            >
                                <option value="">Todas as categorias</option>
                                <?php
                                $categorias = [
                                    "Limpeza",
                                    "Eletrica",
                                    "Construcao",
                                    "Encanamento",
                                    "Outros",
                                    "Desenvolvedor"
                                ];
                                ?>

                                <?php foreach ($categorias as $opcao): ?>
                                    <option
                                        value="<?= escapar($opcao) ?>"
                                        <?= $categoria === $opcao ? "selected" : "" ?>
                                    >
                                        <?= escapar($opcao === "Eletrica" ? "Elétrica" : ($opcao === "Construcao" ? "Construção" : $opcao)) ?>
                                    </option>
                                <?php endforeach; ?>
                            </select>
                        </div>

                        <div class="mb-4">
                            <label for="localizacao" class="form-label">
                                Localização
                            </label>

                            <input
                                type="text"
                                id="localizacao"
                                name="localizacao"
                                class="form-control"
                                placeholder="Ex.: Santo André"
                                value="<?= escapar($localizacao) ?>"
                            >
                        </div>

                        <button
                            type="submit"
                            class="btn btn-primary w-100"
                        >
                            Aplicar filtros
                        </button>

                        <a
                            href="buscarServicos.php"
                            class="btn btn-outline-secondary w-100 mt-2"
                        >
                            Limpar filtros
                        </a>
                    </form>
                </aside>

                <!-- Resultados -->
                <section class="col-12 col-lg-8 col-xl-9">
                    <div class="cabecalho-resultados">
                        <h2>Profissionais disponíveis</h2>

                        <p>
                            <?= count($profissionais) ?>
                            resultado(s) encontrado(s)
                        </p>
                    </div>

                    <?php if ($erro !== ""): ?>

                        <div class="alert alert-warning" role="alert">
                            <?= escapar($erro) ?>
                        </div>

                    <?php elseif (count($profissionais) === 0): ?>

                        <div class="estado-vazio">
                            <h3>Nenhum profissional encontrado</h3>
                            <p>
                                Tente pesquisar por outro nome, profissão
                                ou localização.
                            </p>
                        </div>

                    <?php else: ?>

                        <div class="lista-profissionais">
                            <?php foreach ($profissionais as $profissional): ?>
                                <?php
                                $nome = $profissional["nome"] ?? "Profissional";
                                $profissao = $profissional["profissao"] ?? "Profissão não informada";
                                $foto = $profissional["foto"] ?? "";
                                $endereco = $profissional["localizacao"] ?? "Localização não informada";
                                $preco = $profissional["preco"] ?? null;
                                ?>

                                <article class="card-profissional">
                                    <img
                                        class="foto-profissional"
                                        src="<?= escapar($foto !== "" ? $foto : "img/avatar.png") ?>"
                                        alt="Foto de <?= escapar($nome) ?>"
                                        loading="lazy"
                                    >

                                    <div class="informacoes-profissional">
                                        <h3><?= escapar($nome) ?></h3>

                                        <p class="profissao-profissional">
                                            <?= escapar($profissao) ?>
                                        </p>

                                        <p class="local-profissional">
                                            <span aria-hidden="true">📍</span>
                                            <?= escapar($endereco) ?>
                                        </p>

                                        <p class="preco-profissional">
                                            <?= formatarPreco($preco) ?>
                                        </p>

                                        <?php if (!empty($profissional["visao_geral"])): ?>
                                            <p class="descricao-profissional">
                                                <?= escapar($profissional["visao_geral"]) ?>
                                            </p>
                                        <?php endif; ?>

                                        <?php if (!empty($profissional["id_profissional"]) || !empty($profissional["id"])): ?>
                                            <a
                                                class="btn btn-primary"
                                                href="detalheProfissional.php?id=<?= urlencode((string) ($profissional["id_profissional"] ?? $profissional["id"])) ?>"
                                            >
                                                Ver perfil
                                            </a>
                                        <?php endif; ?>
                                    </div>
                                </article>
                            <?php endforeach; ?>
                        </div>

                    <?php endif; ?>
                </section>

            </div>
        </div>
    </main>

</div>

<?php include "./partials/bottom.php"; ?>

</body>
</html>