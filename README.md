# GoFitness360

[![CI](https://github.com/Luizhprovin/GoFitness360/actions/workflows/ci.yml/badge.svg)](https://github.com/Luizhprovin/GoFitness360/actions/workflows/ci.yml)

<p>
  <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=000000">
  <img alt="React" src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=000000">
  <img alt="Vite" src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=FFFFFF">
  <img alt="Wouter" src="https://img.shields.io/badge/Wouter-5B3DF5?style=for-the-badge">
  <img alt="JSON Server" src="https://img.shields.io/badge/JSON_Server-000000?style=for-the-badge&logo=json&logoColor=FFFFFF">
  <img alt="ESLint" src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=FFFFFF">
</p>

Aplicação React para cadastrar usuários, locais de atividade física e exercícios. O projeto demonstra navegação entre páginas, formulários, consumo da API ViaCEP e operações CRUD apoiadas por uma API simulada com JSON Server.

> **Escopo atual:** projeto acadêmico executado localmente. Autenticação e persistência são simuladas e não devem ser usadas em produção.

## Funcionalidades

- Cadastro, edição, listagem e remoção de usuários.
- Cadastro, edição, listagem e remoção de locais para exercícios.
- Cadastro e consulta de exercícios.
- Consulta de endereço por CEP usando a API ViaCEP.
- Validação de formulários com React Hook Form.
- Navegação client-side com Wouter.
- Regra que impede remover usuários vinculados a locais.
- Massa de demonstração sintética, sem dados pessoais reais.
- Verificação automatizada de lint, build e vulnerabilidades no GitHub Actions.

## Tecnologias

- React 19
- Vite 8
- Wouter
- React Hook Form
- Fetch API
- JSON Server
- ViaCEP
- ESLint

## Como executar

### Pré-requisitos

- Node.js 22.13 ou superior
- npm

### Instalação

```bash
git clone https://github.com/Luizhprovin/GoFitness360.git
cd GoFitness360
npm install
```

Opcionalmente, copie `.env.example` para `.env` para apontar o frontend para outra URL de API:

```bash
cp .env.example .env
```

Abra dois terminais na pasta do projeto.

Terminal 1 — API local:

```bash
npm run json-server
```

A API será disponibilizada em `http://127.0.0.1:3000`.

Terminal 2 — aplicação:

```bash
npm run dev
```

Abra no navegador o endereço exibido pelo Vite, normalmente `http://localhost:5173`.

Use `demo@gofitness.local` e `demo123` para acessar a massa de demonstração.

## Scripts disponíveis

| Comando | Finalidade |
| --- | --- |
| `npm run dev` | Inicia o ambiente de desenvolvimento |
| `npm run json-server` | Inicia a API simulada |
| `npm run build` | Gera a versão de produção |
| `npm run preview` | Visualiza o build localmente |
| `npm run lint` | Executa as verificações do ESLint |
| `npm run check` | Executa lint, build e auditoria de segurança |

## Estrutura

```text
GoFitness360/
├── .github/                 # CI e atualizações automáticas
├── public/
├── src/
│   ├── assets/
│   ├── context/             # estado e acesso à API
│   ├── pages/               # telas da aplicação
│   ├── App.jsx
│   └── main.jsx
├── db.json                  # dados da API simulada
├── .env.example             # configuração opcional da API
├── package.json
└── vite.config.js
```

## Decisões de implementação

- O JSON Server permite demonstrar o fluxo CRUD sem depender de um backend externo.
- O contexto centraliza usuários, locais e exercícios para as páginas da aplicação.
- O ViaCEP preenche parte do endereço a partir de um CEP válido.
- A remoção de usuário verifica previamente se existem locais vinculados.
- A URL da API é configurável por `VITE_API_URL`, com fallback local.
- O Dependabot acompanha atualizações e o CI bloqueia regressões de qualidade.

## Limitações de segurança

A autenticação atual consulta registros no JSON Server e mantém senhas em texto simples. Ela existe apenas para demonstração acadêmica. Uma versão real deve utilizar backend próprio, hash de senha, autenticação por sessão ou token, autorização e validação no servidor.

## Próximos passos

- Substituir o JSON Server por uma API com banco de dados.
- Implementar autenticação e autorização reais.
- Adicionar testes de componentes e fluxos CRUD.
- Melhorar acessibilidade e feedback de erros.
- Publicar uma demonstração navegável.

---

Desenvolvido por [Luiz Henrique Provin](https://github.com/Luizhprovin).
