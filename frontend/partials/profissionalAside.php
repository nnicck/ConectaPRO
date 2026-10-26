    <!-- MENU LATERAL -->
    <aside class="sidebar">

        <div class="perfil-sidebar">
            <img
                src="<?= escapar($foto) ?>"
                alt="Foto do profissional"
                class="foto-perfil"
                onerror="this.onerror=null;this.src='./img/perfil-padrao.png';"
            >

            <div class="nome-sidebar">
                <?= escapar($nome) ?>
            </div>
        </div>

        <nav class="menu-sidebar">
            <a href="inicioProfissional.php" >
                Início
            </a>

            <a href="../meusServicos.php">
                Meus serviços
            </a>

            <a href="../solicitacoes.php">
                Solicitações
            </a>

            <a href="editarPerfil.php">
                Editar perfil
            </a>
        </nav>

        <a href="logout.php" class="sair-link">
            Sair
        </a>

    </aside>