
<?php

// Dados de exemplo do serviço
$servico = [
    'id' => 1,
    'titulo' => 'Instalação de ventilador',
    'profissional' => 'Tomas Edisson',
    'avaliacao' => '4.9',
    'total_avaliacoes' => 34,
    'preco' => 120.00,
    'imagem' => 'img/ventilador-principal.jpg'
];

$localizacaoCliente = 'Rua Brasil, 6767 - Vila Áurea, São Paulo';

?>

<!DOCTYPE html>
<html lang="pt-br">

<head>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Contratar serviço | ConectaPRO</title>

    <!-- Bootstrap -->
    <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
    >

    <!-- Bootstrap Icons -->
    <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
    >

    <!-- CSS -->
    <link rel="stylesheet" href="css/contrataServico.css">

</head>

<body>


<!-- ================================= -->
<!-- TOPBAR -->
<!-- ================================= -->





<!-- ================================= -->
<!-- CONTEÚDO PRINCIPAL -->
<!-- ================================= -->

<main class="container pagina-contratacao">


    <!-- CABEÇALHO -->

    <div class="cabecalho-pagina">

        <a href="javascript:history.back()" class="btn-voltar">

            <i class="bi bi-arrow-left"></i>

        </a>

        <div>

            <h1>Contratar serviço</h1>

            <p>
                Preencha as informações para solicitar seu serviço.
            </p>

        </div>

    </div>



    <form action="processarContratacao.php" method="POST">

        <input
            type="hidden"
            name="id_servico"
            value="<?= (int)$servico['id'] ?>"
        >


        <div class="row g-4">


            <!-- ================================= -->
            <!-- COLUNA ESQUERDA -->
            <!-- ================================= -->

            <div class="col-lg-7">


                <!-- SERVIÇO SELECIONADO -->

                <div class="card-personalizado card-servico mb-4">

                    <img
                        src="<?= htmlspecialchars($servico['imagem']) ?>"
                        alt="Imagem do serviço"
                        class="imagem-servico"
                    >

                    <div class="info-servico">

                        <h5>
                            <?= htmlspecialchars($servico['titulo']) ?>
                        </h5>

                        <p>
                            por <?= htmlspecialchars($servico['profissional']) ?>
                        </p>

                        <a href="detalhesServico.php?id=<?= (int)$servico['id'] ?>">

                            Ver detalhes do serviço

                            <i class="bi bi-arrow-right"></i>

                        </a>

                    </div>

                </div>



                <!-- DATA E AGENDAMENTO -->

                <div class="card-personalizado mb-4">

                    <div class="titulo-card">

                        <i class="bi bi-calendar-check"></i>

                        <h5>Data e agendamento</h5>

                    </div>

                    <p class="subtitulo-card">
                        Escolha quando deseja receber o profissional.
                    </p>


                    <div class="row g-3">


                        <div class="col-md-6">

                            <label for="data" class="form-label">
                                Data desejada
                            </label>

                            <input
                                type="date"
                                class="form-control"
                                id="data"
                                name="data"
                                required
                            >

                        </div>


                        <div class="col-md-6">

                            <label for="horario" class="form-label">
                                Horário preferencial
                            </label>

                            <select
                                class="form-select"
                                id="horario"
                                name="horario"
                                required
                            >

                                <option value="">
                                    Selecione um horário
                                </option>

                                <option value="08:00">08:00</option>
                                <option value="09:00">09:00</option>
                                <option value="10:00">10:00</option>
                                <option value="13:00">13:00</option>
                                <option value="14:00">14:00</option>
                                <option value="15:00">15:00</option>
                                <option value="16:00">16:00</option>

                            </select>

                        </div>


                    </div>

                </div>



                <!-- INFORMAÇÕES DO SERVIÇO -->

                <div class="card-personalizado mb-4">

                    <div class="titulo-card">

                        <i class="bi bi-clipboard-check"></i>

                        <h5>Informações do serviço</h5>

                    </div>

                    <p class="subtitulo-card">
                        Precisamos de algumas informações para que o profissional entenda seu pedido.
                    </p>


                    <div class="perguntas">


                        <!-- PERGUNTA 1 -->

                        <div class="campo-pergunta">

                            <label for="pergunta1" class="form-label">
                                Qual é o tipo de instalação?
                            </label>

                            <input
                                type="text"
                                class="form-control"
                                id="pergunta1"
                                name="pergunta1"
                                placeholder="Ex: Ventilador de teto"
                            >

                        </div>



                        <!-- PERGUNTA 2 -->

                        <div class="campo-pergunta">

                            <label for="pergunta2" class="form-label">
                                O local já possui instalação elétrica?
                            </label>

                            <select
                                class="form-select"
                                id="pergunta2"
                                name="pergunta2"
                            >

                                <option value="">
                                    Selecione uma opção
                                </option>

                                <option value="Sim">Sim</option>

                                <option value="Não">Não</option>

                                <option value="Não sei informar">
                                    Não sei informar
                                </option>

                            </select>

                        </div>



                        <!-- PERGUNTA 3 -->

                        <div class="campo-pergunta">

                            <label for="pergunta3" class="form-label">
                                Você já possui o equipamento?
                            </label>

                            <select
                                class="form-select"
                                id="pergunta3"
                                name="pergunta3"
                            >

                                <option value="">
                                    Selecione uma opção
                                </option>

                                <option value="Sim">Sim</option>

                                <option value="Não">Não</option>

                            </select>

                        </div>



                        <!-- OBSERVAÇÕES -->

                        <div class="campo-pergunta">

                            <label for="observacoes" class="form-label">
                                Há alguma informação adicional?
                            </label>

                            <textarea
                                class="form-control"
                                id="observacoes"
                                name="observacoes"
                                rows="4"
                                placeholder="Descreva outros detalhes importantes sobre o serviço..."
                            ></textarea>

                        </div>


                    </div>

                </div>


            </div>



            <!-- ================================= -->
            <!-- COLUNA DIREITA -->
            <!-- ================================= -->

            <div class="col-lg-5">


                <!-- RESUMO DO PEDIDO -->

                <div class="resumo-container">

                    <h5 class="titulo-resumo">
                        Resumo do pedido
                    </h5>


                    <!-- SERVIÇO -->

                    <div class="resumo-servico">

                        <img
                            src="<?= htmlspecialchars($servico['imagem']) ?>"
                            alt="Imagem do serviço"
                        >

                        <div>

                            <h6>
                                <?= htmlspecialchars($servico['titulo']) ?>
                            </h6>

                            <p>
                                <?= htmlspecialchars($servico['profissional']) ?>
                            </p>

                            <span class="avaliacao">

                                <i class="bi bi-star-fill"></i>

                                <?= htmlspecialchars($servico['avaliacao']) ?>

                                (<?= (int)$servico['total_avaliacoes'] ?> avaliações)

                            </span>

                        </div>

                    </div>


                    <hr>


                    <!-- LOCALIZAÇÃO -->

                    <div class="informacao-resumo">

                        <i class="bi bi-geo-alt"></i>

                        <div>

                            <strong>Local do atendimento</strong>

                            <p>
                                <?= htmlspecialchars($localizacaoCliente) ?>
                            </p>

                        </div>

                    </div>



                    <!-- DATA -->

                    <div class="informacao-resumo">

                        <i class="bi bi-calendar-event"></i>

                        <div>

                            <strong>Data desejada</strong>

                            <p id="resumoData">
                                Não selecionada
                            </p>

                        </div>

                    </div>



                    <!-- HORÁRIO -->

                    <div class="informacao-resumo">

                        <i class="bi bi-clock"></i>

                        <div>

                            <strong>Horário preferencial</strong>

                            <p id="resumoHorario">
                                Não selecionado
                            </p>

                        </div>

                    </div>


                    <hr>


                    <!-- VALOR -->

                    <div class="valor-resumo">

                        <span>Valor estimado</span>

                        <strong>
                            R$ <?= number_format($servico['preco'], 2, ',', '.') ?>
                        </strong>

                    </div>
                </div>



                <!-- BOTÕES -->

                <div class="acoes-container">

                    <button type="submit" class="btn-confirmar">

                        <i class="bi bi-check-circle"></i>

                        Solicitar serviço

                    </button>


                    <a
                        href="javascript:history.back()"
                        class="btn-cancelar"
                    >

                        Voltar

                    </a>

                </div>


            </div>


        </div>

    </form>

</main>



<!-- ================================= -->
<!-- JAVASCRIPT -->
<!-- ================================= -->

<script>

const data = document.getElementById('data');
const horario = document.getElementById('horario');


// ATUALIZAR DATA NO RESUMO

data.addEventListener('change', function() {

    if (this.value) {

        const partes = this.value.split('-');

        document.getElementById('resumoData').textContent =
            `${partes[2]}/${partes[1]}/${partes[0]}`;

    } else {

        document.getElementById('resumoData').textContent =
            'Não selecionada';

    }

});


// ATUALIZAR HORÁRIO NO RESUMO

horario.addEventListener('change', function() {

    document.getElementById('resumoHorario').textContent =
        this.value || 'Não selecionado';

});


// IMPEDIR DATAS ANTERIORES

const hoje = new Date();

const ano = hoje.getFullYear();
const mes = String(hoje.getMonth() + 1).padStart(2, '0');
const dia = String(hoje.getDate()).padStart(2, '0');

data.min = `${ano}-${mes}-${dia}`;

</script>


<!-- BOOTSTRAP JS -->

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

</body>

</html>
