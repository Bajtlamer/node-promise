const assert = require('assert');
const mongoose = require('mongoose');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('Middleaware', () => {
    let bajt, blogPost;

    beforeEach((done) => {
        bajt = new User({ name: 'Bajt' });
        blogPost = new BlogPost({ title: 'JS is Great', content: 'Yep it really is' });

        bajt.blogPosts.push(blogPost);

        Promise.all([bajt.save(), blogPost.save()])
        .then(() => done());
    });


    it('User clean up dandling blogposts on remove', (done) => {
        bajt.remove()
            .then(() => BlogPost.count())
            .then((count) => {
                assert(count === 0);
                done();
        });
    });
    
});
