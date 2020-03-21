import { IgnoreList } from '.';

export function shouldIgnore({ ignore, locale, domain }: { ignore: IgnoreList; locale: string; domain: string }): boolean {
  for (let [ignoreLocale, ignoreDomains] of Object.entries<string[]>(ignore)) {
    if (locale === ignoreLocale && ignoreDomains.includes(domain)) {
      return true;
    }
  }

  return false;
}
