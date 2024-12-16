## Description

API developed with NestJS using TypeORM and PostgreSQL for the following test: https://github.com/brain-ag/trabalhe-conosco

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

Coverage is setup to 80% for branchs, functions, lines and statements, but the current state of the code is greater then 90%.

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```
