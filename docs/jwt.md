- JWT (JSON Web Token) is a way to securely send information between a client and a server as a signed token.

- In web applications, it is commonly used for authentication.

```
JWT has 3 parts: HEADER.PAYLOAD.SIGNATURE

HEADER: Contains information about the token.

PAYLOAD: Contains data (called claims).

SIGNATURE: This proves the token was created by your server and was not modified.
```

```shell
# to create a secret key
openssl rand -base64 32
```

```ts
// we create (sign) a token with the userId as payload
// we have to give it a secret key and expirey time
const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: "7d" });
```

```ts
// to ensure the token wasn't change
// it recalculates the signature, if signatures match token is valid, if no
// invalid token
// if the verification is correct it will return the payload in an object
const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: number };
```