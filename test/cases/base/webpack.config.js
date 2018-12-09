const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    // mode: 'development',
    entry: {
        bundle: './index.js',
    },
    output: {
        path: __dirname + '/dest',
        filename: '[name].js',
        publicPath: '/',
    },
    module: {
        rules: [
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.vue$/, use: ['vue-loader'] }
        ],
    },
    plugins: [new VueLoaderPlugin()],
};
