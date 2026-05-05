# Projeto Laravel

## 📌 Sobre o projeto

Projeto Laravel desenvolvido com API e TOKEN para autenticação e gerenciamento de dados, utilizada junto com um aplicativo mobile.

## 🎯 Objetivo (MVP)

* Realizar cadastro de usuários
* Autenticar usuário (login)
* Gerar e validar tokens de autenticação
* Fornecer endpoints para consumo de dados

## 🚀 Tecnologias utilizadas

* Laravel 
* PHP
* MySQL
* Sanctum
* Middleware
* Laravel Migrations e Seeders

## 📲 Funcionalidades

* Endpoint de Login
* Endpoint de Cadastro
* Validação de usuário
* CRUD completo (GET, POST, PUT, DELETE)
* Autenticação via token

## ⚙️ Como executar o projeto

`# Clonar repositório
git clone https://github.com/viniciussenaidstatui-collab/TrabalhoMobile.git

# Acessar pasta
cd TrabalhoMobile

# Instalar dependências PHP
composer install

# Instalar dependências Node (se necessário)
npm install

# Copiar arquivo de ambiente
cp .env.example .env

# Gerar key da aplicação
php artisan key:generate

# Configurar banco de dados no .env
* DB_CONNECTION=mysql
* DB_HOST=127.0.0.1
* DB_PORT=3306
* DB_DATABASE=seu_banco
* DB_USERNAME=seu_usuario
* DB_PASSWORD=sua_senha

# Executar migrations
php artisan migrate

# Executar seeders (opcional)
php artisan db:seed

# Iniciar servidor
php artisan serve

## 🔌 Integração com API

O projeto Laravel fornece uma API REST consumida pelo aplicativo mobile.

👉 Endpoints disponíveis:

* POST /api/login
* POST /api/register
* GET /api/usuario
* PUT /api/usuario/{id}
* DELETE /api/usuario/{id}

📬 Documentação completa da API:
👉 https://documenter.getpostman.com/view/51856137/2sBXirkUeT

## 📂 Estrutura do projeto

PROJETO-LARAVEL/
* ├── app/
* │   ├── Http/
* │   │   ├── Controllers/
* │   │   │   ├── AuthController.php
* │   │   │   └── UsuarioController.php
* │   │   └── Middleware/
* │   ├── Models/
* │   │   └── User.php
* ├── bootstrap/
* ├── config/
* ├── database/
* │   ├── migrations/
* │   └── seeders/
* ├── public/
* ├── resources/
* ├── routes/
* │   ├── api.php
* │   └── web.php
* ├── storage/
* ├── tests/
* ├── vendor/
* ├── .editorconfig
* ├── .env
* ├── .gitattributes
* ├── .gitignore
* ├── artisan
* ├── composer.json
* ├── composer.lock
* ├── package-lock.json
* ├── phpunit.xml
* ├── publiccssdashboard.css
* └── README.md

## 📄 Documentação completa

* 📘 Documentação: https://docs.google.com/document/d/11JlwIfvrFNDG6BNHn7x-YGeThVzLoPsnS0hZveca7Jo/edit?usp=sharing
* 📬 API (Postman): https://documenter.getpostman.com/view/51856137/2sBXirkUeT
* 🎨 Protótipo (Figma):https://www.figma.com/design/Ab2XbvV2BEeHaIqYOVGvYO/prot%C3%B3tipo?node-id=0-1&t=IYF0FUG1APXEkxVR-1
* 📊 Jira: https://viniciussenaidstatui.atlassian.net/jira/software/projects/PS/boards/3?atlOrigin=eyJpIjoiMjgxYzE0MTE3ZDk0NGRiMTgwZjFiYjNmZjE5ZTI3NmEiLCJwIjoiaiJ9


## 📋 Códigos de Status HTTP

| Código | Descrição | Quando ocorre |
|--------|-----------|----------------|
| 200 | OK | Requisição bem-sucedida |
| 201 | Created | Cadastro criado com sucesso |
| 400 | Bad Request | Dados inválidos ou incompletos |
| 401 | Unauthorized | Token não informado ou inválido |
| 403 | Forbidden | Sem permissão para acessar o recurso |
| 404 | Not Found | Recurso não encontrado |
| 422 | Unprocessable Entity | Erro de validação dos campos |
| 500 | Internal Server Error | Erro interno do servidor |

## 👨‍💻 Autores

Vinicius Odnei Silveira
Kayke Ryan da Silva Côrrea


<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework. You can also check out [Laravel Learn](https://laravel.com/learn), where you will be guided through building a modern Laravel application.

If you don't feel like reading, [Laracasts](https://laracasts.com) can help. Laracasts contains thousands of video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

## Laravel Sponsors

We would like to extend our thanks to the following sponsors for funding Laravel development. If you are interested in becoming a sponsor, please visit the [Laravel Partners program](https://partners.laravel.com).

### Premium Partners

- **[Vehikl](https://vehikl.com)**
- **[Tighten Co.](https://tighten.co)**
- **[Kirschbaum Development Group](https://kirschbaumdevelopment.com)**
- **[64 Robots](https://64robots.com)**
- **[Curotec](https://www.curotec.com/services/technologies/laravel)**
- **[DevSquad](https://devsquad.com/hire-laravel-developers)**
- **[Redberry](https://redberry.international/laravel-development)**
- **[Active Logic](https://activelogic.com)**

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
