<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastro Cliente | ConectaPRO</title>

    <?php include_once "includes/metalinks.php" ?>
    <link rel="stylesheet" href="./css/cadastroCliente.css">
</head>
<body>
<?php include './partials/topbar.php'; ?>
<main class="container py-5 cadastro-cliente">
    <div class="mx-auto cadastro-container">

        <header class="text-center mb-4">
            <h1 class="fw-bold">Criar conta de cliente</h1>
            <p class="text-secondary">
                Preencha seus dados para começar a usar o ConectaPro.
            </p>
        </header>

        <form id="formCadastroCliente"
              class="bg-white border rounded-4 shadow-sm p-4 p-md-5 mt-4"
              novalidate>

            <div id="mensagemCadastro"
                 class="alert"
                 role="alert"
                 hidden></div>

            <!-- FOTO DE PERFIL -->
            <section class="mb-4">
                <h2 class="h5 fw-bold mb-3">Foto de perfil</h2>

                <div class="d-flex flex-column align-items-center">
                    <div class="foto-preview rounded-circle border overflow-hidden
                                d-flex align-items-center justify-content-center
                                bg-light mb-3">
                        <img id="fotoPreview"
                             src=""
                             alt="Prévia da foto de perfil"
                             hidden>

                        <span id="fotoPlaceholder" class="text-secondary">
                            Sem foto
                        </span>
                    </div>

                    <label for="foto" class="btn btn-outline-primary">
                        Escolher foto
                    </label>

                    <input id="foto"
                           name="foto"
                           type="file"
                           accept="image/*"
                           class="visually-hidden">

                    <small class="text-secondary mt-2">
                        Imagem de até 5 MB. A foto é opcional.
                    </small>
                </div>
            </section>

            <hr>

            <!-- DADOS PESSOAIS -->
            <section class="mb-4">
                <h2 class="h5 fw-bold mb-3">Dados pessoais</h2>

                <div class="mb-3">
                    <label for="nome" class="form-label">
                        Nome completo *
                    </label>
                    <input id="nome" name="nome" type="text"
                           class="form-control" maxlength="100"
                           placeholder="Digite seu nome completo"
                           autocomplete="name" required>
                </div>

                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label for="email" class="form-label">E-mail *</label>
                        <input id="email" name="email" type="email"
                               class="form-control" maxlength="100"
                               placeholder="seuemail@exemplo.com"
                               autocomplete="email" required>
                    </div>

                    <div class="col-md-6 mb-3">
                        <label for="telefone" class="form-label">
                            Telefone *
                        </label>
                        <input id="telefone" name="telefone" type="tel"
                               class="form-control" maxlength="20"
                               placeholder="(11) 99999-9999"
                               autocomplete="tel" required>
                    </div>
                </div>
            </section>

            <hr>

            <!-- ENDEREÇO -->
            <section class="mb-4">
                <h2 class="h5 fw-bold mb-2">Endereço</h2>
                <p class="text-secondary small">
                    Os campos abaixo serão reunidos na coluna
                    <strong>localizacao</strong> do banco de dados.
                </p>

                <div class="row">
                    <div class="col-md-4 mb-3">
                        <label for="cep" class="form-label">CEP</label>
                        <input id="cep" name="cep" type="text"
                               class="form-control" maxlength="9"
                               placeholder="00000-000"
                               autocomplete="postal-code">
                    </div>

                    <div class="col-md-8 mb-3">
                        <label for="rua" class="form-label">
                            Rua ou avenida
                        </label>
                        <input id="rua" name="rua" type="text"
                               class="form-control" maxlength="150"
                               placeholder="Nome da rua"
                               autocomplete="address-line1">
                    </div>

                    <div class="col-md-4 mb-3">
                        <label for="numero" class="form-label">Número</label>
                        <input id="numero" name="numero" type="text"
                               class="form-control" maxlength="10"
                               placeholder="Nº">
                    </div>

                    <div class="col-md-8 mb-3">
                        <label for="complemento" class="form-label">
                            Complemento
                        </label>
                        <input id="complemento" name="complemento"
                               type="text" class="form-control"
                               maxlength="100"
                               placeholder="Apartamento, bloco etc.">
                    </div>

                    <div class="col-md-6 mb-3">
                        <label for="bairro" class="form-label">Bairro</label>
                        <input id="bairro" name="bairro" type="text"
                               class="form-control" maxlength="100"
                               placeholder="Seu bairro">
                    </div>

                    <div class="col-md-6 mb-3">
                        <label for="cidade" class="form-label">Cidade</label>
                        <input id="cidade" name="cidade" type="text"
                               class="form-control" maxlength="100"
                               placeholder="Sua cidade">
                    </div>

                    <div class="col-md-4 mb-3">
                        <label for="estado" class="form-label">
                            Estado (UF)
                        </label>
                        <input id="estado" name="estado" type="text"
                               class="form-control" maxlength="2"
                               placeholder="SP">
                    </div>
                </div>
            </section>

            <hr>

            <!-- SENHA -->
            <section class="mb-4">
                <h2 class="h5 fw-bold mb-3">Segurança</h2>

                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label for="senha" class="form-label">
                            Senha *
                        </label>
                        <input id="senha" name="senha" type="password"
                               class="form-control" minlength="8"
                               autocomplete="new-password"
                               placeholder="Mínimo de 8 caracteres"
                               required>
                    </div>

                    <div class="col-md-6 mb-3">
                        <label for="confirmarSenha" class="form-label">
                            Confirmar senha *
                        </label>
                        <input id="confirmarSenha" name="confirmarSenha"
                               type="password" class="form-control"
                               minlength="8"
                               autocomplete="new-password"
                               placeholder="Digite a senha novamente"
                               required>
                    </div>
                </div>
            </section>

            <button type="submit" id="btnCadastrar"
                    class="btn btn-primary w-100 py-3 fw-semibold">
                Criar minha conta
            </button>

            <p class="text-secondary text-center small mt-3 mb-0">
                Os campos marcados com * são obrigatórios.
            </p>
        </form>
    </div>
</main>
<?php include './partials/bottom.php' ?>
</body>
</html>