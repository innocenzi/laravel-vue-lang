# Localization for Vue and Laravel

## Installation

```console
$ yarn add laravel-vue-lang
```

## With the Laravel Mix extension

This package ships with a Laravel Mix extension. You can include it and call `.lang()` on Mix. 
If for some reason your localization files are not in `resources/lang`, you can pass a string in `.lang()`: `mix.lang('resources/translations')`.

Your `webpack.mix.js` should look like that:

```js
const mix = require('laravel-mix');
require('laravel-vue-lang/mix');

mix.
    // ...
    lang();
```

## Without the extension

Add the following loader rule to your webpack configuration:

```js
{
    test: /resources[\\\/]lang.+\.(php|json)$/,
    loader: 'laravel-localization-loader',
}
```

Also add a `@lang` alias to `./resources/lang`, or whatever path your lang files are in.

A Laravel Mix config without the extension would look like this:

```js
mix.webpackConfig({
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
import Lang from 'laravel-vue-lang';

Vue.use(Lang, {
  locale: 'fr',
  fallback: 'en',
  ignore: {
    fr: ['validation'],
  },
});
```
Make sure that it goes before:
```js
const app = new Vue({
    el: '#app',
});
```

You can now use the following in any Vue file:

- `__(key: string, replacements?: Replacements, locale?: string)` - To translate `key` with variables `replacements` and locale `locale`.
- `$lang()` - Returns the `lang.js` object.

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

### `Support for String as Keys`
This package supports the usage of Strings as Keys for application with heavy translation requirements. As proposed by [Laravel](https://laravel.com/docs/7.x/localization#using-translation-strings-as-keys) the way to archive this is by adding a `_global` key.

Example:
```html
<template>
  <div>
    <span>{{ __('_global.This is a long string as key') }}</span>
  </div>
</template>
```


## Options

There are a few options you can use. 

### `shortLanguage`

This option will transform the locale language code to `ISO-639-1`. For instance, instead of `fr-FR`, it will use `fr`. Note that the package doesn't actually check if the code is legal, it just keeps only the two first characters. 

This options is set to `false` by default.

### `locale` and `fallback`

You can force a locale and define a fallback by using these two options. By default, the locale is determined using the HTML `lang` attribute. If it is empty, [`navigator.language`](https://developer.mozilla.org/en-US/docs/Web/API/NavigatorLanguage/language) is used instead. 

The default fallback is `en`.

### `ignore` 

You can ignore a localization file in a specific language by adding it to the `ignore` options. 

```js
ignore: {
  fr: ['validation'],
}
```
