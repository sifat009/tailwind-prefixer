const path = require('path');

module.exports = {
	// VS Code extensions must be compiled to CommonJS modules
	target: 'node',

	// Set to 'production' for minimized, bundled code
	mode: 'production',

	entry: './extension.js', // Your source file
	output: {
		path: path.resolve(__dirname, 'dist'), // Output directory (often named 'dist' or 'out')
		filename: 'extension.js', // Output file name
		libraryTarget: 'commonjs2',
		devtoolModuleFilenameTemplate: '../[resource-path]',
	},

	// Prevent VS Code dependencies from being bundled
	externals: {
		vscode: 'commonjs vscode',
	},

	resolve: {
		extensions: ['.js'],
	},

	// Enable source map support for debugging the packaged extension
	devtool: 'source-map',
};
