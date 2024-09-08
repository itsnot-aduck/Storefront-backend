# Storefront Backend Project

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this
repo and follow something below

### Setting up

```
npm install
db-migrate up
npm run test
npm run build
```

### Environments

PORT = 3000, NODE_ENV = dev

### Database information

POSTGRES_USER = postgres POSTGRES_PASSWORD = 1234 POSTGRES_DB = storeFront POSTGRES_DB_TEST = storeFront_test
POSTGRES_HOST = localhost POSTGRES_PORT = 5432

### Database json file

```
{
    "dev": {
        "driver": "pg",
        "host": "127.0.0.1",
        "database": "storeFront",
        "user": "postgres",
        "password": "postgres"
    },
    "test": {
        "driver": "pg",
        "host": "127.0.0.1",
        "database": "storeFront_test",
        "user": "postgres",
        "password": "postgres"
    }
}

```

## Endpoints

### Users

```
http://localhost:3000/users [GET-POST]
http://localhost:3000/users/authenticate [AUTHENTICATION]
http://localhost:3000/users/:id [PATCH-GET-DELETE]
```

### Products

```
http://localhost:3000/orders [GET-POST]
http://localhost:3000/orders/:id [PATCH-GET-DELETE]
```

### Orders

```
http://localhost:3000/orders [GET-POST]
http://localhost:3000/orders/:id [PATCH-GET-DELETE]
```

### Ordered Products

```
http://localhost:3000/ordered/product [GET-POST]
http://localhost:3000/ordered/product/:id [PATCH-GET-DELETE]
```
