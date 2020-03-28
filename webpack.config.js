const path = require('path');

module.exports = {
  entry: './js/index.js',
  mode: 'development',
  watch: true,
  watchOptions: {
    ignored: /node_modules/,
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'assets/js/'),
  },
};
