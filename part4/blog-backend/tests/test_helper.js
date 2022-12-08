const Blog = require('../models/blog')

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

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}
