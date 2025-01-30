const dummy = (blogs) => {
    // ...
    return 1
  }

  const totalLikes = (blogs) => {
    let total = 0;
     blogs.forEach(blog => {
        total += blog.likes;
     });

     return total;
  }

  const favoriteBlog = (blogs) => {
   
    if(blogs.length === 0) return {};

    return blogs.reduce((max, blog) => (blog.likes > max.likes ? blog : max), blogs[0]);
  }
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  }