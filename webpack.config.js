var path = require('path')
var webpack = require('webpack')

const webpackConfig = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test:/.json$/,
        loader:'json'
      },
      {
        test:/vux.src.*?js$/,
        loader:'babel-loader'
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
    },
    extensions: ['.js','.vue','.json'],
  },
  externals: {
    // 'aUrl': ' "http://10.30.75.217:9090" '
    'aUrl': ' "http://www.gonyb.com:9090" '
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  module.exports.externals = {
    'aUrl' : "http://www.gonyb.com:9090"
  }
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}


const vuxLoader = require('vux-loader')
module.exports = vuxLoader.merge(webpackConfig, {
  options: {},
  plugins: [
    {
      name: 'vux-ui'
    },
    {
      name: 'less-theme',
      path: 'src/style/theme.less'
    }
    ]
})

