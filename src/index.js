import express from 'express'
import cors from 'cors'
import compression from 'compression'
import bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools'

import schema from './schema'

const GRAPHQL_PORT = 4000

const graphQLServer = express()

graphQLServer.use(cors())
graphQLServer.use(compression())
graphQLServer.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress(req => ({ schema, context: { req } }))
)
graphQLServer.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

graphQLServer.listen(GRAPHQL_PORT, () => {
  console.log(`Go to http://localhost:${GRAPHQL_PORT}/graphiql to run queries!`)
})