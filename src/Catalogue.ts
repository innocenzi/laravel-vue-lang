import { shouldIgnore } from './shouldIgnore';
import { IgnoreList, Catalogue } from '.';

/*
 |--------------------------------------------------------------------------
 | Lang Importation
 |--------------------------------------------------------------------------
 |
 | This script takes advantage of `rmariuzzo/laravel-localization-loader`
 | to load all of your available translations. It find files in the
 | /resources/lang directory and imports them.
 |
 */

export function catalogue(ignore: IgnoreList): Catalogue {
  const catalogue: Catalogue = {};
  const include = require.context('@lang', true, /\.(php|json)$/);

  include.keys().forEach((file: string) => {
    const lang = new RegExp('./(.*)/(.*).(?:php|json)').exec(file);

    if (lang && lang.length === 3 && !shouldIgnore({ ignore, locale: lang[1], domain: lang[2] })) {
      catalogue[`${lang[1]}.${lang[2]}`] = include(file);
    }

    // Now check for root level translations
    // Laravel supports for heavy translations
    // Refeer to 'Using Translation Strings As Keys'
    if (lang === null) {
    	const lang = new RegExp('./(.*).(?:json)').exec(file);
    	if (lang) {
    		catalogue[`${lang[1]}._global`] = include(file);
    	}
    }
  });

  return catalogue;
}
