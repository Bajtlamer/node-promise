const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', () => {
    let bajt;

    beforeEach((done) => {
        bajt = new User({ name: 'Bajt' });
        bajt.save()
            .then(() => done());
    });

    it('Model instance remove', (done) => {
        bajt.remove()
            .then(() => User.findOne({ name: 'Bajt' }))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('Class method removee', (done) => {
        User.remove({ name: 'Bajt' })
        .then(() => User.findOne({ name: 'Bajt' }))
        .then((user) => {
            assert(user === null);
            done();
        });
    });

    it('Class method findAndRemove', (done) => {
        User.findOneAndRemove({ name: 'Bajt' })
        .then(() => User.findOne({ name: 'Bajt' }))
        .then((user) => {
            assert(user === null);
            done();
        });
    });

    it('Class method findByIdAndRemove', (done) => {
        User.findByIdAndRemove(bajt._id)
        .then(() => User.findOne({ name: 'Bajt' }))
        .then((user) => {
            assert(user === null);
            done();
        });
    });
})