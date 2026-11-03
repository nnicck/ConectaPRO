
<?php

$servico = [
    'id' => 1,
    'titulo' => 'Instalação de ventilador',
    'profissional' => 'Tomas Edisson',
    'avaliacao' => '4.9',
    'total_avaliacoes' => 34,
    'preco' => 150.00,
    'descricao' => [
        'Montagem completa do motor e pás',
        'Fixação e testes de segurança no teto',
        'Instalação do interruptor ou controle remoto',
        'Balanceamento para evitar trepidações'
    ],
    'imagens' => [
        'img/ventilador-principal.jpg',
        'img/ventilador-2.jpg',
        'img/ventilador-3.jpg',
        'img/ventilador-4.jpg'
    ]
];

?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Detalhes do serviço | ConectaPro</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">

    <link rel="stylesheet" href="css/detalhesServico.css">
</head>

<body>

    <main class="container pagina-servico">

        <!-- CAMINHO
        <div class="caminho">
            <a href="index.php">Início</a>
            <i class="bi bi-chevron-right"></i>
            <span>Detalhes do serviço</span>
        </div> -->

        <div class="row g-4">

            <!-- GALERIA -->
            <div class="col-lg-6">

                <div class="galeria">

                    <div class="imagem-principal-container">

                        <img
                            src="<?= htmlspecialchars($servico['imagens'][0]) ?>"
                            id="imagemPrincipal"
                            class="imagem-principal"
                            alt="Imagem do serviço">

                    </div>

                    <div class="galeria-miniaturas">

                        <?php foreach ($servico['imagens'] as $index => $imagem): ?>

                            <img
                                src="<?= htmlspecialchars($imagem) ?>"
                                class="miniatura <?= $index === 0 ? 'ativa' : '' ?>"
                                onclick="alterarImagem(this)"
                                alt="Imagem <?= $index + 1 ?>">

                        <?php endforeach; ?>

                    </div>

                </div>

            </div>


            <!-- INFORMAÇÕES -->
            <div class="col-lg-6">

                <section class="detalhes">

                    <span class="categoria-servico">
                        SERVIÇO PROFISSIONAL
                    </span>

                    <h1>
                        <?= htmlspecialchars($servico['titulo']) ?>
                    </h1>

                    <!-- PROFISSIONAL -->
                    <div class="profissional">

                        <div class="avatar-profissional">
                            <?= strtoupper(substr($servico['profissional'], 0, 1)) ?>
                        </div>

                        <div class="dados-profissional">

                            <span class="nome-profissional">
                                <?= htmlspecialchars($servico['profissional']) ?>
                            </span>

                            <span class="avaliacao">
                                <i class="bi bi-star-fill"></i>

                                <?= htmlspecialchars($servico['avaliacao']) ?>

                                <span>
                                    (<?= (int)$servico['total_avaliacoes'] ?> avaliações)
                                </span>
                            </span>

                        </div>

                    </div>

                    <hr>

                    <!-- PREÇO -->
                    <div class="preco-container">

                        <div>
                            <span class="preco-legenda">Valor do serviço</span>

                            <div class="preco">
                                R$ <?= number_format($servico['preco'], 2, ',', '.') ?>
                            </div>
                        </div>

                        <span class="preco-info">
                            <i class="bi bi-shield-check"></i>
                            Serviço profissional
                        </span>

                    </div>

                    <!-- DESCRIÇÃO -->
                    <div class="descricao">

                        <h5>O que está incluso?</h5>

                        <div class="lista-beneficios">

                            <?php foreach ($servico['descricao'] as $item): ?>

                                <div class="beneficio">

                                    <i class="bi bi-check-circle-fill"></i>

                                    <span>
                                        <?= htmlspecialchars($item) ?>
                                    </span>

                                </div>

                            <?php endforeach; ?>

                        </div>

                    </div>

                    <!-- BOTÃO -->
                    <a
                        href="solicitarOrcamento.php?id_servico=<?= (int)$servico['id'] ?>"
                        class="btn-solicitar">

                        Solicitar orçamento

                        <i class="bi bi-arrow-right"></i>

                    </a>

                    <p class="mensagem-seguranca">
                        <i class="bi bi-lock"></i>
                        Entre em contato com o profissional com segurança.
                    </p>

                </section>

            </div>

        </div>

    </main>


    <script>

        function alterarImagem(elemento) {

            document.getElementById('imagemPrincipal').src = elemento.src;

            document.querySelectorAll('.miniatura').forEach(imagem => {
                imagem.classList.remove('ativa');
            });

            elemento.classList.add('ativa');
        }

    </script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

</body>
</html>
