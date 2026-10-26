<?php
session_start();

if (!isset($_SESSION["usuario"])) {
    header("Location: login.php");
    exit;
}

if ($_SESSION["usuario"]["tipo"] !== "cliente") {
    header("Location: login.php");
    exit;
}

$usuario = $_SESSION["usuario"];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cliente</title>

    <?php include_once "includes/metalinks.php" ?>
    <link rel="stylesheet" href="./css/login.css">
</head>
<body>
    
</body>
</html>