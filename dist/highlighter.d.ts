declare module "atom" {
    interface GrammarRegistry {
        grammarForId(id: string): Grammar;
        languageModeForGrammarAndBuffer(g: Grammar, b: TextBuffer): LanguageMode;
    }
    interface LanguageMode {
        readonly fullyTokenized?: boolean;
        readonly tree?: boolean;
        onDidTokenize(cb: () => void): Disposable;
        buildHighlightIterator(): HighlightIterator;
        classNameForScopeId(id: ScopeId): string;
        startTokenizing?(): void;
    }
    interface HighlightIterator {
        seek(pos: {
            row: number;
            column: number;
        }): void;
        getPosition(): {
            row: number;
            column: number;
        };
        getOpenScopeIds?(): ScopeId[];
        getCloseScopeIds?(): ScopeId[];
        moveToSuccessor(): void;
    }
    interface ScopeId {
    }
}
export declare function highlightTreeSitter(sourceCode: string, scopeName: string): Promise<string>;
