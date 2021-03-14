import { TextBuffer, LanguageMode } from "atom"

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
  const yielder = await eventLoopYielder(100, 5000)
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
        const open = iter.getOpenScopeIds().map((x) => lm.classNameForScopeId(x))
        const close = iter.getCloseScopeIds().map((x) => lm.classNameForScopeId(x))
        res.push(...close.map((_) => `</span>`))
        res.push(...open.map((x) => `<span class="${x}">`))
        iter.moveToSuccessor()
        const nextPos = iter.getPosition()
        res.push(escapeHTML(buf.getTextInRange([pos, nextPos])))
        try {
          await yielder()
        } catch (e) {
          console.error(e)
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

async function eventLoopYielder(delayMs: number, maxTimeMs: number) {
  await new Promise(setImmediate)
  const started = performance.now()
  let lastYield = started
  let now = lastYield
  return async function () {
    now = performance.now()
    if (now - lastYield > delayMs) {
      await new Promise(setImmediate)
      lastYield = now
    }
    if (now - started > maxTimeMs) {
      const err = new Error("Max time reached")
      let description = `The highlighter took too long to complete and was terminated.`
      atom.notifications.addError("Atom-IDE-Markdown-Service: Highlighter took more than 5 seconds to complete", {
        dismissable: true,
        description,
        stack: err.stack,
      })
      throw err
    }
  }
}

function escapeHTML(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}
