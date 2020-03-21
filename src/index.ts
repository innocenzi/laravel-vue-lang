import Translator, { Replacements } from 'lang.js';
import { catalogue } from './catalogue';
import { VueConstructor } from 'vue';

declare module 'vue/types/vue' {
  interface Vue {
    __: (key: string, replacements?: Replacements, locale?: string) => string;
    $lang: () => Translator;
  }
}

export interface IgnoreList {
  [locale: string]: string[];
}

export interface Catalogue {
  [key: string]: { [key: string]: string };
}

export interface Options {
  /**
   * Use `ISO-639-1` short language codes.
   */
  shortLanguage?: boolean;

  /**
   * Force the default locale.
   */
  locale?: string;

  /**
   * Define a fallback locale.
   */
  fallback?: string;

  /**
   * Override the catalogue.
   */
  messages?: Catalogue;

  /**
   * Ignore files.
   */
  ignore?: IgnoreList;
}

/*
 |--------------------------------------------------------------------------
 | Localization
 |--------------------------------------------------------------------------
 |
 | This wrapper adds localization to your Vue application. It will
 | automatically finds all of your app's translations. If you want,
 | you can ignore some translation files by adding them in the ignore
 | map below.
 |
 */

/**
 * A Lang.js object.
 */
export const Lang = (options?: Options) => {
  let fallback = options?.fallback || 'en';
  let detected = document.documentElement.lang || navigator.language || fallback;

  if (options?.shortLanguage || false) {
    detected = detected.toString().substr(0, 2);
  }

  options = {
    ignore: {},
    locale: detected,
    fallback: fallback,
    messages: catalogue(options ? options.ignore || {} : {}),
    ...options,
  };

  return new Translator({
    fallback: options.fallback,
    locale: options.locale,
    messages: options.messages,
  });
};

/**
 * Adds localization to Vue.
 */
export default {
  install: (Vue: VueConstructor, options?: Options) => {
    const i18n = Lang(options);

    Vue.mixin({
      methods: {
        __: (key: string, replacements?: Replacements, locale?: string) => i18n.get(key, replacements, locale),
        $lang: () => i18n,
      },
    });
  },
};
