const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //单独提取CSS文件
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); //CSS压缩

module.exports = {
    entry: {
        index: './src/index.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                },
                include: path.resolve(__dirname, '../src')
            }, {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10,
                        name: 'static/img/[name].[hash:7].[ext]'
                    }
                }
            }, {
                test: /\.(le|c)ss$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        hmr: process.env.NODE_ENV === 'development'
                    }
                },
                    'css-loader',
                    'less-loader'
                ]
            }]
    },
    plugins: [
        new HtmlWebpackPlugin({ // 涉及到多文件入口时，参考 https://www.npmjs.com/package/html-webpack-plugin配置
            filename: 'index.html',
            template: 'public/index.html',
            inject: true,
            chunks: ['index']
        }),
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: true  // Automatically remove all unused webpack assets on rebuild
        }),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[contenthash].css',
            chunks: 'all'
        }),
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
              preset: ['default', { discardComments: { removeAll: true } }],
            },
            canPrint: true
          })
    ],
    output: {
        filename: 'static/js/[name].[hash].js',
        path: path.resolve(__dirname, '../dist')
    }
}