const { test, describe } = require('node:test');
const assert = require('node:assert');
const listHelper = require('../utils/list_helper');
const { log } = require('node:console');

// test('dummy returns one', () => {
//     const blogs = [];
//     const result = listHelper.dummy(blogs);
//     assert.strictEqual(result, 1);
// });

const blogs = [
    {
        "title": "First blog",
        "author": "Pedro Pe",
        "url": "urlx",
        "likes": 22,
        "id": "6631adbb6822753d77c39ea7"
    },
    {
        "title": "Another blog",
        "author": "LocoLo",
        "url": "http://asdasd",
        "likes": 30,
        "id": "6631ade26822753d77c39eaa"
    },
    {
        "title": "BlogX",
        "author": "LocoLo",
        "url": "asdasdas",
        "likes": 16,
        "id": "6631adbb6822753d77cddddd"
    },
    {
        "title": "Batiblog",
        "author": "Batman",
        "url": "asda22tttt",
        "likes": 26,
        "id": "6yyyybb6822753d77cddddd"
    },
    {
        "title": "Algoblog",
        "author": "Batman",
        "url": "asda22222",
        "likes": 76,
        "id": "61ddbb6822753d77cddddd"
    },
    {
        "title": "locoblog",
        "author": "LocoLo",
        "url": "asda2225656",
        "likes": 13,
        "id": "61ddbsdfgdfg2753d77cddddd"
    }
];

describe('Test by likes', () => {
    test('Total likes', () => {
        const result = listHelper.totalLikes(blogs);
    });

    test('When list has only one blog, equals the likes of that', () => {
        const listWithOneBlog = [
            {
              _id: '5a422aa71b54a676234d17f8',
              title: 'Go To Statement Considered Harmful',
              author: 'Edsger W. Dijkstra',
              url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
              likes: 5,
              __v: 0
            }
        ];
    
        const result = listHelper.totalLikes(listWithOneBlog)
        assert.strictEqual(result, 5)
    });

    test('Favorite blog', () => {
        const result = listHelper.favoriteBlog(blogs);
        log('Fav blog result: ', result);
    });

    test('Most active author', () => {
        const result = listHelper.mostBlogs(blogs);
        log('Most active author: ', result);
    });

    test('Top author', () => {
        const result = listHelper.mostLikes(blogs);
        log('Top author: ', result);
    });
});