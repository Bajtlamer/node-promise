// import { mongo } from 'mongoose';
const error = require('util');

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before((done) => {
    mongoose.connect('mongodb://localhost/user_test');
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
    mongoose.connection.collections.users.drop(() => {
        done();
    });
});

after((done) => {
    mongoose.connection.close(done);
});