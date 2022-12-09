const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const User = require('../models/user')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })

  await user.save()
})

describe('when there is initially one user in db', () => {
  test('query users', async () => {
    const response = await api.get('/api/users')
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveLength(1)
    expect(response.body[0].username).toBe('root')
  })
})

describe('addition of a new user', () => {

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('fails with status code 400 if data invalid', async () => {
    const newUser = {
      username: 'name',
      password: '11'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(response.body.error).toBe('password length must > 3')

  })
})

afterAll(() => {
  mongoose.connection.close()
})
