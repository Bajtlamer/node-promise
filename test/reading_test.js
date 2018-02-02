const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {
    let bajt, maria, alex, zach;

    beforeEach((done) => {
        bajt = new User({ name: 'Bajt' });
        maria = new User({ name: 'Maria' });
        alex = new User({ name: 'Alex' });
        zach = new User({ name: 'Zach' });

        Promise.all([bajt.save(), maria.save(), alex.save(), zach.save()])
        .then(() => done());
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

    it('Can skip and limit the result set', (done) => {
        User.find({}).skip(1).limit(2).sort({ name: 1 })
        .then((users) => {
            assert(users.length === 2);
            assert(users[0].name === 'Bajt');
            assert(users[1].name === 'Maria');
            done();
        })
    });
});