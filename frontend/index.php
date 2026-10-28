<?php

$url = "http://localhost:3001/api/servico";

$resposta = file_get_contents($url);

$dados = json_decode($resposta, true);

$servicos = $dados['dados'];

?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ConectaPRO | Encontre seu profissional</title>

    <?php include_once "includes/metalinks.php" ?>
    <link rel="stylesheet" href="./css/style.css">
</head>
<body>
    <?php include './partials/topbar.php'; ?>
    <?php include './partials/banner.php'; ?>
    <?php include './partials/servicos.php' ?>
    <?php include './partials/profissionalDestaque.php' ?>
    <?php include './partials/comoFunciona.php' ?>
    <?php include './partials/bottom.php' ?>
    <!-- O restante da página pode vir aqui -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>