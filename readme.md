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
        test: /resources[\\\/]lang.+\.(php|json)$/,
        loader: 'laravel-localization-loader',
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
  lang: {
    locale: 'fr',
  },
  ignore: {
    fr: ['validation'],
  },
});
```

You can now use the following in any Vue file:

- `$t(key: string, replacements?: Replacements, locale?: string)` - To translate `key` with variables `replacements` and locale `locale`.
- `$_` - Alias for above method
- `$lang()` - Returns the `lang.js` object.

Example:

```html
<template>
  <div>
    <span>{{ $t('messages.hello') }}</span>
  </div>
</template>

<script>
  export default {
    created() {
      console.log(this.$t('messages.hello'));
    },
  };
</script>
```
