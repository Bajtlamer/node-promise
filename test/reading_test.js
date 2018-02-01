const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {
    let bajt;

    beforeEach((done) => {
        bajt = new User({ name: 'Bajt' });
        bajt.save()
        .then(() => done())
    });

    it('finds all users with a name oj bajt', (done) =>{
        User.find({ name: 'Bajt' })
        .then((users) => {
            assert(users[0]._id.toString() === bajt._id.toString());
            done();
        });
    });

    it('Find user with a particular ID', (done) => {
        User.findOne({ _id: bajt._id })
        .then((user) => {
            assert(user.name === 'Bajt');
            done();
        })
    });
});