```shell
# to download the packages we need
# prisma/client is the library the application actually uses to talk to the database
npm install prisma@5 @prisma/client@5

# this will download the prisma folder and in it the schema.prisma file
# where we will put our schema
npx prisma init
```

- After that we have to create our database schema in `schema.prisma` file.

```ts
// this will take the database URL from the .env file
url = env("DATABASE_URL")
```

- In primsa, each table in the database is represented by a `model`.

```ts
model User {
  // autoicrement means first id will be 1 and each time we create
  // a new user the id will increment by 1 automatically
  // @id mean this field is a primary key
  userId Int @id @default(autoincrement())

  username String @unique
  email String @unique
  password String
  createdAt DateTime @default(now())

  // each user can have many posts
  // Post is another model
  posts Post[]

  comments Comment[]

  // we create an index for createdAt
  // the index will create a data structure called B-trees and order all the createdAt from
  // older date to the newest and each date has a pointer to the real user row in the database
  // in this way when we search a user with specific createdAt we will find it much faster
  @@index([createdAt])

  // this is the real name of this table in the database
  @@map("users")
}

model Post {
  postId Int @id @default(autoincrement())
  title String
  content String
  createdAt DateTime @default(now())

  // to create a foreign key
  // we will create a new column in the posts table called authorId
  authorId Int

  // here we specify the relationship that each authorId reference to a userId
  // onDelete: Cascade means if a user is deleted all his posts will be deleted
  // this foreign key used to know the data for the user for each post by joining the two tables
  // together
  author User @relation(fields: [authorId], references: [userId], onDelete: Cascade)

  comments Comment[]

  @@index([authorId])
  @@index([createdAt])

  @@map("posts")
}
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

```shell
# this command creates and applies a database migration
# this will take my Prisma schema and update my actual database to match it
# every time I change something in the models I have to migrate
# this will create also a prisma/migrations folder
npx prisma migrate dev --name init
```

- In Node.js you should always treat database operations as asynchronous because they involve I/O (communicating with the database server). Prisma Client methods return Promises, so you typically use `await` keyword.

```ts
// to get the first user having this email or this username
const isUserExist: User | null = await prisma.user.findFirst({
    where: {
        OR: [{ email }, { username }]
    }
});
```

```ts
// in the model we say @unique it will automatically create a unique index
// so in this case we will use the index in searching and the searching will be
// so fast
const post = await prisma.post.findUnique({
    where: {
        postId
    }
});
```

```ts
// this will create a new user with this data and add it to the
// database
const user: User = await prisma.user.create({
    // the data of the new user
    data: {
        username,
        email,
        password: hashedPassword
    },

    // what we want to be returned
    select: {
        userId: true,
        username: true,
        email: true,
        password: true,
        createdAt: true
    }
});
```

```ts
// here we are joining three tables together to create a new comment
prisma.comment.create({
    // this is the comment data to create a new comment
    data: {
        content,
        postId,
        authorId
    },

    // we join using the inculde keyword the comments table with the users and posts tables
    // using the releations author and post and we take
    // these 2 fields from each one of them to print them
    include: {
        author: {
            select: {
                userId: true,
                username: true
            }
        },
        post: {
            select: {
                postId: true,
                title: true
            }
        }
    }
});
```

```ts
// findMany will return an array of objects (comments)
prisma.comment.findMany({
    where: {
        postId
    },

    // this will order the array with createdAt in descending order
    // from the highest to the lowest
    orderBy: {
        createdAt: "desc"
    },
    include: {
        author: {
            select: {
                userId: true,
                username: true
            }
        }
    }
});
```

```ts
// this will update the comment with this commentId
// with the data we give to it
// here we changed the content only the remaining fields will stay the same
prisma.comment.update({
    where: {
        commentId
    },
    data: {
        content
    }
});

// here we can say: content: content but because the key
// and the variable name are the same we can say content alone like we did
```

```ts
// we deleted the comment with this commentId
prisma.comment.delete({
    where: {
        commentId
    }
});
```

```ts
// we can create a clause (primsa object)
// if the search variable is not falsy will apply the first object and what inside it
// if search is a falsy value it will return an empty object
const whereClause = search ? {
        // it will return an object where title or content contains search
        OR: [
            {
                title: {
                    contains: search,
                    // case insensitive means don't look if the letters are uppercase or lowercase
                    // it doesn't matter
                    mode: Prisma.QueryMode.insensitive
                }
            },

            {
                content: {
                    contains: search,
                    mode: Prisma.QueryMode.insensitive
                }
            }
        ]
    }
: {};


// this clause just save the data in memory but didn't apply anything
// to apply it we have to use it in a prisma operation
```

```ts
// to count the posts with a specific condition
const totalPosts: number = await prisma.post.count({
    where: whereClause
});

// will return the total number of rows (posts)
const totalPosts: number = await prisma.post.count({});
```

```ts
prisma.post.findMany({
    where: whereClause,

    // this tells Prisma how many matching posts to ignore
    skip,

    // this limits how many posts are returned
    take: nbPostsInPage,

    orderBy: {
        createdAt: "desc"
    },

    include: {
        author: {
            select: {
                userId: true,
                username: true,
                email: true
            }
        },

        // this means also fetch every comment that belongs to this post
        // so for each post we are taking all the comments for it
        comments: true
    }
});
```