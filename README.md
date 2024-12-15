## Description

API desenvolvido com NestJS usando TypeORM e PostgreSQL para o seguinte teste: https://github.com/brain-ag/trabalhe-conosco

## Start up

```bash
$ npm install
```

Copy example and update the .env file

```bash
$ cp .example.env .env
```

Run docker compose to create the PostgreSQL instance

```bash
$ npm run dev:up
```

Run migration to create tables and setup mock data

```bash
$ npm run migration:run
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```
