<?php
session_start();

if (!isset($_SESSION["usuario"]) ||
    $_SESSION["usuario"]["tipo"] !== "profissional") {
    header("Location: login.php");
    exit;
}

$usuario = $_SESSION["usuario"];
$idProfissional = $usuario["id"] ?? null;

$contratos = [];
$erro = "";

if ($idProfissional) {
    $url = "http://localhost:3001/api/contrato";
    $resposta = @file_get_contents($url);

    if ($resposta !== false) {
        $resultado = json_decode($resposta, true);
        $todosContratos = $resultado["dados"] ?? [];

        foreach ($todosContratos as $contrato) {
            if (
                (int)($contrato["id_profissional"] ?? 0) === (int)$idProfissional
            ) {
                $contratos[] = $contrato;
            }
        }
    } else {
        $erro = "Não foi possível carregar as solicitações.";
    }
}

function e($valor) {
    return htmlspecialchars((string)$valor, ENT_QUOTES, "UTF-8");
}

$filtro = $_GET["filtro"] ?? "todas";

$solicitacoes = array_values(array_filter(
    $contratos,
    function ($contrato) use ($filtro) {
        $status = strtolower(trim($contrato["status"] ?? ""));

        if ($filtro === "novas") {
            return in_array($status, ["pendente", "nova", "aguardando"]);
        }

        if ($filtro === "aceitas") {
            return in_array($status, ["aceito", "aceita", "em andamento"]);
        }

        if ($filtro === "recusadas") {
            return in_array($status, ["recusado", "recusada"]);
        }

        return true;
    }
));

function contarStatus($contratos, $statusDesejados) {
    return count(array_filter($contratos, function ($contrato) use ($statusDesejados) {
        return in_array(
            strtolower(trim($contrato["status"] ?? "")),
            $statusDesejados
        );
    }));
}
?>

<?php include "./partials/profissionalAside.php"; ?>

<main class="conteudo-solicitacoes">
    <div class="container-fluid px-4 px-lg-5 py-4">

        <h1 class="titulo-pagina">Solicitação de Serviço</h1>
        <p class="subtitulo-pagina">
            Gerencie os pedidos recebidos dos clientes
        </p>

        <?php if ($erro): ?>
            <div class="alert alert-warning"><?= e($erro) ?></div>
        <?php endif; ?>

        <div class="filtros-solicitacoes">
            <a href="?filtro=todas"
               class="filtro <?= $filtro === "todas" ? "ativo" : "" ?>">
                Todas <span><?= count($contratos) ?></span>
            </a>

            <a href="?filtro=novas"
               class="filtro <?= $filtro === "novas" ? "ativo" : "" ?>">
                Novas
                <span><?= contarStatus($contratos, ["pendente", "nova", "aguardando"]) ?></span>
            </a>

            <a href="?filtro=aceitas"
               class="filtro <?= $filtro === "aceitas" ? "ativo" : "" ?>">
                Aceitas
                <span><?= contarStatus($contratos, ["aceito", "aceita", "em andamento"]) ?></span>
            </a>

            <a href="?filtro=recusadas"
               class="filtro <?= $filtro === "recusadas" ? "ativo" : "" ?>">
                Recusadas
                <span><?= contarStatus($contratos, ["recusado", "recusada"]) ?></span>
            </a>
        </div>

        <div class="lista-solicitacoes">

            <?php if (empty($solicitacoes)): ?>
                <div class="alert alert-light border text-center py-5">
                    Nenhuma solicitação encontrada nesta categoria.
                </div>
            <?php endif; ?>

            <?php foreach ($solicitacoes as $solicitacao): ?>
                <?php
                $status = strtolower(trim($solicitacao["status"] ?? "pendente"));
                $valor = $solicitacao["preco"] ?? $solicitacao["valor"] ?? null;
                $data = $solicitacao["data_contrato"] ?? null;
                ?>

                <article class="card solicitacao-card">
                    <div class="d-flex justify-content-between align-items-start gap-3 mb-3">
                        <div>
                            <h2 class="nome-solicitacao">
                                <?= e($solicitacao["titulo"] ?? $solicitacao["nome_servico"] ?? "Solicitação de serviço") ?>
                            </h2>

                            <span class="text-secondary small">
                                Solicitação #<?= e($solicitacao["id_contrato"] ?? "") ?>
                            </span>
                        </div>

                        <div class="text-end">
                            <span class="texto-valor">Valor</span>
                            <div class="valor-solicitacao">
                                <?= $valor !== null
                                    ? "R$ " . number_format((float)$valor, 2, ",", ".")
                                    : "A combinar" ?>
                            </div>
                        </div>
                    </div>

                    <div class="row g-2 mb-3">
                        <div class="col-12 col-md-4">
                            <div class="informacao-solicitacao">
                                <span>Cliente</span>
                                <strong>
                                    <?= e($solicitacao["nome_cliente"] ?? "Cliente #" . ($solicitacao["id_cliente"] ?? "")) ?>
                                </strong>
                            </div>
                        </div>

                        <div class="col-12 col-md-4">
                            <div class="informacao-solicitacao">
                                <span>Localização</span>
                                <strong>
                                    <?= e($solicitacao["local"] ?? "Não informada") ?>
                                </strong>
                            </div>
                        </div>

                        <div class="col-12 col-md-4">
                            <div class="informacao-solicitacao">
                                <span>Data</span>
                                <strong>
                                    <?= $data ? e(date("d/m/Y", strtotime($data))) : "A combinar" ?>
                                </strong>
                            </div>
                        </div>
                    </div>

                    <?php if (!empty($solicitacao["observacao"])): ?>
                        <p class="observacao-solicitacao">
                            <?= e($solicitacao["observacao"]) ?>
                        </p>
                    <?php endif; ?>

                    <?php if (in_array($status, ["pendente", "nova", "aguardando"])): ?>
                        <div class="d-flex flex-wrap gap-2">
                            <form method="POST" action="atualizarSolicitacao.php">
                                <input type="hidden" name="id_contrato"
                                       value="<?= e($solicitacao["id_contrato"] ?? "") ?>">
                                <input type="hidden" name="status" value="Aceito">
                                <button type="submit" class="btn btn-aceitar">
                                    Aceitar pedido
                                </button>
                            </form>

                            <form method="POST" action="atualizarSolicitacao.php">
                                <input type="hidden" name="id_contrato"
                                       value="<?= e($solicitacao["id_contrato"] ?? "") ?>">
                                <input type="hidden" name="status" value="Recusado">
                                <button type="submit" class="btn btn-recusar">
                                    Recusar pedido
                                </button>
                            </form>
                        </div>
                    <?php else: ?>
                        <div class="mt-2">
                            <span class="badge text-bg-light border">
                                Status: <?= e($solicitacao["status"] ?? "Não informado") ?>
                            </span>
                        </div>
                    <?php endif; ?>
                </article>
            <?php endforeach; ?>

        </div>
    </div>
</main>

<style>
.conteudo-solicitacoes {
    margin-left: 250px;
    min-height: 100vh;
    background: #f8fafc;
    color: #0f172a;
}

.titulo-pagina {
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 5px;
}

.subtitulo-pagina {
    color: #475569;
    font-size: 15px;
    margin-bottom: 35px;
}

.filtros-solicitacoes {
    display: flex;
    flex-wrap: wrap;
    gap: 9px;
    margin-bottom: 35px;
}

.filtro {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    padding: 8px 14px;
    border: 1px solid #dbe1e9;
    border-radius: 7px;
    text-decoration: none;
    color: #0f172a;
    font-size: 14px;
}

.filtro span {
    font-size: 12px;
    font-weight: 600;
    background: #f1f5f9;
    padding: 2px 6px;
    border-radius: 12px;
}

.filtro.ativo {
    background: #0f172a;
    color: #fff;
    border-color: #0f172a;
}

.filtro.ativo span {
    background: #374151;
    color: #fff;
}

.lista-solicitacoes {
    display: flex;
    flex-direction: column;
    gap: 18px;
    padding: 0 10px;
}

.solicitacao-card {
    padding: 18px;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    box-shadow: 0 8px 25px rgba(37, 99, 235, 0.08);
}

.nome-solicitacao {
    font-size: 22px;
    font-weight: 700;
    margin: 6px 0;
}

.texto-valor {
    display: block;
    font-size: 13px;
    font-weight: 600;
    color: #64748b;
}

.valor-solicitacao {
    font-size: 24px;
    font-weight: 700;
    white-space: nowrap;
}

.informacao-solicitacao {
    display: flex;
    flex-direction: column;
    gap: 3px;
    padding: 10px 12px;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    min-height: 65px;
}

.informacao-solicitacao span {
    color: #64748b;
    font-size: 13px;
}

.informacao-solicitacao strong {
    font-size: 14px;
    font-weight: 600;
    overflow-wrap: anywhere;
}

.observacao-solicitacao {
    color: #475569;
    font-size: 14px;
    margin: 5px 0 15px;
}

.btn-aceitar,
.btn-recusar {
    min-width: 190px;
    padding: 10px 16px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
}

.btn-aceitar {
    background: #2563eb;
    color: #fff;
}

.btn-aceitar:hover {
    background: #1d4ed8;
    color: #fff;
}

.btn-recusar {
    background: #000;
    color: #fff;
}

.btn-recusar:hover {
    background: #27272a;
    color: #fff;
}

@media (max-width: 768px) {
    .conteudo-solicitacoes {
        margin-left: 0;
    }

    .titulo-pagina {
        font-size: 23px;
    }

    .lista-solicitacoes {
        padding: 0;
    }

    .nome-solicitacao {
        font-size: 18px;
    }

    .valor-solicitacao {
        font-size: 19px;
    }

    .btn-aceitar,
    .btn-recusar {
        width: 100%;
    }
}
</style>