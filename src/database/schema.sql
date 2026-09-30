-- Criação das tabelas do BookStore Manager

CREATE TABLE IF NOT EXISTS autores (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    nacionalidade VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS livros (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    autor_id INTEGER NOT NULL,
    ano_publicacao INTEGER,
    quantidade_disponivel INTEGER NOT NULL DEFAULT 1,
    FOREIGN KEY (autor_id) REFERENCES autores(id)
);

CREATE TABLE IF NOT EXISTS clientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    telefone VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS emprestimos (
    id SERIAL PRIMARY KEY,
    livro_id INTEGER NOT NULL,
    cliente_id INTEGER NOT NULL,
    data_emprestimo DATE NOT NULL DEFAULT CURRENT_DATE,
    data_devolucao DATE,
    devolvido BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (livro_id) REFERENCES livros(id),
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_livros_autor ON livros(autor_id);
CREATE INDEX IF NOT EXISTS idx_emprestimos_livro ON emprestimos(livro_id);
CREATE INDEX IF NOT EXISTS idx_emprestimos_cliente ON emprestimos(cliente_id);