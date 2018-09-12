const { rules, loaders, plugins, stats } = require('webpack-atoms')
const browsers = ['last 2 versions', 'ie >= 10']
const path = require('path')
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: [
    '@babel/polyfill', // enables async-await
    './client/index.js'
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
// }


// const { rules, loaders, plugins, stats } = require('webpack-atoms')

// const browsers = ['last 2 versions', 'ie >= 10']

// module.exports = function(config) {
//   return {
//     ...config,
//     module: {
//       rules: [
//         rules.js(),
//         rules.fonts(),
//         rules.images(),
//         rules.css(),
//         rules.less({ browsers }),
//       ],
//     },
//     plugins: [...config.plugins, plugins.extractText()],
//   }
// }
