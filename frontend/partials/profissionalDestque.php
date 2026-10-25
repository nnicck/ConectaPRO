<?php

$url = "http://localhost:3001/api/profissional";

$resposta = @file_get_contents($url);
$dados = $resposta ? json_decode($resposta, true) : [];

$profissionais = $dados['dados'] ?? [];

if (!is_array($profissionais)) {
    $profissionais = [];
}

$profissionais = array_values($profissionais);
$slides = array_chunk($profissionais, 4);

?>

<section class="profissionais-destaque py-5">

    <div class="container">

        <!-- Título -->
        <div class="text-center mb-5">

            <p class="text-primary mb-2">
                CONHEÇA NOSSOS PROFISSIONAIS
            </p>

            <h2 class="fw-bold">
                Profissionais em destaque
            </h2>

            <p class="text-secondary">
                Conheça profissionais de diferentes áreas de atuação.
            </p>

        </div>

        <?php if (empty($profissionais)): ?>

            <div class="alert alert-info text-center">
                Nenhum profissional encontrado.
            </div>

        <?php else: ?>

            <!-- Carrossel automático -->
            <div id="carrosselProfissionais"
                 class="carousel slide"
                 data-bs-ride="carousel"
                 data-bs-interval="3000"
                 data-bs-pause="false"
                 data-bs-wrap="true">

                <div class="carousel-inner">

                    <?php foreach ($slides as $indice => $grupo): ?>

                        <div class="carousel-item <?= $indice === 0 ? 'active' : '' ?>">

                            <div class="row g-4">

                                <?php foreach ($grupo as $profissional): ?>

                                    <div class="col-12 col-md-6 col-lg-3">

                                        <div class="card profissional-card h-100">

                                            <!-- Foto e informações -->
                                            <div class="d-flex align-items-center gap-3">

                                                <?php
                                                $foto = $profissional['foto'] ?? '';
                                                $fotoPadrao = './img/perfil-padrao.png';
                                                ?>

                                                <img
                                                    src="<?= htmlspecialchars($foto ?: $fotoPadrao, ENT_QUOTES, 'UTF-8') ?>"
                                                    alt="Foto do profissional"
                                                    class="profissional-foto"
                                                >

                                                <div class="profissional-info">

                                                    <h5>
                                                        <?= htmlspecialchars($profissional['nome'] ?? 'Profissional', ENT_QUOTES, 'UTF-8') ?>
                                                    </h5>

                                                    <p class="profissional-profissao mb-2">
                                                        <?= htmlspecialchars($profissional['profissao'] ?? 'Profissional autônomo', ENT_QUOTES, 'UTF-8') ?>
                                                    </p>

                                                    <p class="profissional-local mb-0">
                                                        <?= htmlspecialchars($profissional['localizacao'] ?? 'Localização não informada', ENT_QUOTES, 'UTF-8') ?>
                                                    </p>

                                                </div>

                                            </div>

                                            <!-- Descrição -->
                                            <p class="profissional-descricao">
                                                <?= htmlspecialchars($profissional['visao_geral'] ?? 'Conheça o perfil deste profissional.', ENT_QUOTES, 'UTF-8') ?>
                                            </p>

                                            <!-- Botão -->
                                            <a
                                                href="perfil-profissional.php?id=<?= urlencode((string) ($profissional['id_profissional'] ?? '')) ?>"
                                                class="btn btn-outline-primary w-100 mt-auto"
                                            >
                                                Ver perfil
                                            </a>

                                        </div>

                                    </div>

                                <?php endforeach; ?>

                            </div>

                        </div>

                    <?php endforeach; ?>

                </div>

            </div>

        <?php endif; ?>

    </div>

</section>
