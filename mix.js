const mix = require('laravel-mix');
const path = require('path');

class LangExtension {
	register(lang) {
		this.lang = lang || './resources/lang';
	}

	webpackRules() {
		return {
			test: /resources[\\\/]lang.+\.(php)$/,
			loader: 'php-array-loader',
		};
	}

	webpackConfig(webpackConfig) {
		webpackConfig.resolve.alias = webpackConfig.resolve.alias || {};
		webpackConfig.resolve.alias['@lang'] = path.resolve('./resources/lang');
	}
}

mix.extend('lang', new LangExtension());
