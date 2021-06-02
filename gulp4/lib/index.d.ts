/// <reference types="react" />
export interface Options {
    navigateMode?: 'push' | 'replace';
}
interface UrlState {
    [key: string]: any;
}
declare const _default: <S extends UrlState = UrlState>(initialState?: S | (() => S) | undefined, options?: Options | undefined) => readonly [Partial<{ [key in keyof S]: any; }>, (s: import("react").SetStateAction<Partial<{ [key in keyof S]: any; }>>) => void];
export default _default;
