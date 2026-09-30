# BookStore Manager CLI

## Descrição do projeto

O BookStore Manager CLI é uma aplicação back-end em Node.js com TypeScript que gerencia uma livraria por meio de menus interativos no terminal. O sistema permite o cadastro, consulta, atualização e remoção de autores, livros e clientes, além de controlar empréstimos e devoluções, com persistência em banco de dados PostgreSQL.

## Objetivo

Praticar os principais conceitos do Módulo 01: JavaScript moderno no back-end, Node.js, TypeScript, Programação Orientada a Objetos, arquitetura em camadas, PostgreSQL, comandos SQL (DDL, DML e consultas), programação assíncrona, Clean Code e GitFlow.

## Tecnologias utilizadas

- Node.js
- TypeScript
- PostgreSQL
- Biblioteca pg
- dotenv
- TSX

## Requisitos para execução

- Node.js (versão 16 ou superior)
- PostgreSQL instalado e em execução
- Git

## Configuração do banco de dados

1. Abra o pgAdmin e conecte-se ao servidor PostgreSQL.

2. Crie o banco de dados executando o comando:

CREATE DATABASE bookstore;

3. Conecte-se ao banco "bookstore" e execute o script SQL localizado em:

src/database/schema.sql

Esse script cria as tabelas autores, livros, clientes e emprestimos com seus relacionamentos.

4. Configure o arquivo .env na raiz do projeto com as credenciais do banco:

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=sua_senha
DB_NAME=bookstore

## Instalação

1. Clone o repositório:

git clone https://github.com/ranyzZ/bookstore-manager-cli.git

2. Acesse a pasta do projeto:

cd bookstore-manager-cli

3. Instale as dependências:

npm install

## Execução

Para executar a aplicação em ambiente de desenvolvimento:

npm run dev

Para compilar o projeto:

npm run build

Para executar a versão compilada:

npm start

## Arquitetura do projeto

O projeto segue uma arquitetura em camadas, promovendo separação de responsabilidades:

- Controllers: interação com o usuário via terminal
- Services: regras de negócio e validações
- Repositories: comunicação com o PostgreSQL (SQL puro)
- Models: classes e interfaces das entidades
- Database: configuração da conexão e script SQL
- Utils: funções auxiliares reutilizáveis
- Menus: navegação da aplicação

O fluxo de execução segue: Usuário → Menu → Controller → Service → Repository → PostgreSQL

## Funcionalidades implementadas

- Gerenciamento de autores (cadastrar, listar, consultar, atualizar, remover)
- Gerenciamento de livros (cadastrar, listar, consultar, atualizar, remover)
- Gerenciamento de clientes (cadastrar, listar, consultar, atualizar, remover)
- Realização de empréstimos de livros
- Registro de devoluções com atualização de estoque
- Consulta de empréstimos cadastrados
- Relatórios com JOIN, GROUP BY e funções de agregação:
  - Livros disponíveis
  - Livros emprestados
  - Quantidade de empréstimos por livro
  - Clientes com empréstimos ativos
- Tratamento de erros com try/catch e mensagens claras
- Validações de dados (nome, e-mail, quantidade disponível, etc.)

## Estrutura de pastas

bookstore-manager-cli/
├── src/
│   ├── main.ts
│   ├── controllers/
│   │   ├── AutorController.ts
│   │   ├── LivroController.ts
│   │   ├── ClienteController.ts
│   │   └── EmprestimoController.ts
│   ├── database/
│   │   ├── connection.ts
│   │   └── schema.sql
│   ├── menus/
│   │   └── mainMenu.ts
│   ├── models/
│   │   ├── Autor.ts
│   │   ├── Livro.ts
│   │   ├── Cliente.ts
│   │   └── Emprestimo.ts
│   ├── repositories/
│   │   ├── AutorRepository.ts
│   │   ├── LivroRepository.ts
│   │   ├── ClienteRepository.ts
│   │   └── EmprestimoRepository.ts
│   ├── services/
│   │   ├── AutorService.ts
│   │   ├── LivroService.ts
│   │   ├── ClienteService.ts
│   │   └── EmprestimoService.ts
│   └── utils/
│       ├── readline.ts
│       └── validators.ts
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md

## Exemplos de utilização

### Exemplo 1: Cadastrar um autor

Escolha uma opção: 1

===== GERENCIAR AUTORES =====
Escolha uma opção: 1
Nome do autor: Machado de Assis
Nacionalidade: Brasileiro
[OK] Autor "Machado de Assis" cadastrado com ID 1.

### Exemplo 2: Cadastrar um livro

Escolha uma opção: 2

===== GERENCIAR LIVROS =====
Escolha uma opção: 1
Título: Dom Casmurro
ID do autor: 1
Ano de publicação: 1899
Quantidade disponível: 5
[OK] Livro "Dom Casmurro" cadastrado com ID 1.

### Exemplo 3: Realizar um empréstimo

Escolha uma opção: 4

===== GERENCIAR EMPRÉSTIMOS =====
Escolha uma opção: 1
ID do livro: 1
ID do cliente: 1
[OK] Empréstimo #1 realizado com sucesso.

### Exemplo 4: Tratamento de erro

Escolha uma opção: 1

===== GERENCIAR LIVROS =====
Escolha uma opção: 1
Título: A
ID do autor: 99
Ano de publicação: 2020
Quantidade disponível: 1
[ERRO] O título do livro deve ter pelo menos 2 caracteres.

### Exemplo 5: Relatório com JOIN

Escolha uma opção: 5

===== RELATÓRIOS =====
Escolha uma opção: 2

--- Livros Emprestados ---
"Dom Casmurro" - Cliente: João Silva | Data: 30/09/2026


Desenvolvido por Rani Cavalcante Silva