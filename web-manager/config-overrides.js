/* config-overrides.js */
const {injectBabelPlugin} = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less-modules');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = function override(config, env) {
	//do stuff with the webpack config...
	if (env === 'production') {
		config.devtool = false
		if (!config.plugins) {
			config.plugins = [];
		}
		config.plugins.push(
			new CompressionPlugin()
		)
	}
	config = injectBabelPlugin(
		['import', {libraryName: 'antd', libraryDirectory: 'es', style: 'css'}],
		config,
	);
	config = rewireLess(config, env);
	config = rewireLess.withLoaderOptions({})(config, env);
	return config;
}
