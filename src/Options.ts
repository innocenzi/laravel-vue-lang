import { IgnoreList } from "./IgnoreList";
import { Catalogue } from "./Catalogue";

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
