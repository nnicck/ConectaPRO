-- Crie as tabelas na ordem em que aparecem neste arquivo

-- ==========================================
-- CLIENTES
-- ==========================================

CREATE TABLE IF NOT EXISTS clientes (
    id_cliente INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    telefone VARCHAR(20) NOT NULL UNIQUE,
    localizacao VARCHAR(300),
    senha VARCHAR(255) NOT NULL,
    foto VARCHAR(300)
);

-- ==========================================
-- PROFISSIONAIS
-- ==========================================

CREATE TABLE IF NOT EXISTS profissionais (
    id_profissional INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    telefone VARCHAR(20) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    foto VARCHAR(300),
    localizacao VARCHAR(150),
    profissao VARCHAR(100) NOT NULL,
    visao_geral VARCHAR(700),
    idioma VARCHAR(50),
    data_ingresso DATE NOT NULL,
    saldo DECIMAL(10,2) DEFAULT 0
);

-- ==========================================
-- SERVIÇOS
-- ==========================================

CREATE TABLE IF NOT EXISTS servicos (
    id_servico INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(150) NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    tipo_servico VARCHAR(100) NOT NULL,
    tag VARCHAR(50),
    descricao VARCHAR(1000),
    tempo_prestacao VARCHAR(50),
    preco DECIMAL(10,2) NOT NULL,
    id_profissional INT NOT NULL,

    CONSTRAINT fk_servicos_profissionais
        FOREIGN KEY (id_profissional)
        REFERENCES profissionais(id_profissional)
        ON DELETE CASCADE
);

-- ==========================================
-- MÍDIAS
-- ==========================================

CREATE TABLE IF NOT EXISTS midias (
    id_midia INT PRIMARY KEY AUTO_INCREMENT,
    tipo VARCHAR(50) NOT NULL,
    midia VARCHAR(300) NOT NULL,
    id_servico INT NOT NULL,

    CONSTRAINT fk_midias_servicos
        FOREIGN KEY (id_servico)
        REFERENCES servicos(id_servico)
        ON DELETE CASCADE
);

-- ==========================================
-- AVALIAÇÕES
-- ==========================================

CREATE TABLE IF NOT EXISTS avaliacoes (
    id_avaliacao INT PRIMARY KEY AUTO_INCREMENT,
    estrelas FLOAT NOT NULL,
    comentario VARCHAR(2000),
    data_avaliacao DATE NOT NULL,
    id_servico INT NOT NULL UNIQUE,

    CONSTRAINT fk_avaliacoes_servicos
        FOREIGN KEY (id_servico)
        REFERENCES servicos(id_servico)
        ON DELETE CASCADE
);

-- ==========================================
-- CONTRATOS
-- ==========================================

CREATE TABLE IF NOT EXISTS contratos (
    id_contrato INT PRIMARY KEY AUTO_INCREMENT,
    data_contrato DATE NOT NULL,
    local VARCHAR(200),
    observacao TEXT,
    data_conclusao DATE,
    status VARCHAR(50) NOT NULL,
    id_cliente INT NOT NULL,
    id_profissional INT NOT NULL,
    id_servico INT NOT NULL,

    CONSTRAINT fk_contratos_clientes
        FOREIGN KEY (id_cliente)
        REFERENCES clientes(id_cliente)
        ON DELETE CASCADE,

    CONSTRAINT fk_contratos_profissionais
        FOREIGN KEY (id_profissional)
        REFERENCES profissionais(id_profissional)
        ON DELETE CASCADE,

    CONSTRAINT fk_contratos_servicos
        FOREIGN KEY (id_servico)
        REFERENCES servicos(id_servico)
        ON DELETE CASCADE
);