```ts
// this to hash the password
// 10 is to add 10 characters as a salt
// a salt is a random sequence of characters that we add to the password before hashing so that the
// same password does not produce the same hash
const hashedPassword: string = await bcrypt.hash(password, 10);
```

```ts
// this will compare if these passwords are the same
// first it will get the salt from the password in the database and then it will
// hash the password given by the user with this salt and than it will compare them
const isPassword: boolean = await bcrypt.compare(password, user.password);
```