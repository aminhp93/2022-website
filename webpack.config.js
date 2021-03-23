const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');

module.exports = {
    mode: "development",
    entry: './src/index.tsx',
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, 'src', 'index.html'),
          title: 'Insight Data Platform',
          filename: 'index.html',
          hash: true,
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 3000
    },    
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: [
                  MiniCssExtractPlugin.loader,
                  'css-loader'
                ],
              },
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
}