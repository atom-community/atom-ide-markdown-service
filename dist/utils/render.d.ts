import { TextEditorElement } from "atom";
export declare function highlightCodeFragments(domFragment: HTMLElement, grammar: string): Promise<any>;
export declare function tokenizeEditor(editorElement: TextEditorElement, preElement: HTMLPreElement): Promise<void>;
