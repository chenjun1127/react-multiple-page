const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const webpackConfig = {
	mode: 'development',
	entry: entries(),
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: 'js/[name].js',
	},
	module: {
		rules: [{
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
		}, {
			test: /\.(scss|css)$/,
			use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader']
		}, {
			test: /\.(png|svg|jpg|gif)$/,
			use: [{
				loader: 'file-loader',
				options: {
					name: 'images/[name].[ext]?[hash]'
				}
			}]
		}]
	},
	resolve: {
		extensions: [".js", ".json", ".jsx", ".css", ".scss"],
	},
	plugins: [
		// new CleanWebpackPlugin(path.resolve(__dirname, 'dist')),
		new webpack.HotModuleReplacementPlugin()
	],
	devServer: {
		contentBase: path.resolve(__dirname, "dist"),
		port: 4000,
		open: true,
		inline: true,
		hot: true
		// openPage:'index.html'// 默认打开哪个页面
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
		chunks: [name]
	});
	webpackConfig.plugins.push(plugin);
})

module.exports = webpackConfig;