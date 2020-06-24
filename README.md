<h1 align="center"><strong>Boilerplate : Blog avec Vue.JS + GraphQL + Apollo</strong></h1>

<br />

<div align="center">Projet Apollo-vue (FRONT)</div>

##

- **Serveur GraphQL:** [`graphql-yoga`](https://github.com/prisma/graphql-yoga) (Apollo Server et Express)
- **Apollo Client:** Apollo Client
- **Base de données GraphQL:** Base de données GraphQL lié à [Prisma](https://www.prismagraphql.com) (MySQL)
- **GraphQL Playground**: [GraphQL Playground](https://github.com/prisma/graphql-playground) et [Query performance tracing](https://github.com/apollographql/apollo-tracing)
- **Modèle Dynamique**: Simple et flexible [Data model](./database/datamodel.graphql) –
- **Aucune configuration supplémentaire**: Préconfiguré avec [`graphql-config`](https://github.com/prisma/graphql-config)
- **CSS**: [Tachyons](https://unpkg.com/tachyons/css/tachyons.min.css)

## Pré-requis

Installation de [GraphQL CLI](https://github.com/graphql-cli/graphql-cli) pour démarrer le serveur avec `graphql create`:

```sh
npm install -g graphql-cli
```

## Pour bien débuter

```sh
# 1. Démarrer le serveur front
npm start

# 2. Démarrer le serveur back
cd server
npm start

# 3. Inspecter le Playground
npm playground

```

## Documentation

Pas encore définie
[`.graphqlconfig.yml`](./.graphqlconfig.yml)
[Prisma database schema](./generated/prisma.graphql)
[application schema](./src/schema.graphql)
