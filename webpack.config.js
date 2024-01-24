const path = require('path');
const Dotenv = require('dotenv-webpack');

const config = (env) => {
  console.log('env:', env);
  return {
    mode: env['--mode'] || 'development',
    entry: {
      path: path.join(__dirname, 'client/src/index.js')
    },
    output: {
      path: path.join(__dirname, 'client/dist/'),
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.js/,
          exclude: /nodeModules/,
          loader: 'babel-loader'
        },
        {
          test: /\.(css|scss)\b/,
          use: ['style-loader', 'css-loader', 'sass-loader']
        }
      ]
    },
    devServer: {
      historyApiFallback: true,
      static: path.join(__dirname, 'client/dist'),
      proxy: {
        '/': 'http://localhost:3000'
      }
    },
    plugins: [
      new Dotenv({systemvars: true})
    ]
  }
}

module.exports = config;