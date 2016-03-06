module.exports = {
	entry: "./js/app.jsx",
	output: {
		path: __dirname,
		filename: "bundle.js"
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
	externals: {
		'react': 'React'
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	}
};
