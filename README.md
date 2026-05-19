# Definition

- A Backend project Written in Typescript within I used:
    - Express as a backend framework
    - PostgreSQL as a releational database
    - Prisma to handle database with ORM
    - Enviornment variable to store sensitive data

- This project contain so much senior level topics like:
    - authentication
    - authorization
    - pagination
    - encryption to store passwords
    - some security


## How to set up Prisma:

```shell
npm install prisma@5 @prisma/client@5

npx prisma init

npx prisma migrate dev --name init

npx prisma generate
```

```ts
// in src/config/prisma.ts

// this is the prisma client it acts as an intermediary
// between the typescript code and database
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"]
});

export default prisma;
```

## How to the code

```shell
npm run dev
```

## Author

- Mohamad Daakour