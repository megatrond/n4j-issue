import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { Neo4jGraphQL } from "@neo4j/graphql";
import neo4j from "neo4j-driver";

const typeDefs = `#graphql
type MyThing {
    id: ID! @id
    stuff: MyStuff @relationship(type: "THE_STUFF", direction: OUT)
}

type MyStuff {
    id: ID! @id
    thing: MyThing @relationship(type: "THE_STUFF", direction: IN)
}
`;

const driver = neo4j.driver(
    "bolt://localhost:7687",
    neo4j.auth.basic("neo4j", "local")
);

const neoSchema = new Neo4jGraphQL({ typeDefs, driver });

const server = new ApolloServer({
    schema: await neoSchema.getSchema(),
});

const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => ({ req }),
    listen: { port: 4444 },
});

console.log(`🚀 Server ready at ${url}`);