# GoFitness360

Aplicação React para cadastrar usuários, locais de atividade física e exercícios. O projeto demonstra navegação entre páginas, formulários, consumo da API ViaCEP e operações CRUD apoiadas por uma API simulada com JSON Server.

> **Escopo atual:** projeto acadêmico executado localmente. Autenticação e persistência são simuladas e não devem ser usadas em produção.

## Funcionalidades

- Cadastro, edição, listagem e remoção de usuários.
- Cadastro, edição, listagem e remoção de locais para exercícios.
- Cadastro e consulta de exercícios.
- Consulta de endereço por CEP usando a API ViaCEP.
- Validação de formulários com React Hook Form.
- Navegação com React Router.
- Regra que impede remover usuários vinculados a locais.

## Tecnologias

- React 18
- Vite
- React Router
- React Hook Form
- Fetch API
- JSON Server
- ViaCEP
- ESLint

## Como executar

### Pré-requisitos

- Node.js 18 ou superior
- npm

### Instalação

```bash
git clone https://github.com/Luizhprovin/GoFitness360.git
cd GoFitness360
npm install
```

Abra dois terminais na pasta do projeto.

Terminal 1 — API local:

```bash
npm run json-server
```

A API será disponibilizada em `http://localhost:3000`.

Terminal 2 — aplicação:

```bash
npm run dev
```

Abra no navegador o endereço exibido pelo Vite, normalmente `http://localhost:5173`.

## Scripts disponíveis

| Comando | Finalidade |
| --- | --- |
| `npm run dev` | Inicia o ambiente de desenvolvimento |
| `npm run json-server` | Inicia a API simulada |
| `npm run build` | Gera a versão de produção |
| `npm run preview` | Visualiza o build localmente |
| `npm run lint` | Executa as verificações do ESLint |

## Estrutura

```text
GoFitness360/
├── public/
├── src/
│   ├── assets/
│   ├── context/             # estado e acesso à API
│   ├── pages/               # telas da aplicação
│   ├── App.jsx
│   └── main.jsx
├── db.json                  # dados da API simulada
├── package.json
└── vite.config.js
```

## Decisões de implementação

- O JSON Server permite demonstrar o fluxo CRUD sem depender de um backend externo.
- O contexto centraliza usuários, locais e exercícios para as páginas da aplicação.
- O ViaCEP preenche parte do endereço a partir de um CEP válido.
- A remoção de usuário verifica previamente se existem locais vinculados.

## Limitações de segurança

A autenticação atual consulta registros no JSON Server e mantém senhas em texto simples. Ela existe apenas para demonstração acadêmica. Uma versão real deve utilizar backend próprio, hash de senha, autenticação por sessão ou token, autorização e validação no servidor.

## Próximos passos

- Substituir o JSON Server por uma API com banco de dados.
- Implementar autenticação e autorização reais.
- Remover URLs locais do código e configurá-las por variável de ambiente.
- Adicionar testes de componentes e fluxos CRUD.
- Melhorar acessibilidade e feedback de erros.
- Publicar uma demonstração navegável.

---

Desenvolvido por [Luiz Henrique Provin](https://github.com/Luizhprovin).
