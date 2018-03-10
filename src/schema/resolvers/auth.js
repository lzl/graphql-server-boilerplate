import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { createError } from 'apollo-errors'

const AuthorizationError = createError('AuthorizationError', {
  message: 'Invalid username or password.',
})

const username = 'lizunlong'
const password = 'abc'
const hashedPassword = bcrypt.hashSync(password)

const Users = [{ username, password: hashedPassword }]

export default {
  Mutation: {
    signup(root, params, context) {
      const { username, password } = params
      const hashedPassword = bcrypt.hashSync(password)
      Users.push({ username, password: hashedPassword })

      const token = jwt.sign({ username }, process.env.JWT_SECRET)
      return { token }
    },
    login(root, params, context) {
      const { username, password } = params
      const user = Users.find(u => u.username === username)
      const { password: hashedPassword } = user
      const isValid = bcrypt.compareSync(password, hashedPassword)

      if (!isValid) {
        throw new AuthorizationError({
          message: 'Invalid username or password.',
        })
      }

      const token = jwt.sign({ username }, process.env.JWT_SECRET)
      return { token }
    },
  },
}
