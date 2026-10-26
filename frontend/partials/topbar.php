<?php
if (session_status() !== PHP_SESSION_ACTIVE) {
    session_start();
}

$usuarioLogado = $_SESSION["usuario"] ?? null;
$tipoUsuario = $usuarioLogado["tipo"] ?? null;
?>

<header class="topbar bg-white">
    <nav class="navbar navbar-expand-lg py-3">
        <div class="container">

            <!-- Logo -->
            <a
                class="navbar-brand d-flex align-items-center gap-2"
                href="index.php"
            >
                <img
                    src="img/logo.png"
                    alt="ConectaPRO"
                    class="logo-conectapro"
                >
            </a>

            <!-- Botão do menu mobile -->
            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#menuNavegacao"
                aria-controls="menuNavegacao"
                aria-expanded="false"
                aria-label="Abrir menu"
            >
                <span class="navbar-toggler-icon"></span>
            </button>

            <!-- Links -->
            <div
                class="collapse navbar-collapse"
                id="menuNavegacao"
            >
                <div class="navbar-nav ms-auto align-items-lg-center gap-lg-4">

                    <?php if (!$usuarioLogado): ?>

                        <!-- Visitante -->
                        <a
                            class="nav-link btn link-cadastro"
                            href="cadastroCliente.php"
                        >
                            Cadastre-se
                        </a>

                        <a
                            class="nav-link btn link-cadastro"
                            href="cadastroProfissional.php"
                        >
                            Cadastre-se como profissional
                        </a>

                        <a
                            class="btn btn-primary px-4 py-2 botao-entrar"
                            href="login.php"
                        >
                            Entrar
                        </a>

                    <?php elseif ($tipoUsuario === "cliente"): ?>

                        <!-- Cliente logado -->
                        <a
                            class="nav-link btn link-cadastro"
                            href="inicioCliente.php"
                        >
                            Minha conta
                        </a>

                        <a
                            class="btn btn-primary px-4 py-2 botao-entrar"
                            href="includes/logout.php"
                        >
                            Sair
                        </a>

                    <?php elseif ($tipoUsuario === "profissional"): ?>

                        <!-- Profissional logado -->
                        <a
                            class="nav-link btn link-cadastro"
                            href="inicioProfissional.php"
                        >
                            Meu painel
                        </a>

                        <a
                            class="btn btn-primary px-4 py-2 botao-entrar"
                            href="includes/logout.php"
                        >
                            Sair
                        </a>

                    <?php else: ?>

                        <!-- Sessão inválida ou tipo desconhecido -->
                        <a
                            class="btn btn-primary px-4 py-2 botao-entrar"
                            href="includes/logout.php"
                        >
                            Entrar novamente
                        </a>

                    <?php endif; ?>

                </div>
            </div>
        </div>
    </nav>
</header>