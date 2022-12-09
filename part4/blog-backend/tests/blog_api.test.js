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

  const token = await helper.root_token()
  await api
    .post('/api/blogs')
    .auth(token, { type: 'bearer' })
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  console.log('blogs', response.body)
  let len = response.body.length
  expect(response.body[len-1].user.username).toBe('root')
  const usersResponse = await api.get('/api/users')
  console.log('users', usersResponse.body[0].blogs)
  expect(usersResponse.body[0].blogs[0].title).toBe(newBlog.title)

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
  const token = await helper.root_token()
  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .auth(token, { type: 'bearer' })
  expect(response.body.likes).toBe(0)
})

test('reject add a invalid blog', async()=>{
  const newBlog = {
    author: 'sw',
    likes: 3
  }
  const token = await helper.root_token()
  const response = await api
    .post('/api/blogs')
    .auth(token, {type: 'bearer'})
    .send(newBlog)
  expect(response.statusCode).toBe(400)
})

test('a blog can be deleted', async() => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]
  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)
  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(
    helper.initialBlogs.length - 1
  )
  const titles = blogsAtEnd.map(r => r.title)
  expect(titles).not.toContain(blogToDelete.title)
})

test('a blog can be update', async() => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]
  const updatBlog = {
    title: 'new title',
    likes: 7
  }
  const response = await api 
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatBlog)
  expect(response.statusCode).toBe(200)
  expect(response.body.title).toBe(updatBlog.title)
  expect(response.body.likes).toBe(updatBlog.likes)

})

afterAll(() => {
  mongoose.connection.close()
})
