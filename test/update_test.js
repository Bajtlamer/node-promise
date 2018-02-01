const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
    let bajt;

    beforeEach((done) => {
        bajt = new User({ name: 'Bajt', postCount: 0 });
        bajt.save()
        .then(() => done())
    });

    function assertName(operation, done){
        operation
            .then(() => User.find({}))
            .then((users) => {
                assert(users.length === 1);
                assert(users[0].name === 'Alex');
                done();
            });
    }
    
    it('Instance type using set and save', (done) => {
        bajt.set( 'name', 'Alex' );
        assertName(bajt.save(), done);
    });


    it('A model instance can update', (done) => {
        assertName(bajt.update({ name: 'Alex' }), done);
    });

    it('A model class can update', (done) => {
        assertName(
            User.update({ name: 'Bajt' }, { name: 'Alex' }), 
            done
        );
    });

    it('A model class can update one record', (done) => {
        assertName(
            User.findOneAndUpdate({ name: 'Bajt' }, { name: 'Alex' }), 
            done
        );
    });

    it('A model class can find a record with and ID and update', (done) => {
        assertName(
            User.findByIdAndUpdate( bajt._id , { name: 'Alex' }), 
            done
        );
    });

    it('A user can have their postcount incremented by 1', (done) => {
        User.update({ name: 'Bajt'}, { $inc: { postCount: 1 } })
        .then(() => {
            User.findOne({ name: 'Bajt' })
            .then((user) => {
                assert(user.postCount === 1);
                done();
            });
        });
    });

});


