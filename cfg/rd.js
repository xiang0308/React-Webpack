'use strict';

let path = require('path');
let webpack = require('webpack');

let baseConfig = require('./base');
let defaultSettings = require('./defaults');

// Add needed plugins here
let BowerWebpackPlugin = require('bower-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');

let config = Object.assign({}, baseConfig, {
	entry: path.join(__dirname, '../src/index'),
	output: {
		path: path.join(__dirname, '/../rd'),
        filename: '[name]_[hash:8].js',
        chunkFilename: '[name]_[hash:8].js',
        publicPath: ''
        // publicPath: 'http://rongyi.b0.upaiyun.com/fe/screen/v23/assets/'
	},
	cache: false,
	devtool: 'source-map',
	// devtool: 'hidden-source-map',
	plugins: [
		new webpack.optimize.DedupePlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': '"production"'
		}),
		new BowerWebpackPlugin({
			searchResolveModulesDirectories: false
		}),
		new webpack.optimize.UglifyJsPlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.AggressiveMergingPlugin(),
		new webpack.NoErrorsPlugin(),
        new HtmlWebpackPlugin({
            inject: 'body',
            template: './src/index.html',
            filename: 'index.html'
        })
	],
	module: defaultSettings.getDefaultModules()
});

// Add needed loaders to the defaults here
config.module.loaders.push({
	test: /\.(js|jsx)$/,
	loader: 'babel',
	include: [].concat(
		config.additionalPaths,
		[ path.join(__dirname, '/../src') ]
	)
});

module.exports = config;
