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
    allPosts() {
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
