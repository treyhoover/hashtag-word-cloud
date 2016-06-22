const environment = process.env.NODE_ENV || 'development';

const config = {
  development: {

  },
  production: {

  }
};

module.exports = Object.assign(config[environment], {
  name: 'AppContainer',
  version: '0.0.0',
  port: 3000,
  twitter: {
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  },
  environment
});