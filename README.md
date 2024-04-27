
# TFC - Trybe Futebol Clube - Full Stack

###  Proposta: 

<details>
<summary>📝 Proposta</summary>

![Frontend](/tfc.png)

Bem-vindo(a) ao TFC - Total Football Club!

O TFC é um site informativo sobre partidas e classificações de futebol, onde você pode encontrar todas as informações relevantes sobre jogos de futebol.

Neste projeto, fui parte do time de desenvolvimento responsável por construir uma API utilizando a metodologia TDD (Desenvolvimento Orientado por Testes) e integrar as aplicações utilizando o docker-compose, permitindo que elas funcionem de forma integrada, consumindo um banco de dados.

O objetivo principal foi desenvolver um back-end dockerizado, utilizando a modelagem de dados através do Sequelize. Durante o desenvolvimento, seguimos regras de negócio fornecidas no projeto. A API construída é capaz de ser consumida pelo front-end já disponibilizado.

Para adicionar uma partida, é necessário ter um token de autenticação, garantindo que apenas usuários logados possam fazer alterações. Além disso, estabelecemos um relacionamento entre as tabelas "teams" e "matches" para realizar as atualizações das partidas.

O back-end desenvolvido implementa regras de negócio para popular corretamente a tabela que será exibida no front-end para os usuários do sistema.
</details>

## Instalação:

<details>
  <summary>🐳 Com Docker</summary>

⚠ O seu docker-compose precisa estar na versão 1.29 ou superior. ⚠ Veja aqui a documentação para atualizar o docker-compose.

Clone este repositório:
```bash
git clone git@github.com:vitor-nogueira-dev/tfc-tybe-futebol-clube.git
```

Entre no diretório e instale as dependências:

```bash
cd tfc-tybe-futebol-clube
npm run install:apps
```

Rode os serviços `frontend`, `backend` e `db` com o comando `npm run compose:up`

* O container com o `backend` irá rodar na porta `localhost:3001` e o container com o `frontend` irá rodar na porta `localhost:3000`.

⚠️ Caso você já tenha algum serviço rodando em alguma dessas portas, o `docker-compose` irá falhar.

* Use o comando `docker logs app_backend ` caso queira visualizar os logs do `backend` e `docker logs app_frontend` caso queira visualizar os logs do `frontend`.

⚠️ Atenção: Não rode o comando `npm audit fix`! Ele atualiza várias dependências do projeto, e essa atualização gera conflitos com o avaliador.

⚠️ Atenção: Se você se deparar com o erro `EADDRINUSE`, quer dizer que sua aplicação já esta utilizando a `porta 3000 || 3001`, seja com outro processo do Node.js (que você pode parar com o comando `killall node`) ou algum container! Neste caso você pode parar o container com o comando `docker stop <nome-do-container>`.

</details>

<details>
<summary>🧪 Rodandos os testes</summary>

Entre no diretório do backend:

```bash
cd app 
cd backend
```
E rode o comando `npm test` para rodar todos os testes ou `npm run test:coverage` para os testes de cobertura.

⚠️ Atenção Não rode o comando `npm audit fix`! Ele atualiza várias dependências do projeto, e essa atualização gera conflitos com o avaliador.

⚠️ Atenção A versão do `Node.js` e `NPM` a ser utilizada é `"node": ">=16.0.0"` e `"npm": ">=7.0.0"`, como descrito na chave `engines` no arquivo `package.json`. Idealmente deve-se utilizar o Node.js na versão `16.14`, a versão na qual este projeto foi testado.

</details>

<details>
  <summary>💡 Stacks utilizadas</summary>

# Backend </br>
Linguagem de programação: ![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)&nbsp; </br>
Estrutura de desenvolvimento: ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)&nbsp; </br>
Organização do código: ![MVC](https://img.shields.io/badge/MVC-323330?style=for-the-badge&logo=mvc&logoColor=white)&nbsp; </br>
Framework de desenvolvimento: ![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)&nbsp; </br>
Banco de dados: ![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)&nbsp; </br>
Ambiente de desenvolvimento: ![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)&nbsp; </br>
ORM (Object-Relational Mapping): ![Sequelize](https://img.shields.io/badge/Sequelize-323330?style=for-the-badge&logo=sequelize&logoColor=white)&nbsp; </br>
TDD: ![TDD](https://img.shields.io/badge/TDD-323330?style=for-the-badge&logo=tdd&logoColor=white)&nbsp; </br>
Framework de teste: ![Mocha](https://img.shields.io/badge/Mocha-323330?style=for-the-badge&logo=mocha&logoColor=white)&nbsp; </br>
Biblioteca de asserção: ![Chai](https://img.shields.io/badge/Chai-323330?style=for-the-badge&logo=chai&logoColor=white)&nbsp; </br>
Biblioteca de stubs: ![Sinon](https://img.shields.io/badge/Sinon-323330?style=for-the-badge&logo=sinon&logoColor=white)&nbsp; </br>
Ferramenta de análise de código estática: ![ESLint](https://img.shields.io/badge/ESLint-00000F?style=for-the-badge&logo=eslint&logoColor=white)&nbsp; </br>
Ferramenta de formatação de código: ![Prettier](https://img.shields.io/badge/Prettier-00000F?style=for-the-badge&logo=prettier&logoColor=white)&nbsp; </br>

# Frontend </br>
Linguagem de programação: ![Javascript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)&nbsp; </br>
Framework de desenvolvimento: ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)&nbsp; </br>
Linguagem de marcação: ![HTML5](https://img.shields.io/badge/HTML5-323330?style=for-the-badge&logo=html5&logoColor=white)&nbsp; </br>
Folha de estilo: ![CSS3](https://img.shields.io/badge/CSS3-323330?style=for-the-badge&logo=css3&logoColor=white)&nbsp; </br>
</details>