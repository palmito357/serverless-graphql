# serverless-graphql

Experimenting with Serverless Framework + AWS λ + Apollo Server Graphql.

- [x] Graphql
- [x] Serverless + AWS λ
- [x] DynamoDB
- [x] Jest + Supertest + Chai

## Project Structure

```bash
├── README.md
├── graphql
│   ├── resolvers
│   │   └── todo.resolvers.js
│   │   └── Add resolvers...
│   └── schemas
│       └── todo.gql
│       └── Add schemas...
├── index.js
├── jest.config.js
├── package-lock.json
├── package.json
├── serverless.yml
└── tests
    ├── integration
    │   └── todo.test.js
    │   └── Add tests...
    └── queries
        └── todos.json
        └── Add sample queries...
```

## Getting Started

1. `npm install`
2. Signup and configure a new Serverless Framework app [AWS + Serverless Framework](https://www.serverless.com/framework/docs/providers/aws/guide/credentials)
3. Add `serverless_org`, `serverless_app` and `serverless_service` to `serverless.yml`
4. Enable CI/CD via serverless app
5. Commit and Serverless Framework CI/CD will auto deploy
6. Add a `.env` file with `INTEGRATION_TEST_URL` and `TODOS_TABLE` (NOTE: `TODOS_TABLE="Todos_{stage}"`

## Development

To add new DynamoDB tables and associated GraphQL:

- Add new resource under `resources` in `serverless.yml` (to create table in DynamoDB)
- Add new resourse name to `.env` file (example `TODOS_TABLE="Todos_dev"`)
- Add new graphQL schema in `graphql/schemas/{new_schema}.gql`
- Add new resolver file in `graphql/resolvers/{new_resolver}.resolvers.js`
- Add new test file in `tests/integration/{new_test_suite}.test.js`
- Add new sample query in `tests/queries/{new_sample_query}.json` (Optional)

## Commands

- Execute query locally
  `serverless invoke local -f graphql -p ./tests/queries/todos.json`
- Manually deploy to AWS λ (without CI/CD)
  `serverless deploy --stage={stage}`
- Run tests
  `npm test:integration`

## Documentation

### API

- [Apollo Server](https://www.apollographql.com/docs/apollo-server/deployment/lambda) and [Apollo Server Lambda](https://www.npmjs.com/package/apollo-server-lambda) for serverless deployment to AWS Lambda
- [GraphQL](https://graphql.org/)
- [Serverless](https://www.serverless.com/)

### Testing

- [Jest](https://jestjs.io/) test runner
- [Chai](https://www.chaijs.com/) assertion library
- [Supertest](https://github.com/visionmedia/supertest) HTTP requests
