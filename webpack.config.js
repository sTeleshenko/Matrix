module.exports = {
    entry: './src/index.ts',
    output: {
        path: '/dist',
        filename: 'index.js',
        publicPath: '/dist/'
    },
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            }
        ]
    }
}