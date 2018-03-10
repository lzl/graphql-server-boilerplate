export default {
  Query: {
    me(_, args, ctx) {
      return ctx.user
    },
    user() {
      return null
    },
    allUsers() {
      return null
    },
  },
  User: {
    posts(user) {
      return null
    },
  },
}
