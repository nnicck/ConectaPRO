<?php
session_start();

// Limpa os dados da sessão.
$_SESSION = [];

// Invalida o cookie da sessão, se estiver sendo utilizado.
if (ini_get("session.use_cookies")) {
    $parametros = session_get_cookie_params();

    setcookie(
        session_name(),
        "",
        time() - 42000,
        $parametros["path"],
        $parametros["domain"],
        $parametros["secure"],
        $parametros["httponly"]
    );
}

// Encerra a sessão.
session_destroy();

// Volta para a página inicial.
header("Location: ../index.php");
exit;
