const path = require('path');

module.exports = {
  entry: {
    client: ['@babel/polyfill', './ui/assets/scripts/src/client.js'],
    admin: ['@babel/polyfill', './ui/assets/scripts/src/admin.js'],
    cashier: ['@babel/polyfill', './ui/assets/scripts/src/cashier.js'],
    login: ['@babel/polyfill', './ui/assets/scripts/src/login.js'],
    signup: ['@babel/polyfill', './ui/assets/scripts/src/signup.js'],
  },
  output: {
    path: path.resolve(__dirname, 'ui/assets/scripts/dist'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
