const dummy = (blogs) => {
  console.log(blogs)
  return 1
}

const totalLikes = (blogs) => {
  console.log(blogs)
  if (blogs.length === 1){
    return blogs[0].likes
  }else{

    return blogs.reduce((sum, current) => sum + current.likes, 0)

  }

}
module.exports = {
  dummy,
  totalLikes
}
