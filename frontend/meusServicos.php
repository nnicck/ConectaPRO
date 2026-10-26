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
            if ((int)($contrato["id_profissional"] ?? 0) === (int)$idProfissional) {
                $contratos[] = $contrato;
            }
        }
    } else {
        $erro = "Não foi possível carregar os serviços.";
    }
}

function e($valor) {
    return htmlspecialchars((string)$valor, ENT_QUOTES, "UTF-8");
}

function dataFormatada($data) {
    if (!$data) return "Não informada";
    return date("d/m/Y H:i", strtotime($data));
}

function classeStatus($status) {
    $status = strtolower(trim((string)$status));

    if (in_array($status, ["concluído", "concluido", "concluída", "concluida"])) {
        return "status-concluido";
    }

    if (in_array($status, ["pendente", "aguardando"])) {
        return "status-pendente";
    }

    return "status-andamento";
}
?>

<?php include "./partials/profissionalAside.php"; ?>

<main class="conteudo-servicos">
    <div class="container-fluid px-4 px-lg-5 py-4">

        <h1 class="titulo-pagina mb-4">Meus serviços</h1>

        <?php if ($erro): ?>
            <div class="alert alert-warning"><?= e($erro) ?></div>
        <?php endif; ?>

        <div class="card tabela-card">
            <div class="table-responsive">
                <table class="table tabela-servicos align-middle mb-0">
                    <thead>
                        <tr>
                            <th>Serviço</th>
                            <th>Cliente</th>
                            <th>Data</th>
                            <th>Status</th>
                            <th class="text-end">Valor</th>
                        </tr>
                    </thead>

                    <tbody>
                        <?php if (empty($contratos)): ?>
                            <tr>
                                <td colspan="5" class="text-center py-5 text-secondary">
                                    Você ainda não possui serviços contratados.
                                </td>
                            </tr>
                        <?php else: ?>
                            <?php foreach ($contratos as $contrato): ?>
                                <tr>
                                    <td class="nome-servico">
                                        <?= e($contrato["titulo"] ?? $contrato["nome_servico"] ?? "Serviço") ?>
                                    </td>

                                    <td>
                                        <?= e($contrato["nome_cliente"] ?? "Cliente #" . ($contrato["id_cliente"] ?? "")) ?>
                                    </td>

                                    <td class="data-servico">
                                        <?= e(dataFormatada($contrato["data_contrato"] ?? null)) ?>
                                    </td>

                                    <td>
                                        <span class="status <?= e(classeStatus($contrato["status"] ?? "")) ?>">
                                            <?= e($contrato["status"] ?? "Em andamento") ?>
                                        </span>
                                    </td>

                                    <td class="text-end valor-servico">
                                        <?php
                                        $valor = $contrato["preco"] ?? $contrato["valor"] ?? null;
                                        echo $valor !== null
                                            ? "R$ " . number_format((float)$valor, 2, ",", ".")
                                            : "A combinar";
                                        ?>
                                    </td>
                                </tr>
                            <?php endforeach; ?>
                        <?php endif; ?>
                    </tbody>
                </table>
            </div>
        </div>

    </div>
</main>

<style>
.conteudo-servicos {
    margin-left: 250px;
    min-height: 100vh;
    background: #f8fafc;
    color: #0f172a;
}

.titulo-pagina {
    font-size: 28px;
    font-weight: 700;
}

.tabela-card {
    min-height: 650px;
    border: 1px solid #cbd5e1;
    border-radius: 5px;
    overflow: hidden;
    background: #fff;
}

.tabela-servicos {
    font-size: 15px;
}

.tabela-servicos thead th {
    background: #0f172a;
    color: #fff;
    font-weight: 600;
    padding: 14px;
    white-space: nowrap;
}

.tabela-servicos tbody td {
    padding: 14px;
    border-color: #cbd5e1;
}

.nome-servico {
    max-width: 260px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.data-servico {
    color: #64748b;
    white-space: nowrap;
}

.valor-servico {
    font-weight: 600;
    white-space: nowrap;
}

.status {
    display: inline-block;
    border-radius: 20px;
    padding: 4px 10px;
    font-size: 12px;
    font-weight: 600;
    white-space: nowrap;
}

.status-andamento {
    color: #08799a;
    background: #d8edf6;
}

.status-concluido {
    color: #166534;
    background: #dcfce7;
}

.status-pendente {
    color: #a34700;
    background: #f7e8c7;
}

@media (max-width: 768px) {
    .conteudo-servicos {
        margin-left: 0;
    }

    .titulo-pagina {
        font-size: 23px;
    }
}
</style>