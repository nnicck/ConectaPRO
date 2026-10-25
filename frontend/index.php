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
    <link rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">

    <title>ConectaPRO - Encontre seu profissional</title>

    <!-- Bootstrap -->
    <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
    >

    <!-- CSS do projeto -->
    <link rel="stylesheet" href="./css/style.css">
</head>

<body>

    <?php include './partials/topbar.php'; ?>

    <?php include './partials/banner.php'; ?>




    <?php include './partials/servicos.php' ?>

    <?php include './partials/profissionalDestque.php' ?>

    <?php include './partials/comoFunciona.php' ?>

    <?php include './partials/bottom.php' ?>

    <!-- O restante da página pode vir aqui -->

    <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js">
    </script>

    

</body>
</html>