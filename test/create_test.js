const assert = require('assert');
const User = require('../src/user');

describe('Creating records', () => {
    it('Saves a test user', (done) => {
        const bajt = new User({ name: 'Bajt' });
        bajt.save()
        .then(() => {
            assert(!bajt.isNew)
            done();
        });
    });
});