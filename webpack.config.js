const path = require('path');

const config = {
  entry: {
    main: './src/main.js',
    app:  './src/app.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist','bundlejs'),
    publicPath: "/bundlejs/",
    filename: '[name].bundle.js'
  },
  mode: 'development'
};

module.exports = config;
