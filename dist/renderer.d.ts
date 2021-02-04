import { TextEditor } from "atom";
export declare function editorTokenized(editor: TextEditor): Promise<unknown>;
export declare function highlight(code: string, scopeName: string): Promise<string[]>;
export declare function render(markdownText: string, grammar: string): Promise<string>;
