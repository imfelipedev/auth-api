# 🚩 Website demonstration (back-end)

This application was developed to demonstrate my experience, knowledge and skills. In this project, the DDD architecture was used.

Main libraries used:

-   Nest.js;
-   Express;
-   Prisma;
-   Nodemail;

Project structure:

```
.
├── cargo.toml
└── src
    ├── controllers
    │   ├── auth.controller.ts
    │   └── recover.controller.ts
    ├── dtos
    │   ├── auth
    │   │   ├── login.dto.ts
    │   │   └── register.dto.ts
    │   └── recover
    │       ├── recover.dto.ts
    │       └── change-password.dto.ts
    ├── infrastructure
    │   └── exception.middleware.ts
    ├── repositories
    │   └── prisma.repository.ts
    ├── services
    │   ├── user.service.ts
    │   ├── auth.service.ts
    │   ├── email.service.ts
    │   └── recover.service.ts
    ├── module.ts
    └── main.ts
```

## Installation

1. Download and install NodeJS on your machine: https://nodejs.org/en
2. Clone repository.
3. Configure the `.env` file.

## Environment variables

To run this project, you will need to add the following environment variables to your .env

`EMAIL_HOST` - Endereço provider address.

`EMAIL_USERNAME` - Username provider address.

`EMAIL_PASSWORD` - Password provider address.

`JWT_SECRET` - Hash key.

`FRONT_END_URL` - Domain front-end (example:"http://localhost")

`DATABASE_URL` - Database informations (example:"postgres://username:password@ip:port/database_name")

## Running in development.

Running migrate:

```bash
npx prisma db push
```

Start server:

```bash
npm run dev
```

## Deploy

Build project:

```bash
npm run build
```

Start production server:

```
npm run start
```

## API Endpoints

#### Login in account.

```http
POST /api/v1/auth/login
```

| Parâmetro  | Tipo     | Descrição     |
| :--------- | :------- | :------------ |
| `email`    | `string` | User email    |
| `password` | `string` | User password |

#### Logout in account.

```http
DELETE /api/v1/auth/logout
```

| Parâmetro | Tipo | Descrição |
| :-------- | :--- | :-------- |

#### Register a new account.

```http
POST /api/v1/auth/register
```

| Parâmetro  | Tipo     | Descrição     |
| :--------- | :------- | :------------ |
| `username` | `string` | Username      |
| `email`    | `string` | User email    |
| `password` | `string` | User password |

#### Send recover code in email.

```http
POST /api/v1/recover
```

| Parâmetro | Tipo     | Descrição    |
| :-------- | :------- | :----------- |
| `email`   | `string` | Target Email |

#### Recover password.

```http
PATCH /api/v1/recover
```

| Parâmetro  | Tipo     | Descrição    |
| :--------- | :------- | :----------- |
| `id`       | `uuid`   | Recover code |
| `password` | `string` | New password |

## Autores

-   [@zFelipeA](https://github.com/zFelipeA)
