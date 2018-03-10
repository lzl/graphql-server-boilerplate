import { makeExecutableSchema } from 'graphql-tools'

import typeDefs from './typeDefs'
import resolvers from './resolvers'
import directiveResolvers from './directives'

export default makeExecutableSchema({
  typeDefs,
  resolvers,
  directiveResolvers,
})
