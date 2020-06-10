# Localization for Vue and Laravel

This package allows to easily setup localization with a Laravel application using Vue. It is based on [`Lang.js`](https://github.com/rmariuzzo/Lang.js/).

## Installation

```console
$ yarn add laravel-vue-lang
```

### With the Laravel Mix extension

This package ships with a Laravel Mix extension. You can include it and call `.lang()` on Mix. If for some reason your localization files are not in `resources/lang`, you can pass its path as a parameter.

Your `webpack.mix.js` should look like that:

```js
const mix = require('laravel-mix');
require('laravel-vue-lang/mix');

mix
	// ...
	.lang();
```

### Without the extension

If you prefer manual configuration, you will need to add a rule to load your translations, and a `@lang` alias that point to your lang directory. Your Mix configuration should look like this:

```js
const mix = require('laravel-mix');

mix
	// ...
	.webpackConfig({
		resolve: {
			alias: {
				'@lang': path.resolve('./resources/lang'),
			},
		},
		module: {
			rules: [
				{
					test: /resources[\\\/]lang.+\.(php)$/,
					loader: 'php-array-loader',
				},
			],
		},
	});
```

## Usage

Register the plugin in your Javascript:

```js
import { Lang } from 'laravel-vue-lang';

// Register the plugin
Vue.use(Lang, {
	locale: 'fr',
	fallback: 'en',
	ignore: {
		fr: ['validation'],
	},
});

// Register Vue
const app = new Vue({
	el: '#app',
});
```

You can now use the following in any Vue file:

- `__(key: string, replacements?: Replacements, locale?: string)` — Translates `key`, using optional variables `replacements` and locale `locale`.
- `$lang()` — Returns the `lang.js` object.

Example:

```html
<template>
	<div>
		<span>{{ __('messages.hello') }}</span>
	</div>
</template>

<script>
	export default {
		created() {
			console.log(this.__('messages.hello'));
		},
	};
</script>
```

## Options

### `locale` and `fallback`

You can force a locale and define a fallback by using these two options. By default, the locale is determined using the HTML `lang` attribute. If it is empty, [`navigator.language`](https://developer.mozilla.org/en-US/docs/Web/API/NavigatorLanguage/language) is used instead.

If you use a translation key that can't be found, the fallback language will be used instead. If it still can't be found, the translation key will be returned.

### `ignore`

You can ignore a localization file in a specific language by adding it to the `ignore` options.

```js
ignore: {
  fr: ['validation'],
}
```
