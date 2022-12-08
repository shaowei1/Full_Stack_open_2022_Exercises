const BlogsRouter = require('express').Router()
const Blog = require('../models/blog')

BlogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  return response.json(blogs)
})

BlogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url:body.url,
    likes: body.likes || 0
  })

  try{
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  }catch(exception){
    next(exception)
  }
})

module.exports = BlogsRouter
