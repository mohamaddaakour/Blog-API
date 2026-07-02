```ts
// to take these from the HTTP body request
const { username, email, password } = req.body;
```

```ts
// to take something from the URL as a dynamic value
// we have to put in the route /:id
const id = req.params.id
```

```shell
# if the URL is: .../products?page=2&limit=10

# page=2 and limit=10 are called query parameters

# the entire part after ? is called the query string
```

```ts
// to get the value of page query parameters
const page: number = Number(req.query.page);
```