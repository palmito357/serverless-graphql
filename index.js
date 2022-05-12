const path = require('path')
const { loadFilesSync } = require('@graphql-tools/load-files')
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { ApolloServer } = require('apollo-server-lambda')
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require('apollo-server-core')

const typeDefs = mergeTypeDefs(
  loadFilesSync(path.join(__dirname, 'graphql/**/*.gql')),
)
const resolvers = mergeResolvers(
  loadFilesSync(path.join(__dirname, 'graphql/**/*.resolvers.*')),
)

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

const server = new ApolloServer({
  schema,
  // By default, the GraphQL Playground interface and GraphQL introspection
  // is disabled in "production" (i.e. when `process.env.NODE_ENV` is `production`).
  //
  // If you'd like to have GraphQL Playground and introspection enabled in production,
  // install the Playground plugin and set the `introspection` option explicitly to `true`.
  introspection: true,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
})

exports.graphqlHandler = server.createHandler()
