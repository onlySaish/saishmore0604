const path = require('path');

module.exports = {
    entry: './src/index.js', // Adjust this according to your entry point
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'), // Adjust the output directory as needed
    },
    resolve: {
        fallback: {
            "zlib": require.resolve("browserify-zlib"),
            "querystring": require.resolve("querystring-es3"),
            "fs": false,
            "stream": require.resolve("stream-browserify"),
            "path": require.resolve("path-browserify"),
            "buffer": require.resolve("buffer/")
        }
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/, // Updated to handle .js and .jsx files
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    devtool: 'source-map',
    mode: 'development', // Change to 'production' when ready for production
};
