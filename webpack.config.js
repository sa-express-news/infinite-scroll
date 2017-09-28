const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/js/infiniteScroll.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        })
    ],
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    output: {
        filename: 'en-infinite-scroll.js',
        path: path.resolve(__dirname, 'dist')
    }
};
