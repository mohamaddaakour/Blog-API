- A cookie is a small piece of data that a server sends to a browser/client, and the browser stores it and automatically sends it back with future requests to the same server.

- The main purpose is to let the server remember something about each client.

```ts
// to create a cookie and put the token in it
res.cookie("token", user.token, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000
});
```

```ts
// I have to put this middleware in the app.ts file to enable
// fetching the cookies
app.use(cookieParser());

// to fetch the cookie named token
const token = req.cookies?.token;
```