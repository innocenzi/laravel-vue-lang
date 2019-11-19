import { IgnoreList } from "./IgnoreList";
import { Catalogue } from "./Catalogue";

export interface Options {
  shortLanguage?: boolean;
  locale?: string;
  fallback?: string;
  messages?: Catalogue;
  ignore?: IgnoreList;
}
