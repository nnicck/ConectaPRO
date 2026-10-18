-- ==========================================
-- CLIENTES
-- ==========================================

INSERT INTO clientes
(id_cliente, nome, email, telefone, senha, foto)
VALUES
(1, 'Rafael Bandeira', 'rafael.bandeira@example.com', '11980000001', 'senha_teste_01', NULL),
(2, 'Nicole Martins', 'nicole.h@example.com', '11980000002', 'senha_teste_02', NULL),
(3, 'Lucas Oliveira', 'lucas.o@example.com', '11980000003', 'senha_teste_03', NULL),
(4, 'Mariana Costa', 'mariana.c@example.com', '11980000004', 'senha_teste_04', NULL),
(5, 'Pedro Santos', 'pedro.s@example.com', '11980000005', 'senha_teste_05', NULL);

-- ==========================================
-- PROFISSIONAIS
-- ==========================================

INSERT INTO profissionais
(id_profissional, nome, email, telefone, senha, foto, localizacao, profissao, visao_geral, idioma, data_ingresso, saldo)
VALUES
(1, 'Ana Souza', 'ana.s@example.com', '11981100001', 'senha_teste_01', NULL, 'São Paulo, SP', 'Desenvolvedora Web', 'Criação de sites responsivos.', 'Português', '2026-01-10', 500.00),
(2, 'Bruno Lima', 'bruno.l@example.com', '11981100002', 'senha_teste_02', NULL, 'Santo André, SP', 'Designer Gráfico', 'Identidade visual e materiais digitais.', 'Português', '2026-02-15', 350.00),
(3, 'Carla Mendes', 'carla.m@example.com', '11981100003', 'senha_teste_03', NULL, 'São Caetano do Sul, SP', 'Redatora', 'Produção de conteúdo e revisão.', 'Português e Inglês', '2026-03-01', 200.00),
(4, 'Diego Alves', 'diego.a@example.com', '11981100004', 'senha_teste_04', NULL, 'São Paulo, SP', 'Desenvolvedor Mobile', 'Aplicativos Android e integração com APIs.', 'Português', '2026-04-20', 700.00),
(5, 'Fernanda Rocha', 'fernanda.r@example.com', '11981100005', 'senha_teste_05', NULL, 'Santo André, SP', 'Fotógrafa', 'Fotografia de produtos e edição de imagens.', 'Português', '2026-05-05', 150.00);

-- ==========================================
-- SERVIÇOS
-- ==========================================

INSERT INTO servicos
(id_servico, titulo, categoria, tipo_servico, tag, descricao, tempo_prestacao, preco, id_profissional)
VALUES
(1, 'Site institucional', 'Tecnologia', 'Desenvolvimento web', 'Frontend', 'Criação de site institucional responsivo.', '7 dias', 800.00, 1),
(2, 'Loja virtual', 'Tecnologia', 'E-commerce', 'Frontend', 'Desenvolvimento de loja virtual para pequenos negócios.', '15 dias', 1500.00, 1),
(3, 'Identidade visual', 'Design', 'Design gráfico', 'Branding', 'Criação de logotipo e identidade visual.', '5 dias', 450.00, 2),
(4, 'Artigo para blog', 'Redação', 'Produção de conteúdo', 'SEO', 'Redação de artigo otimizado para mecanismos de busca.', '3 dias', 120.00, 3),
(5, 'Aplicativo Android', 'Tecnologia', 'Desenvolvimento mobile', 'Android', 'Criação de aplicativo Android integrado a uma API.', '20 dias', 2200.00, 4);

-- ==========================================
-- MÍDIAS
-- ==========================================

INSERT INTO midias
(id_midia, tipo, midia, id_servico)
VALUES
(1, 'Imagem', 'https://example.com/portfolio/site-institucional.jpg', 1),
(2, 'Imagem', 'https://example.com/portfolio/loja-virtual.jpg', 2),
(3, 'Vídeo', 'https://example.com/portfolio/demo-loja.mp4', 2),
(4, 'Imagem', 'https://example.com/portfolio/identidade-visual.jpg', 3),
(5, 'Imagem', 'https://example.com/portfolio/artigo-blog.jpg', 4);

-- ==========================================
-- AVALIAÇÕES
-- ==========================================

INSERT INTO avaliacoes
(id_avaliacao, estrelas, comentario, data_avaliacao, id_servico)
VALUES
(1, 5, 'Excelente qualidade e entrega dentro do prazo.', '2026-06-01', 1),
(2, 4, 'Bom resultado e comunicação eficiente.', '2026-06-10', 2),
(3, 5, 'Identidade visual criativa e profissional.', '2026-07-05', 3),
(4, 4, 'Texto bem escrito e entregue no prazo.', '2026-08-12', 4),
(5, 5, 'Aplicativo funcional e ótima integração.', '2026-09-20', 5);

-- ==========================================
-- CONTRATOS
-- ==========================================

INSERT INTO contratos
(id_contrato, data_contrato, local, observacao, data_conclusao, status, id_cliente, id_profissional, id_servico)
VALUES
(1, '2026-06-01', 'Remoto', 'Desenvolvimento de site institucional.', '2026-06-10', 'concluído', 1, 1, 1),
(2, '2026-06-15', 'Remoto', 'Criação de loja virtual.', NULL, 'em andamento', 2, 1, 2),
(3, '2026-07-01', 'São Paulo, SP', 'Criação de identidade visual.', '2026-07-06', 'concluído', 3, 2, 3),
(4, '2026-08-10', 'Remoto', 'Produção de artigo para blog.', NULL, 'pendente', 4, 3, 4),
(5, '2026-09-15', 'Remoto', 'Desenvolvimento de aplicativo Android.', NULL, 'em andamento', 5, 4, 5);