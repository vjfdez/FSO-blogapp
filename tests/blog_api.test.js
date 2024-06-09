const { test, after } = require('node:test');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

test('Blogs are returned as json.', ()=> {
    api.get('/api/blogs')
        .then(response => {
            response
                .expect(200)
                .expect('Content-Type', /application\/json/);
        })
        .catch(err => next(err));
})
