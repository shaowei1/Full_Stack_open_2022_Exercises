const Blog = require('../models/blog')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  await api.post('/api/users').send(initialUsers[0])
})
const initialUsers = [
  {
    username: 'root',
    password: 'root',
    name: 'steven'
  }
]
const initialBlogs = [
  {
    title: 'HTML is easy',
    author: 'shaowei',
    url: 'www.baidu.com',
    likes: 22
  },
  {
    title: 'Browser can execute only Javascript',
    author: 'shaowei',
    url: 'www.baidu.com',
    likes: 1
  },
]


const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', author: 'sw' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const root_token = async () => {
  const loginResponse = await api .post('/api/login') .send(initialUsers[0])
  return loginResponse.body.token
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
  root_token,
  initialUsers
}
