const { rules, loaders, plugins, stats } = require('webpack-atoms')
const browsers = ['last 2 versions', 'ie >= 10']
const path = require('path')
const isDev = process.env.NODE_ENV === 'development'

module.exports = 
  // function(config) {
  //   return 
    {
    // ...config,
    mode: isDev ? 'development' : 'production',
    entry: [
      '@babel/polyfill', // enables async-await
      './client/index.js'
    ],
    output: {
      path: __dirname,
      filename: './public/bundle.js'
    },
    devtool: 'source-map',
    module: {
      rules: [
        // rules.js(),
        // rules.fonts(),
        // rules.images(),
        // rules.css(),
        // rules.less({ browsers }),
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.css$/,          
          use: [
            { loader: "style-loader" },
            { loader: "css-loader" }
          ]
          // loader: 'style-loader!css-loader'      
        },
        {
          test: /\.less$/,
          // loader: 'less-loader',
          use: [{
            loader: 'style-loader' // creates style nodes from JS strings
          }, {
            loader: 'css-loader' // translates CSS into CommonJS
          }, {
            loader: 'less-loader' // compiles Less to CSS
          }]          
          // options: {
          //   paths: [
          //     path.resolve(__dirname, 'node_modules')
          //   ]
          // }
        },
        // rules.js(),
        // rules.fonts(),
        // rules.images(),
        // rules.css(),
        // rules.less({ browsers }),
      ]
    },

    // plugins: [...config.plugins, plugins.extractText()],
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
