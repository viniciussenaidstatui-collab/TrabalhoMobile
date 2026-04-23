# 📱 Aplicativo Mobile

## 📌 Sobre o projeto

Aplicativo mobile desenvolvido em React Native com o objetivo de consumir uma API REST para autenticação e gerenciamento de dados.

## 🎯 Objetivo (MVP)

* Realizar cadastro de usuários
* Autenticar usuário (login)
* Armazenar token localmente
* Consumir dados da API

## 🚀 Tecnologias utilizadas

* React Native
* Expo
* Axios
* AsyncStorage
* React Navigation

## 📲 Funcionalidades

* Tela de Login
* Tela de Cadastro
* Validação de usuário
* Consumo de API (GET, POST, PUT, DELETE)
* Persistência de dados com AsyncStorage

## ⚙️ Como executar o projeto

```bash
# Clonar repositório
https://github.com/viniciussenaidstatui-collab/TrabalhoMobile.git

# Acessar pasta
cd app-mobile

# Instalar dependências
npm install

# Iniciar projeto
npx expo start
```

## 🔌 Integração com API

A aplicação consome uma API REST desenvolvida em Laravel.

👉 Endpoints utilizados:

* POST /login
* POST /register
* GET /usuario

📬 Documentação completa da API:
👉 https://documenter.getpostman.com/view/51856137/2sBXirkUeT

## 📂 Estrutura do projeto

```
TRABALHOMOBILE/                    →  TRABALHOMOBILE/
  .expo                            →    .expo
  assets/                          →    src/assets/
  componentes/                     →    src/components/
  node_modules/                    →    node_modules/
  pages/                           →    src/screens/
  .gitignore                       →    .gitignore
  App.js                           →    src/App.js (ou manter na raiz)
  app.json                         →    app.json
  index.js                         →    index.js
  package-lock.json                →    package-lock.json
  package.json                     →    package.json
                                 →    src/services/
                                 →    src/routes/
```

## 📄 Documentação completa

* 📘 Documentação: https://docs.google.com/document/d/11JlwIfvrFNDG6BNHn7x-YGeThVzLoPsnS0hZveca7Jo/edit?usp=sharing
* 📬 API (Postman): https://documenter.getpostman.com/view/51856137/2sBXirkUeT
* 🎨 Protótipo (Figma): [Kayke]
* 📊 Jira: https://viniciussenaidstatui.atlassian.net/jira/software/projects/PS/boards/3?atlOrigin=eyJpIjoiMjgxYzE0MTE3ZDk0NGRiMTgwZjFiYjNmZjE5ZTI3NmEiLCJwIjoiaiJ9 

## 👨‍💻 Autor

Vinicius Odnei Silveira
Kayke Ryan da Silva Côrrea
