const assert = require('assert');
const User = require('../src/user');


describe('Virtual types', () => {
    it('postCount returns number of posts', (done) => {
      const bajt = new User({
          name: 'Bajt',
          posts: [{ title: 'PostTitle' }]
      });

      bajt.save()
        .then(() => User.findOne({ name: 'Bajt' }))
        .then((user) => {
            assert(bajt.postCount === 1);
            done();
        })
    });

});