const assert = require('assert');
const User = require('../src/user');


describe('Subdocument', () => {
    it('Can create a subdocument', (done) => {
      const bajt = new User({ 
          name: 'Bajt', 
          posts: [{ title: 'PostTitle' }] 
        });


        bajt.save()
        .then(() => User.findOne({ name: 'Bajt' }))
        .then((user) => {
            assert(user.posts[0].title ===  'PostTitle');
            done();
        });
    });

    it('Can add subdocument to an existing record', (done) => {
      const bajt = new User({
          name: 'Bajt',
          posts: []
      });

      bajt.save()
        .then(() => User.findOne({ name: 'Bajt' }))
        .then((user) => {
            user.posts.push({ title: 'New Post' });
            return user.save();
        })
        .then(() => User.findOne({ name: 'Bajt' }))
        .then((user) => {
            assert(user.posts[0].title === 'New Post');
            done();
        })

    });

    it('Can remove an existing subdocument', (done) => {
      const bajt = new User({
          name: 'Bajt',
          posts: [{ title: 'New Post' }]
      });

      bajt.save()
        .then(() => User.findOne({ name: 'Bajt' }))
        .then((user) => {
            const post = user.posts[0];
            post.remove();
            return user.save();
        })
        .then(() => User.findOne({ name: 'Bajt' }))
        .then((user) => {
            assert(user.posts.length === 0);
            done();
        });
    });
});