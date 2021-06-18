/*
 * @Author: your name
 * @Date: 2021-06-16 22:38:49
 * @Description: file content
 */
import Affix from "./affix";

export interface Options {
  navigateMode?: 'push' | 'replace';
}

const parseConfig = {
  skipNull: true,
  skipEmptyString: true,
  parseNumbers: false,
  parseBooleans: false,
};
interface UrlState {
  [key: string]: any;
}

export default {
  Affix
}