const merge = require('webpack-merge');
const common = require('./webpack.common.js')
const path = require('path');

module.exports = merge(common, {
    mode: 'development',
    output: {
        publicPath: '/'
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, '../dist'), // server root dist
        host: 'localhost', // server host address
        port: 9900, // server port
        hot: true, // enable webpack's Hot Module Replacement feature
        overlay: true, // show a full-screen overlay in the browser
        open: true, // open browser auto
        proxy: { // proxy for crossOrigin
            '/': {
                target: '',
                secure: true,
                changeOrigin: true
            }
        }
    }
})