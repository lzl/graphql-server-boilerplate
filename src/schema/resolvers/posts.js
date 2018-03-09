const Posts = [
  {
    id: '0',
    text: 'aaa',
  },
  {
    id: '1',
    text: 'bbb',
  },
]

let id = 2

export default {
  Query: {
    post() {
      return null
    },
    allPosts(_, args, ctx) {
      const { authorization } = ctx.req.headers
      if (authorization) {
        const token = authorization.replace('Bearer ', '')
        console.log('token:', token)
      }
      return Posts
    },
  },
  Post: {
    user(post) {
      return null
    },
  },
  Mutation: {
    addPost(root, params, context) {
      const { text } = params
      const newPost = { id: (id++).toString(), text }
      Posts.push(newPost)
      return newPost
    },
  },
}
