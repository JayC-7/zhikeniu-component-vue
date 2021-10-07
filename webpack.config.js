const path = require('path')
const VueLoaderPlugin = require('vue-loader/dist/plugin').default
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
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

const babelConfig = {
  cacheDirectory: true,
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'not ie 11']
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    // [
    //   'babel-plugin-import' 
    // ]
    ['@vue/babel-plugin-jsx', { mergeProps: false, enableObjectSlots: false }],
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-transform-object-assign',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-class-properties'
  ]
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
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: babelConfig
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              appendTsSuffixTo: ['\\.vue$'],
              happyPackMode: false
            }
          }
        ],
        exclude: /node_modules/
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
    extensions: ['.js', '.ts', '.tsx', '.vue', '.md']
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