const config = require('../../config');
const twitter = require('../../services/twitter');

module.exports = function routes(router) {
  router.route('/config')
    .get((req, res) => {
      res.json(config);
    });

  router.route('/hashtags/:id?')
    .get((req, res) => {
      const { id = 23424977 } = req.params; // default to USA's woeid
      twitter.getTrendsById(id)
        .then(hashtags => {
          console.log('got hashtags', hashtags);
          return hashtags;
        })
        .then(hashtags => res.json(hashtags))
        .catch(err => res.status(400).json(err));
    });
};