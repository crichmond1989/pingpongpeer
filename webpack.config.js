const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	module: {
		rules: [{
			include: [path.resolve(__dirname, 'src')],
			loader: 'babel-loader',

			options: {
				plugins: ['syntax-dynamic-import'],

				presets: [[
					'env', {
						modules: false
					}
				]]
			},

			test: /\.jsx?$/
		}, {
			test: /\.(less|css)$/,

			use: [{
				loader: MiniCssExtractPlugin.loader
			}, {
				loader: 'css-loader',

				options: {
					sourceMap: true
				}
			}, {
				loader: 'less-loader',

				options: {
					sourceMap: true
				}
			}]
		}]
	},

	mode: 'production',

	optimization: {
		splitChunks: {
			cacheGroups: {
				vendors: {
					priority: -10,
					test: /[\\/]node_modules[\\/]/
				}
			},

			chunks: 'async',
			minChunks: 1,
			minSize: 30000,
			name: false
		}
	},

	plugins: [
		new HtmlWebpackPlugin({
			hash: true,
			title: "Ping Pong Peer"
		})
	]
};
