# Loksewa Quiz

```env
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL="postgresql://DB_USERNAME:DB_PASSWORD@HOST:PORT/DATABASE_NAME?schema=public"
JWT_SECRET=YOUR_SECRET_JWT_SECRET_CODE
```
## Steps to run the server
- `yarn` to install dependencies.
- Then run `yarn prisma migrate dev` to generate the Prisma Client.
- `yarn prisma db seed` to seed the database with some initial data.  _<---- This might produce error._
- `yarn  start:dev` to start the server in __dev__ mode.
