var path = require('path');
var htmlWP = require('html-webpack-plugin');
module.exports = {
    entry: path.resolve(__dirname, './src/main.js'),
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new htmlWP({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html'
        })
    ],
    module: {
        rules: [{
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.less$/,
                use: ["style-loader", "css-loader", "less-loader"]
            },
            {
                test: /\.(jpg|png|gif|mp3|mp4|avi|txt|woff|ttf)$/,
                use: [{
                    loader: "url-loader",
                    options: { limit: 10240 }
                }]
            },
            {
                test: /\.js$/,
                use: ["babel-loader"],
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                use: ["vue-loader"]
            }
        ]
    },
    devServer: {
        open: true,
        port: 8888,
        contentBase: 'dist'
    }
}