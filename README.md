# Loksewa Quiz

```env
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL=postgres://np:admin@localhost:5432/loksewa?schema=public
JWT_ACCESS_TOKEN_SECRET=secret
JWT_REFRESH_TOKEN_SECRET=therefreshtokensecret
REFRESH_TOKEN_HASH_SECRET=therefreshtokenhashsecret

# JWT Access Token Expiration Time in
JWT_ACCESS_TOKEN_EXPIRES_IN=15m
JWT_REFRESH_TOKEN_EXPIRES_IN=7d

# SMTP
SMTP_HOST="smtp.neptechpal.com"
SMTP_USER="no-reply@neptechpal.com"
SMTP_PASS="no-replyloksewa"

BACKEND_URL=http://localhost:3000
```

## Steps to run the server

- `yarn` to install dependencies.
- Then run `yarn prisma migrate dev` to generate the Prisma Client.
- `yarn prisma db seed` to seed the database with some initial data. _<---- This might produce error._
- `yarn  start:dev` to start the server in **dev** mode.
