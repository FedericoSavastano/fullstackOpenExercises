//CONTROLLER: Es el encargado de hacer la accion con ese modelo/molde que importa. Lo guarda, borra, edita, etc.
//exporta todas las utilidades a usar.

const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

const jwt = require('jsonwebtoken');

// const getTokenFrom = (request) => {
//     const authorization = request.get('authorization');
//     if (authorization && authorization.startsWith('Bearer ')) {
//         return authorization.replace('Bearer ', '');
//     }
//     return null;
// };

//GET ALL
// blogsRouter.get('/', (request, response)=>{
//     Blog.find({}).then((blogs) => {
//         response.json(blogs);
//     });
// })

//With Async Await
blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {
        username: 1,
        name: 1,
    });
    response.json(blogs);
});

//POST
// blogsRouter.post('/', (request, response, next) => {
//     const body = request.body;

//     const blog = new Blog({
//         title: body.title,
//         author: body.author,
//         url: body.url,
//         likes: body.likes || 0,
//     });

//     blog.save()
//         .then((savedBlog) => {
//             response.json(savedBlog);
//         })
//         .catch((error) => next(error));
// });

//with async await
blogsRouter.post('/', async (request, response) => {
    const body = request.body;

    //  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);

    // const decodedToken = jwt.verify(request.token, process.env.SECRET);
    // if (!decodedToken.id) {
    //     return response.status(401).json({ error: 'token invalid' });
    // }
    // const user = await User.findById(decodedToken.id);

    const user = request.user;

    // const user = await User.findById(body.userId);

    if (body.title === undefined || body.url === undefined)
        response.status(400).end();
    else {
        const blog = new Blog({
            title: body.title,
            author: body.author || 'unknown',
            url: body.url,
            likes: body.likes || 0,
            user: user.id,
        });

        const savedBlog = await blog.save();
        user.blogs = user.blogs.concat(savedBlog.id);
        await user.save();
        // response.json(savedBlog);
        response.status(201).json(savedBlog);
    }
});

//GET BY ID
// blogsRouter.get('/:id', (request, response, next) => {
//     Blog.findById(request.params.id)
//         .then((blog) => {
//             if (blog) {
//                 response.json(blog);
//             } else {
//                 response.status(404).end();
//             }
//         })
//         .catch((error) => next(error));
// });
//with async await
blogsRouter.get('/:id', async (request, response) => {
    const requestedBlog = await Blog.findById(request.params.id);
    if (requestedBlog) response.json(requestedBlog);
    else response.status(404).end();
});

//DELETE
// blogsRouter.delete('/:id', (request, response, next) => {
//     Blog.findByIdAndDelete(request.params.id)
//         .then(() => {
//             response.status(204).end();
//         })
//         .catch((error) => next(error));
// });

//with async await
blogsRouter.delete('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id);

    const user = request.user;

    if (blog.user.toString() === user.id.toString()) {
        await Blog.findByIdAndDelete(request.params.id);
        response.status(204).end();
    } else {
        return response.status(400).json({
            error: 'Only author can delete the blog',
        });
    }
});

//PUT
// blogsRouter.put('/:id', (request, response, next) => {
//     const body = request.body;

//     const blog = {
//         title: body.title,
//         author: body.author,
//         url: body.url,
//         likes: body.likes,
//     };

//     Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
//         .then((updatedBlog) => {
//             response.json(updatedBlog);
//         })
//         .catch((error) => next(error));
// });

//with async await
blogsRouter.put('/:id', async (request, response) => {
    const body = request.body;

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    };

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
        new: true,
    });
    response.json(updatedBlog);
});

module.exports = blogsRouter;
