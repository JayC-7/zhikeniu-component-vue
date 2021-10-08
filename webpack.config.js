const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 解析.env文件，注入process.env
const dotenv = require('dotenv').config({ path: path.join(__dirname, '/.env') })

// 转换.env中得值为stringify，否则放入process.env中时不会被识别
const getProcessEnv = (env) => {
  const tempEnv = {}
  Object.keys(env).forEach(key => {
    tempEnv[key] = JSON.stringify(env[key])
  })
  return tempEnv
}

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './examples/index.js'),
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(vue)$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /pickr.*js/,
        options: {
          presets: [
            [
              'env',
              {
                targets: {
                  browsers: [
                    'last 2 versions',
                    'Firefox ESR',
                    '> 1%',
                    'ie >= 9',
                    'iOS >= 8',
                    'Android >= 4',
                  ],
                },
              },
            ],
          ],
          plugins: [
            'transform-vue-jsx',
            'transform-object-assign',
            'transform-object-rest-spread',
            'transform-class-properties',
          ],
        },
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                sourceMap: true,
                javascriptEnabled: true
              }
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          'css-loader',
        ],
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.vue', '.md']
  },
  devServer: {
    port: 8082,
    hot: true
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),

    // 将process.env设置为全局变量
    new webpack.DefinePlugin({
      'process.env': getProcessEnv(dotenv.parsed)
    }),

    // 配置html模板
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './examples/index.html'),
      filename: 'index.html',
      title: 'Zhikeniu Components',

      // 注入.env中得配置使html模板文件能读取到
      templateParameters (compilation, assets, assetTags, options) {
        return {
          compilation: compilation,
          webpack: compilation.getStats().toJson(),
          webpackConfig: compilation.options,
          htmlWebpackPlugin: {
            tags: assetTags,
            files: assets,
            options: options
          },
          ...process.env
        }
      },
      nodeModules: false
    }),

    new VueLoaderPlugin(),
  ]
}