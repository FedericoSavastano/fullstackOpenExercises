const { test, after, beforeEach, describe } = require('node:test');
const assert = require('node:assert');

const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');

const api = supertest(app);

const Blog = require('../models/blog');

// const initialBlogs = [
//     {
//         title: 'cucu',
//         author: 'cucu - man',
//         url: 'www.qq.com',
//         likes: 3,
//         id: '6740b980973f977c0db5c48b',
//     },
//     {
//         title: 'post',
//         author: 'post - man',
//         url: 'www.post.com',
//         likes: 4,
//         id: '6740c978485c049be1515ba8',
//     },
//     {
//         title: 'peter-parker',
//         author: 'test - man',
//         url: 'www.test.com',
//         likes: 4,
//         id: '6740cac6752406af74c1043c',
//     },
// ];

beforeEach(async () => {
    await Blog.deleteMany({});

    let blogObject = new Blog(helper.initialBlogs[0]);
    await blogObject.save();

    blogObject = new Blog(helper.initialBlogs[1]);
    await blogObject.save();

    blogObject = new Blog(helper.initialBlogs[2]);
    await blogObject.save();
});

test('notes are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);
});

test('there are 3 blogs', async () => {
    const response = await api.get('/api/blogs');

    console.log('response.body', response.body);

    assert.strictEqual(response.body.length, 3);
});

test('the blogs include a key named id', async () => {
    const response = await api.get('/api/blogs');

    const firstBlog = response.body[0];

    assert.strictEqual(firstBlog.hasOwnProperty('id'), true);
});

describe('addition of a new blog', () => {
    test('succeeds with valid data', async () => {
        const newBlog = {
            title: 'tester valid data',
            author: 'valid data - man',
            url: 'www.vd.com',
            likes: 42,
        };

        await api
            .post('/api/blogs')
            .send(newBlog)

            .expect(201)
            .expect('Content-Type', /application\/json/);

        const blogsAtEnd = await helper.blogsInDb();
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);

        const contents = blogsAtEnd.map((n) => n.title);
        assert(contents.includes('tester valid data'));
    });

    test('if no likes property, it will default to value 0', async () => {
        const newBlog = {
            title: 'tester no likes',
            author: 'no likes - man',
            url: 'www.nl.com',
        };

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const blogsAtEnd = await helper.blogsInDb();
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);

        const contents = blogsAtEnd.map((n) => n.likes);

        assert.strictEqual(contents[contents.length - 1], 0);
    });

    test('fails with status code 400 if data invalid', async () => {
        const newBlog = {
            url: 'www.wtf.com',
        };

        await api.post('/api/blogs').send(newBlog).expect(400);

        const blogsAtEnd = await helper.blogsInDb();

        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
    });
});

describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb();
        const blogToDelete = blogsAtStart[0];

        await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

        const blogsAtEnd = await helper.blogsInDb();

        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1);

        const contents = blogsAtEnd.map((r) => r.title);
        assert(!contents.includes(blogToDelete.title));
    });
});

describe('updating of a blog', () => {
    test('succeeds with number of likes incremented by one', async () => {
        const blogsAtStart = await helper.blogsInDb();
        const blogToEdit = blogsAtStart[0];

        blogToEdit.likes += 1;

        await api
            .put(`/api/blogs/${blogToEdit.id}`)
            .send(blogToEdit)
            .expect(200);

        const blogsAtEnd = await helper.blogsInDb();

        assert.strictEqual(
            blogsAtEnd[0].likes,
            helper.initialBlogs[0].likes + 1
        );
    });
});

after(async () => {
    await mongoose.connection.close();
});
