const assert = require('assert');
const mongoose = require('mongoose');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');


describe('Association', () => {
    let bajt, blogPost, comment, test;

    beforeEach((done) => {
        bajt = new User({ name: 'Bajt' });
        blogPost = new BlogPost({ title: 'JS is Great', content: 'Yep it really is' });
        comment = new Comment({ content: 'Congrats for a new Post' });

        bajt.blogPosts.push(blogPost);
        blogPost.comments.push(comment);
        comment.user = bajt;

        Promise.all([bajt.save(), blogPost.save(), comment.save()])
        .then(() => done());
    });

    it('Saves a relation between a user and blogpost', (done) => {
        User.findOne({ name: 'Bajt' })
        .populate('blogPosts')
        .then((user) => {
            assert(user.blogPosts[0].title === 'JS is Great')
            done();
        });
    });

    it('Saves a full associatons graph', (done) => {
        User.findOne({ name: 'Bajt' })
        .populate({
            path: 'blogPosts',
            populate: {
                path: 'comments',
                model: 'comment',
                populate: {
                    path: 'user',
                    model: 'user'
                }
            }
        })
        .then((user) => {
            assert(user.name === 'Bajt');
            assert(user.blogPosts[0].title === "JS is Great");
            assert(user.blogPosts[0].comments[0].content === "Congrats for a new Post");
            assert(user.blogPosts[0].comments[0].user.name === "Bajt");
            done();
        });
    });
});