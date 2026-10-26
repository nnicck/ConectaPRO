  <section class="resumos">

            <article class="card-resumo">
                <div class="titulo-card">Serviços solicitados</div>

                <div class="numero-card">
                    <?= $totalSolicitados ?>
                </div>

            </article>

            <article class="card-resumo">
                <div class="titulo-card">Serviços pendentes</div>

                <div class="numero-card">
                    <?= $totalPendentes ?>
                </div>


            </article>

            <article class="card-resumo">
                <div class="titulo-card">Serviços concluídos</div>

                <div class="numero-card">
                    <?= $totalConcluidos ?>
                </div>

            </article>

            <article class="card-resumo">
                <div class="titulo-card">Saldo disponível</div>

                <div class="numero-card">
                    <?= escapar(formatarPreco($saldo)) ?>
                </div>
            </article>

        </section>