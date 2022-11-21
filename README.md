# <p align = "center"> NG TRYBE API </p>

<p align="center">
   <img src="https://ng.cash/_nuxt/img/logo-ngcash-branco.88c5860.svg" width="150"/>
</p>

## :computer: Technologies

- TypeScript
- Node.js
- SQL, Postgres
- Prisma

---

## :rocket: Routers

```yml
POST /signup
    - Route to register a new user
    - headers: {}
    - body:
        {
            "username": "username",
            "password": "strongPassword",
        }
```

```yml
POST /signin
    - Route to login
    - headers: {}
    - body:
        {
            "username": "username",
            "password": "strongPassword"
        }
```

```yml
GET /balance (authenticated)
    - Route to view balance
    - headers: { "Authorization": "Bearer $token" }
```

```yml
POST /transaction/:username (authenticated)
    - Route to cash-out
    - headers: { "Authorization": "Bearer $token" }
    - body: {
       "value": 30
    }

```

```yml
GET /transactions?queryStrings(optional - date and type (cashin/cashout)) (authenticated)
    - Route to list all transaction cash-out and cash-in
    - headers: { "Authorization": "Bearer $token" }
```

---

## 🏁 Running the application with docker

```
docker-compose up -d
```

```
Back-end: app running by default on port 5000 (access by nginx at localhost:80/api)
```

```
Front-end Running at port localhost:80 by Nginx
```
