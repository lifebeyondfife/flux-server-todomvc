var webpack = require('webpack');

module.exports = {
	entry: "./js/app.jsx",
	output: {
		path: __dirname,
		filename: "bundle.min.js"
	},
	module: {
		loaders: [
			{
				test: /\.css$/,
				loader: "style!css"
			},
			{
				test: /\.jsx$/,
				loader: "jsx-loader?insertPragma=React.DOM&harmony"
			}
		]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({minimize: true})
	],
	resolve: {
		extensions: ['', '.js', '.jsx']
	}
};
