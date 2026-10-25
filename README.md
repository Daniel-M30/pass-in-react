# Pass in React

**Interface para consulta e gerenciamento visual de participantes de eventos, com pesquisa e paginação.**

![React](https://img.shields.io/badge/React-18-149eca?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646cff?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06b6d4?logo=tailwindcss)
![Lucide](https://img.shields.io/badge/Lucide-Icons-f56565)
![Day.js](https://img.shields.io/badge/Day.js-Date_Formatting-ff5f4c)

## Sobre o projeto

O **Pass in React** é uma aplicação front-end desenvolvida como projeto educacional, baseado na proposta da **NLW Unite**, da [Rocketseat](https://www.rocketseat.com.br/).

A interface apresenta uma listagem de participantes de eventos, permitindo pesquisar registros, navegar entre páginas e visualizar informações relacionadas às inscrições e ao check-in.

O projeto foi desenvolvido utilizando React, TypeScript e Tailwind CSS, com consumo de dados de uma API externa à aplicação.

## Funcionalidades

- Listagem de participantes de um evento.
- Pesquisa de participantes por meio da API.
- Navegação entre páginas de resultados.
- Exibição do código, nome e e-mail dos participantes.
- Visualização das datas de inscrição e check-in.
- Formatação de datas relativas utilizando Day.js.
- Persistência dos parâmetros de pesquisa e página na URL.
- Componentes reutilizáveis para tabelas, botões e navegação.

A interface exibe o estado do check-in informado pela API, mas não implementa o processo de check-in diretamente.

## Tecnologias utilizadas

| Tecnologia | Finalidade |
| --- | --- |
| React 18 | Construção da interface |
| TypeScript | Tipagem estática |
| Vite 5 | Desenvolvimento e build |
| Tailwind CSS 3 | Estilização |
| Lucide React | Ícones |
| Day.js | Formatação de datas |

## Estrutura do projeto

- `src/app.tsx` — Estrutura principal da aplicação.
- `src/components/attendee-list.tsx` — Listagem, pesquisa e paginação dos participantes.
- `src/components/header.tsx` — Cabeçalho.
- `src/components/nav-link.tsx` — Componente de link.
- `src/components/table/` — Componentes reutilizáveis da tabela.
- `src/index.css` — Estilos globais.
- `src/assets/` — Recursos visuais.

## Executando localmente

### Pré-requisitos

- Node.js compatível com Vite 5.
- npm.
- Uma API compatível com o endpoint de participantes utilizado pelo projeto.

### 1. Clonar o repositório

```bash
git clone https://github.com/Daniel-M30/pass-in-react.git
cd pass-in-react
```

### 2. Instalar as dependências

```bash
npm ci
```

### 3. Configurar a API

Atualmente, o código utiliza uma URL fixa no componente `src/components/attendee-list.tsx`:

```text
http://localhost:3333/events/9e9bd979-9d10-4915-b339-3786b1634f33/attendees
```

Para visualizar os dados, é necessário disponibilizar uma API compatível nessa porta e com o evento correspondente.

O endpoint recebe os parâmetros `pageIndex` e, quando há pesquisa, `query`.

A resposta esperada contém uma coleção `attendees` e um campo `total`.

**Observação:** este repositório contém apenas o front-end. A configuração de uma API compatível não está incluída nele.

### 4. Iniciar a aplicação

```bash
npm run dev
```

Abra o endereço exibido no terminal, normalmente `http://localhost:5173`.

## Comandos disponíveis

| Comando | Finalidade |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Verifica os tipos e gera o build |
| `npm run preview` | Permite visualizar o build localmente |

## Estado atual e limitações

Este projeto foi analisado por leitura do código-fonte, sem execução local nesta revisão.

A aplicação depende de um servidor de API externo, com endereço e identificador de evento definidos diretamente no código.

A interface apresenta links de navegação, mas não contém uma implementação completa das páginas correspondentes. Também não foram identificados testes automatizados ou workflows de integração contínua.

Antes de disponibilizar uma demonstração independente, recomenda-se revisar a configuração da API, o tratamento de erros e os estados de carregamento.

## Créditos

Projeto educacional baseado na **NLW Unite**, promovida pela [Rocketseat](https://www.rocketseat.com.br/).

## Licenciamento

O repositório não possui atualmente um arquivo `LICENSE`. A ausência de uma licença explícita não concede automaticamente permissão de reutilização.

## Autor

Desenvolvido por [Daniel Monteiro](https://github.com/Daniel-M30).
