const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    password: String!
  }

  type AuthToken {
    token: String!
    user: User!
  }

  input LoginInput {
    username: String!
    password: String!
  }

  type Mutation {
    registerUser(username: String!, password: String!): User!
    login(input: LoginInput!): AuthToken!
  }
`;

const resolvers = require('./resolvers');

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});