const lodash = require('lodash');

const dummy = (blogs) => {
    return 1;
};

const totalLikes = (blogs) => {
    if(blogs.length === 1){ return blogs[0].likes };
    blogs.reduce((prev, current, total) => {
        return total += prev.likes + current.likes;
    });
};
  
const favoriteBlog = (blogs) => {
    if(blogs.length === 1){ return blogs[0] };
    let mostLiked = blogs.reduce((prev, current) => {
        return current.likes > prev.likes ? current : prev;
    });
    return mostLiked;
};

//Tests with Lodash (Exercises 4.6 and 4.7).

const mostBlogs = (blogs) => {
    let result = lodash.head(lodash(blogs)
        .countBy('author')
        .entries()
        .maxBy(lodash.last));

    return result; 
};

const mostLikes = (blogs) => {
    let obj = {}

    blogs.forEach((blog, index) => {
        let { author, likes } = blog

        if (!obj[author]) {

            obj[author] = {
            author,
            totalLikes: likes
            };            
        } else {
            let { totalLikes } = obj[author]
            obj[author].totalLikes = totalLikes + likes
        };
    });

    return obj;
};

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
};