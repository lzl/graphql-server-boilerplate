import { createError } from 'apollo-errors'
import jwt from 'jsonwebtoken'

const AuthorizationError = createError('AuthorizationError', {
  message: 'You are not authorized.',
})

const directiveResolvers = {
  isAuthenticated: (next, source, args, context) => {
    const token = context.headers.authorization
    if (!token) {
      throw new AuthorizationError({
        message: 'You must supply a JWT for authorization!',
      })
    }
    try {
      const decoded = jwt.verify(
        token.replace('Bearer ', ''),
        process.env.JWT_SECRET
      )
      context.user = decoded
      return next()
    } catch (err) {
      throw new AuthorizationError({
        message: 'You are not authorized.',
      })
    }
  },
  hasScope: (next, source, args, context) => {
    const token = context.headers.authorization
    console.log('hasScope:', token)
    const expectedScopes = args.scope
    if (!token) {
      throw new AuthorizationError({
        message: 'You must supply a JWT for authorization!',
      })
    }
    try {
      const decoded = jwt.verify(
        token.replace('Bearer ', ''),
        process.env.JWT_SECRET
      )
      const scopes = decoded.scope.split(' ')
      if (expectedScopes.some(scope => scopes.indexOf(scope) !== -1)) {
        return next()
      } else {
        throw new Error()
      }
    } catch (err) {
      throw new AuthorizationError({
        message: `You are not authorized. Expected scopes: ${expectedScopes.join(
          ', '
        )}`,
      })
    }
  },
}

export default directiveResolvers
