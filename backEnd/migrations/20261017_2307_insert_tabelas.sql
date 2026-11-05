-- Dados de exemplo. Senhas em texto puro apenas para fins acadêmicos.
-- Login de teste:
--   Cliente:      rafael.bandeira@example.com  /  senha_teste_01
--   Profissional: paula.alice@example.com      /  senha_teste_01

-- ==========================================
-- CLIENTES
-- ==========================================

INSERT INTO clientes
(id_cliente, nome, email, telefone, localizacao, senha, foto)
VALUES
(1, 'Rafael Bandeira', 'rafael.bandeira@example.com', '11980000001', 'Rua das Flores, 120 - Bela Vista, São Paulo - SP', 'senha_teste_01', NULL),
(2, 'Nicole Martins', 'nicole.h@example.com', '11980000002', 'Av. Industrial, 455 - Jardim, Santo André - SP', 'senha_teste_02', NULL),
(3, 'Lucas Oliveira', 'lucas.o@example.com', '11980000003', 'Rua Goiás, 88 - Centro, São Caetano do Sul - SP', 'senha_teste_03', NULL),
(4, 'Mariana Costa', 'mariana.c@example.com', '11980000004', 'Rua Augusta, 900 - Consolação, São Paulo - SP', 'senha_teste_04', NULL),
(5, 'Pedro Santos', 'pedro.s@example.com', '11980000005', 'Rua Coronel Oliveira Lima, 30 - Centro, Santo André - SP', 'senha_teste_05', NULL);

-- ==========================================
-- PROFISSIONAIS
-- ==========================================

INSERT INTO profissionais
(id_profissional, nome, email, telefone, senha, foto, localizacao, profissao, visao_geral, idioma, data_ingresso, saldo)
VALUES
(1, 'Paula Alice da Silva', 'paula.alice@example.com', '11981100001', 'senha_teste_01', NULL, 'São Paulo - SP', 'Mestre de Obras',
 'Sou mestra de obras com experiência em construção, reformas e acompanhamento de projetos residenciais. Coordeno equipes, organizo materiais e acompanho cada etapa da obra para garantir um serviço bem executado e dentro do prazo.',
 'Português', '2020-03-10', 2450.00),
(2, 'Bruno Lima', 'bruno.l@example.com', '11981100002', 'senha_teste_02', NULL, 'Santo André - SP', 'Eletricista',
 'Eletricista residencial e predial há 8 anos. Instalações, troca de fiação, quadros de força e manutenção preventiva com segurança e garantia.',
 'Português', '2021-02-15', 1270.00),
(3, 'Carla Mendes', 'carla.m@example.com', '11981100003', 'senha_teste_03', NULL, 'São Caetano do Sul - SP', 'Diarista',
 'Limpeza residencial e pós-obra com atenção aos detalhes. Levo meus próprios produtos quando combinado.',
 'Português', '2022-03-01', 480.00),
(4, 'Diego Alves', 'diego.a@example.com', '11981100004', 'senha_teste_04', NULL, 'São Paulo - SP', 'Encanador',
 'Conserto de vazamentos, desentupimentos e instalação de louças e metais. Atendimento rápido na zona sul e central.',
 'Português', '2023-04-20', 620.00),
(5, 'Fernanda Rocha', 'fernanda.r@example.com', '11981100005', 'senha_teste_05', NULL, 'Santo André - SP', 'Pintora',
 'Pintura residencial e comercial, texturas e acabamentos. Ambiente protegido e limpo ao final do serviço.',
 'Português e Inglês', '2024-05-05', 150.00);

-- ==========================================
-- SERVIÇOS
-- ==========================================

INSERT INTO servicos
(id_servico, titulo, categoria, tipo_servico, tag, descricao, tempo_prestacao, preco, id_profissional)
VALUES
(1,  'Construção de cômodo', 'Construção', 'Presencial', 'Obra', 'Construção completa de cômodo em alvenaria, do alicerce ao acabamento.', '30 dias', 8500.00, 1),
(2,  'Assentamento de piso', 'Construção', 'Presencial', 'Piso', 'Assentamento de piso cerâmico ou porcelanato, com nivelamento e rejunte.', '3 dias', 45.00, 1),
(3,  'Reboco de parede', 'Construção', 'Presencial', 'Reboco', 'Reboco e emboço de paredes internas e externas.', '2 dias', 90.00, 1),
(4,  'Instalação de chuveiro e disjuntor', 'Elétrica', 'Presencial', 'Instalação', 'Instalação de chuveiro elétrico com disjuntor dedicado e teste de carga.', '2 horas', 180.00, 2),
(5,  'Troca de fiação', 'Elétrica', 'Presencial', 'Fiação', 'Troca da fiação de um cômodo, com fios dentro da norma.', '1 dia', 450.00, 2),
(6,  'Instalação de ventilador de teto', 'Elétrica', 'Presencial', 'Ventilador', 'Montagem completa do motor e pás, fixação e testes de segurança no teto, instalação do interruptor ou controle remoto e balanceamento para evitar trepidações.', '2 horas', 150.00, 2),
(7,  'Faxina residencial', 'Limpeza', 'Presencial', 'Faxina', 'Limpeza completa de casa ou apartamento: cozinha, banheiros, quartos e áreas comuns.', '1 dia', 180.00, 3),
(8,  'Limpeza pós-obra', 'Limpeza', 'Presencial', 'Pós-obra', 'Remoção de poeira, respingos de tinta e resíduos após reforma.', '1 dia', 350.00, 3),
(9,  'Conserto de vazamento', 'Encanamento', 'Presencial', 'Vazamento', 'Localização e conserto de vazamentos em pias, ralos e tubulações.', '3 horas', 120.00, 4),
(10, 'Desentupimento', 'Encanamento', 'Presencial', 'Desentupir', 'Desentupimento de pias, ralos e vasos sanitários.', '2 horas', 40.00, 4),
(11, 'Pintura de cômodo', 'Pintura', 'Presencial', 'Pintura', 'Pintura de paredes e teto de um cômodo de até 15 m², com massa corrida nos reparos.', '2 dias', 600.00, 5);

-- ==========================================
-- MÍDIAS (imagens ficam na pasta /public do front-end ou em /uploads do back-end)
-- ==========================================

INSERT INTO midias
(id_midia, tipo, midia, id_servico)
VALUES
(1, 'Imagem', '/eletricista.png', 4),
(2, 'Imagem', '/eletricista.png', 6),
(3, 'Imagem', '/diarista.png', 7),
(4, 'Imagem', '/encanador.png', 9),
(5, 'Imagem', '/pintor.png', 11);

-- ==========================================
-- CONTRATOS
-- ==========================================

INSERT INTO contratos
(id_contrato, data_contrato, local, observacao, data_conclusao, status, id_cliente, id_profissional, id_servico)
VALUES
(1,  '2026-06-01', 'Rua das Flores, 120 - Bela Vista, São Paulo - SP', 'Construção de um quarto nos fundos.', '2026-07-01', 'concluído', 1, 1, 1),
(2,  '2026-09-10', 'Rua Augusta, 900 - Consolação, São Paulo - SP', 'Piso da sala, cerca de 20 m².', '2026-09-14', 'concluído', 4, 1, 2),
(3,  '2026-10-20', 'Rua Goiás, 88 - Centro, São Caetano do Sul - SP', 'Reboco da parede externa.', '2026-10-30', 'concluído', 3, 1, 3),
(4,  '2026-11-12', 'Rua das Flores, 120 - Bela Vista, São Paulo - SP', 'Assentar piso da cozinha.', NULL, 'pendente', 1, 1, 2),
(5,  '2026-11-08', 'Av. Industrial, 455 - Jardim, Santo André - SP', 'Reboco do muro.', NULL, 'em andamento', 2, 1, 3),
(6,  '2026-11-05', 'Rua das Flores, 120 - Bela Vista, São Paulo - SP', 'Chuveiro do banheiro social.', NULL, 'aceito', 1, 2, 4),
(7,  '2026-10-15', 'Av. Industrial, 455 - Jardim, Santo André - SP', 'Fiação da cozinha.', '2026-10-16', 'concluído', 2, 2, 5),
(8,  '2026-11-20', 'Rua Coronel Oliveira Lima, 30 - Centro, Santo André - SP', 'Ventilador do quarto.', NULL, 'pendente', 5, 2, 6),
(9,  '2026-10-02', 'Rua Goiás, 88 - Centro, São Caetano do Sul - SP', 'Faxina do apartamento.', '2026-10-02', 'concluído', 3, 3, 7),
(10, '2026-10-25', 'Rua das Flores, 120 - Bela Vista, São Paulo - SP', 'Vazamento na pia.', NULL, 'recusado', 1, 4, 9),
(11, '2026-11-15', 'Rua Augusta, 900 - Consolação, São Paulo - SP', 'Pintar o quarto de azul.', NULL, 'pendente', 4, 5, 11);
