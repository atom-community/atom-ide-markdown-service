import { TextBuffer, LanguageMode } from "atom"
import { eventLoopYielder, maxTimeError } from "./utils/event-loop-yielder"

declare module "atom" {
  interface GrammarRegistry {
    grammarForId(id: string): Grammar
    languageModeForGrammarAndBuffer(g: Grammar, b: TextBuffer): LanguageMode
  }
  interface LanguageMode {
    readonly fullyTokenized?: boolean
    readonly tree?: boolean
    onDidTokenize(cb: () => void): Disposable
    buildHighlightIterator(): HighlightIterator
    classNameForScopeId(id: ScopeId): string
    startTokenizing?(): void
  }
  interface HighlightIterator {
    seek(pos: { row: number; column: number }): void
    getPosition(): { row: number; column: number }
    getOpenScopeIds?(): ScopeId[]
    getCloseScopeIds?(): ScopeId[]
    moveToSuccessor(): void
  }
  interface ScopeId {}
}

export async function highlightTreeSitter(sourceCode: string, scopeName: string) {
  const yielder = eventLoopYielder(100, 5000)
  const buf = new TextBuffer()
  try {
    const grammar = atom.grammars.grammarForId(scopeName)
    const lm = atom.grammars.languageModeForGrammarAndBuffer(grammar, buf)
    buf.setLanguageMode(lm)
    buf.setText(sourceCode)
    const end = buf.getEndPosition()
    if (lm.startTokenizing) lm.startTokenizing()
    await tokenized(lm)
    const iter = lm.buildHighlightIterator()
    if (iter.getOpenScopeIds && iter.getCloseScopeIds) {
      let pos = { row: 0, column: 0 }
      iter.seek(pos)
      const res = []
      while (pos.row < end.row || (pos.row === end.row && pos.column <= end.column)) {
        res.push(
          ...iter.getCloseScopeIds().map(() => "</span>"),
          ...iter.getOpenScopeIds().map((x) => `<span class="${lm.classNameForScopeId(x)}">`)
        )
        iter.moveToSuccessor()
        const nextPos = iter.getPosition()
        res.push(escapeHTML(buf.getTextInRange([pos, nextPos])))

        if (!(await yielder())) {
          console.error(maxTimeError("Atom-IDE-Markdown-Service: Highlighter", 5))
          break
        }
        pos = nextPos
      }
      return res.join("")
    } else {
      return sourceCode
    }
  } finally {
    buf.destroy()
  }
}

async function tokenized(lm: LanguageMode) {
  return new Promise((resolve) => {
    if (lm.fullyTokenized || lm.tree) {
      resolve(undefined)
    } else if (lm.onDidTokenize) {
      const disp = lm.onDidTokenize(() => {
        disp.dispose()
        resolve(undefined)
      })
    } else {
      resolve(undefined) // null language mode
    }
  })
}

function escapeHTML(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}
