var Twit = require('twit');
var config = require('../config');

const { consumer_key, consumer_secret, access_token, access_token_secret } = config.twitter;

var T = new Twit({
  consumer_key,
  consumer_secret,
  access_token,
  access_token_secret,
  timeout_ms: 60 * 1000  // optional HTTP request timeout to apply to all requests.
});

class HashTagData {
  constructor() {
    this.refreshInterval = 5 * 60 * 1000; // 5 minutes in ms
    this.lastRefreshed = 0;
    this.cached = [];
  }

  fetch(id) {
    return T.get('trends/place', { id })
      .then(results => {
          const data = results.data[0].trends
            .filter(trend => trend.tweet_volume > 0)
            .map(trend => ({
              name: trend.name,
              volume: trend.tweet_volume
            }));

          this.cached = data;
          this.lastRefreshed = Date.now();
          return data;
        }
      );
  }

  fetchData(id) {
    if (Date.now() - this.lastRefreshed > this.refreshInterval) {
      // Needs refreshed
      console.log('Refreshing cache');
      return this.fetch(id);
    } else {
      console.log('Using cache');
      return Promise.resolve(this.cached);
    }
  }
}

const hashTagData = new HashTagData();

const getTrendsById = function (id) {
  return hashTagData.fetchData(id);
};

module.exports = {
  getTrendsById
};