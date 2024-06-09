const middleware = require('../utils/middleware');
const User = require('../models/user');
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const jwt = require('jsonwebtoken');

blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({}).populate('user', { username: 1 });
    res.json(blogs);
});

blogsRouter.post('/', middleware.tokenExtractor, middleware.userExtractor, async (req, res) => {
    const user = req.user;
    const body = req.body;

    const userInDB = await User.findById(user);

    const blog = new Blog({
        title: body.title,
        author: user.username,
        url: body.url,
        likes: body.likes,
        user: user.id
    });

    const savedBlog = await blog.save();
    userInDB.blogs = userInDB.blogs.concat(savedBlog._id);
    await userInDB.save();

    res.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', middleware.tokenExtractor, middleware.userExtractor, async (req, res) => {
    const user = req.user;
    const blogId = req.params.id;
    
    const blog = await Blog.findById(blogId);

    if ( blog.user.toString() === user.toString()){
        await Blog.findByIdAndDelete(blogId);
        res.status(201).json({msg: "Blog has been deleted."});
    } else {
        res.status(404).json({error: "Cannot delete a blog from another user."})
    };
});

module.exports = blogsRouter;


