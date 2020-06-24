const { GraphQLServer } = require("graphql-yoga");
const { Prisma } = require("prisma-binding");
const resolvers = require("./resolvers");

// Déclaration du Serveur GraphQL YOGA
const server = new GraphQLServer({
  typeDefs: "src/schema.graphql",
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: "src/generated/prisma.graphql", // Schéma BDD Prisma
      endpoint: process.env.PRISMA_ENDPOINT, // Endpoint du Service de la BDD Prisma
      secret: process.env.PRISMA_SECRET, // Clé secrète pour communiquer avec la data/prisma.yml
      debug: true // Active les LOGS
    })
  })
});

// Démarre le serveur
server.start(() => console.log("Server is running on http://localhost:4000"));
