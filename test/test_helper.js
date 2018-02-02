const error = require('util');

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before((done) => {
    mongoose.connect('mongodb://localhost/user_test');
    // mongoose.connect("mongodb://user:password@mongodb.ws24.cz:27017/user_test?authSource=admin&ssl=true");
    mongoose.connection
    .once('open', () => {
        console.log('Connected...');
        done();
    })
    .on('error', () => {
        console.warn('Warning', error);
    })
});


beforeEach((done) => {
    const { users, comments, blogposts } = mongoose.connection.collections;
    users.drop(() => {
        comments.drop(() => {
            blogposts.drop(() => {
                done();
            })
        })
    });
});

after((done) => {
    mongoose.connection.close(done);
});