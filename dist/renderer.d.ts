import DOMPurify from "dompurify";
export declare type DOMPurifyConfig = Omit<DOMPurify.Config, "RETURN_DOM" | "RETURN_DOM_FRAGMENT" | "RETURN_TRUSTED_TYPE">;
export declare function render(markdownText: string, scopeName?: string, domPurifyConfig?: DOMPurifyConfig): Promise<string>;
