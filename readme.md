# Localization for Vue and Laravel

## Installation

```console
$ yarn add laravel-vue-lang
```

Add the following loader rule to your webpack configuration:

```js
{
    test: /resources[\\\/]lang.+\.(php|json)$/,
    loader: 'laravel-localization-loader',
}
```

Also add a `@lang` alias to `./resources/lang`.

A Laravel Mix config would look like this:

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
