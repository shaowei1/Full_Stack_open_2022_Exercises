const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
}, 100000)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
},100000)

test('blog id is defined', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'async/await simplifies making async calls',
    author: 'sw',
    url: 'wwww.blog.com'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.title)

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  expect(titles).toContain(
    'async/await simplifies making async calls'
  )
})

test('set likes default 0, if missing from request', async () => {
  const newBlog = {
    title: 'test likes default 0',
    author: 'sw',
    url: 'www.blog.com'
  }
  const response = await api.post('/api/blogs').send(newBlog)
  expect(response.body.likes).toBe(0)
})

test('reject add a invalid blog', async()=>{
  const newBlog = {
    author: 'sw',
    likes: 3
  }
  const response = await api.post('/api/blogs').send(newBlog)
  expect(response.statusCode).toBe(400)
})

afterAll(() => {
  mongoose.connection.close()
})
