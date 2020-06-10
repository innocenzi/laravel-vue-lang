import Translator, { Replacements, LangOptions } from 'lang.js';
import { VueConstructor } from 'vue';

/*
|--------------------------------------------------------------------------
| Types & Interfaces
|--------------------------------------------------------------------------
*/

type TranslateFunction = (key: string, replacements?: Replacements, locale?: string) => string;
type IgnoreList = Map<string, string[]>;

interface Translations {
	// eg. fr.auth
	[localeDotDomain: string]: {
		[key: string]: string;
	};
}

interface Options extends LangOptions {
	ignore: IgnoreList;
	globalTranslationsKey: string;
}

/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
*/

/**
 * Determines if the given locale and domain combination is ignored.
 */
function shouldIgnore(ignore: IgnoreList, locale: string, domain: string) {
	for (let [ignoreLocale, ignoreDomains] of Object.entries(ignore)) {
		if (locale === ignoreLocale && ignoreDomains.includes(domain)) {
			return true;
		}
	}

	return false;
}

/**
 * Imports translations from the configured alias.
 */
function importTranslations({ ignore }: Partial<Options>): Translations {
	const catalogue: Translations = {};
	const files = require.context('@lang', true, /\.(php|json)$/);

	files.keys().forEach((file: string) => {
		const [match, locale, domain] = new RegExp('./(.*)/(.*).(?:php|json)').exec(file) ?? [];

		if (!ignore || !shouldIgnore(ignore, locale, domain)) {
			catalogue[`${locale}.${domain}`] = files(file);
		}
	});

	return catalogue;
}

/*
 |--------------------------------------------------------------------------
 | Vue plugin
 |--------------------------------------------------------------------------
 */

/**
 * Augments vue.
 */
declare module 'vue/types/vue' {
	interface Vue {
		$lang: () => Translator;
		__: TranslateFunction;
	}
}

/**
 * Adds localization to Vue.
 */
const Lang = {
	install: (Vue: VueConstructor, options: Partial<Options> = {}) => {
		// Creates the Lang.js object
		const i18n = new Translator({
			fallback: document.documentElement.lang || navigator.language,
			messages: options?.messages ?? importTranslations(options),
			...options,
		});

		// Defines the translation function
		const __: TranslateFunction = (...args) => i18n.get(...args);

		Vue.mixin({
			methods: {
				$lang: () => i18n,
				__,
			},
		});
	},
};

export { Lang as default, Lang };
