# Loksewa Quiz

```env
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL="postgresql://postgres:12345@localhost:5432/loksewa?schema=public"
```

`yarn` to install dependencies.
Then run `yarn prisma migrate dev` to generate the Prisma Client.
`yarn prisma db seed` to seed the database with some initial data.
`yarn  start:dev` to start the server.
