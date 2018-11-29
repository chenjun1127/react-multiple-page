const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const webpackConfig = {
    mode: 'production',
    entry: entries(),
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'js/[name].[hash:8].js',
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        }, {
            test: /\.(scss|css)$/,
            use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        // you can specify a publicPath here
                        // by default it use publicPath in webpackOptions.output
                        publicPath: '../'
                    }
                },
                'css-loader',
                'sass-loader',
                'postcss-loader',
            ],
        }, {
            test: /\.(png|svg|jpg|gif)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: 'images/[name].[hash:8].[ext]'
                }
            }]
        }]
    },
    resolve: {
        extensions: [".js", ".json", ".jsx", ".css", ".scss"],
    },
    plugins: [
        new CleanWebpackPlugin(path.resolve(__dirname, 'dist')),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash:8].css'
        }),
        new OptimizeCssAssetsPlugin(),
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                // 首先: 打包node_modules中的文件
                vendor: {
                    name: "vendor",
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "all",
                    priority: 10
                },
                // 注意: priority属性
                // 其次: 打包业务中公共代码
                common: {
                    name: "common",
                    chunks: "all",
                    minSize: 1,
                    priority: 0
                }
            }
        }
    }
}

function entries() {
    const globPath = path.resolve(__dirname, 'src/app/*.{js,jsx}');
    var entries = {},
        filename;
    glob.sync(globPath).forEach(function(filePath) {
        filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
        entries[filename] = filePath;
    });
    return entries;
}

Object.keys(entries()).forEach(function(name) {
    var plugin = new HtmlWebpackPlugin({
        // 生成出来的html文件名
        filename: name + '.html',
        // 每个html的模版，这里多个页面使用同一个模版
        template: './src/views/' + name + '.html',
        title: '',
        // 自动将引用插入html
        inject: true,
        // 每个html引用的js模块，也可以在这里加上vendor等公用模块
        chunks: ['vendor', 'common', name],
        chunksSortMode: 'manual', // 手动排序
        minify: {
            // 去除注释
            removeComments: true,
            // 压缩HTML代码，变成一行
            collapseWhitespace: true
        },
    });
    webpackConfig.plugins.push(plugin);
})

module.exports = webpackConfig;