const { test, after } = require('node:test');
const supertest = require('supertest');
const bcrypt = require('bcrypt');
const assert = require('node:assert');
const User = require('../models/user');
const helper = require('../utils/helper');
const app = require('../app');

const api = supertest(app);

describe('When there is initially user in DB', ()=> {
    beforeEach(async ()=> {
        await User.deleteMany({});

        const passwordHash = await bcrypt.hash('secret', 10);
        const user = new User({ username: 'root', passwordHash});

        await user.save();
    });

    test('Creation succeeds with a fresh username', async ()=> {
        const usersAtStart = await helper.usersInDB();

        const newUser = {
            username: 'pepetest',
            name: 'Pepe',
            password: 'pptest24'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const usersAtEnd = await helper.usersInDB();
        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

        const usernames = usersAtEnd.map(u => u.username);
        assert(usernames.includes(newUser.username));
    });

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
          username: 'root',
          name: 'mario',
          password: 'mariopass',
        }
    
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)
    
        const usersAtEnd = await helper.usersInDb()
        assert(result.body.error.includes('expected `username` to be unique'))
    
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    });


});