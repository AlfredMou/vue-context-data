module.exports = {
    // mode: 'development',
    entry: {
        bundle: './index.js',
    },
    output: {
        path: __dirname + '/dist',
        filename: 'index.js',
        publicPath: '/',
        library: 'vueContextData',
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            { test: /\.js$/, use: ['babel-loader'] },
        ],
    },
};
