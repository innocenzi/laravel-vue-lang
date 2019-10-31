import { LangOptions } from "lang.js";
import { IgnoreList } from "./IgnoreList";

export interface Options {
  lang: LangOptions;
  ignore?: IgnoreList;
}
