/* eslint no-console: 0 */

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const dir = require('node-dir');
const app = express();
const http = require('http').Server(app);
const router = express.Router();

const config = require('./src/config');
const { environment, port } = config;
const devMode = ['development'].indexOf(environment) > -1;
const twitter = require('./src/services/twitter');

/**
 * API Routes
 */
dir.files(path.join(__dirname, '/src/routes/api'), (err, files) => {
  if (err) throw err;

  files.forEach(filePath => {
    require(filePath)(router);
  });
});

app.use('/api', jsonParser, router);

if (devMode) {
  const webpack = require('webpack');
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const config = require('./webpack.config.js');

  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    watchOptions: {
      poll: true
    },
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('*', (req, res) => {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
    res.end();
  });
} else {
  app.use(express.static(path.join(__dirname, '/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}

http.listen(port, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.info(`Running in ${environment}`);
  console.info(`==> Listening on port ${port}. Open up http://0.0.0.0:${port}/ in your browser.`);
});