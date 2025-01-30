const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogs = [
    {
        title: 'cucu',
        author: 'cucu - man',
        url: 'www.qq.com',
        likes: 3,
        id: '6740b980973f977c0db5c48b',
    },
    {
        title: 'post',
        author: 'post - man',
        url: 'www.post.com',
        likes: 4,
        id: '6740c978485c049be1515ba8',
    },
    {
        title: 'peter-parker',
        author: 'test - man',
        url: 'www.test.com',
        likes: 4,
        id: '6740cac6752406af74c1043c',
    },
];

const nonExistingId = async () => {
    const blog = new Blog({ content: 'willremovethissoon' });
    await blog.save();
    await blog.deleteOne();

    return blog._id.toString();
};

const blogsInDb = async () => {
    const blogs = await Blog.find({});
    return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
    const users = await User.find({});
    return users.map((u) => u.toJSON());
};

module.exports = {
    initialBlogs,
    nonExistingId,
    blogsInDb,
    usersInDb,
};
