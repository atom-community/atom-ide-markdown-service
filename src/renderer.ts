import { TextEditor } from "atom"
import marked from "marked"

/**
 * safe DOM markup operations
 * a reference to the DOMpurify function to make safe HTML strings
 * @type {DOMPurify}
 */
import DOMPurify from "dompurify"

/**
 * A function that resolves once the given editor has tokenized
 * @param editor
 */
export async function editorTokenized(editor: TextEditor) {
  return new Promise((resolve) => {
    const languageMode = editor.getBuffer().getLanguageMode()
    const nextUpdatePromise = editor.component.getNextUpdatePromise()
    if ("fullyTokenized" in languageMode || "tree" in languageMode) {
      resolve(nextUpdatePromise)
    } else {
      const disp = editor.onDidTokenize(() => {
        disp.dispose()
        resolve(nextUpdatePromise)
      })
    }
  })
}

/**
 * Highlights the given code with the given scope name (language)
 * @param code the given code as string
 * @param scopeName the language to highlight the code for
 */
export async function highlight(code: string, scopeName: string) {
  const ed = new TextEditor({
    readonly: true,
    keyboardInputEnabled: false,
    showInvisibles: false,
    tabLength: atom.config.get("editor.tabLength"),
  })
  const el = atom.views.getView(ed)
  try {
    el.setUpdatedSynchronously(true)
    atom.grammars.assignLanguageMode(ed.getBuffer(), scopeName)
    ed.setText(code)
    ed.scrollToBufferPosition(ed.getBuffer().getEndPosition())
    atom.views.getView(atom.workspace).appendChild(el)
    await editorTokenized(ed)
    return Array.from(el.querySelectorAll(".line:not(.dummy)")).map((x) => x.innerHTML)
  } finally {
    el.remove()
  }
}

marked.setOptions({
  breaks: true,
})

/**
 * renders markdown to safe HTML asynchronously
 * @param markdownText the markdown text to render
 * @param scopeName scope name used for highlighting the code
 * @return the html string containing the result
 */
function internalRender(markdownText: string, scopeName: string = "text.plain"): Promise<string> {
  return new Promise((resolve, reject) => {
    marked(
      markdownText,
      {
        highlight: function (code, lang, callback) {
          highlight(code, scopeName)
            .then((codeResult) => {
              callback!(null, codeResult.join("\n"))
            })
            .catch((e) => {
              callback!(e)
            })
        },
      },
      (e, html) => {
        if (e) {
          reject(e)
        }
        // sanitization
        html = DOMPurify.sanitize(html)

        return resolve(html)
      }
    )
  })
}

/**
 * renders the markdown text to html
 * @param markdownText the markdown text to render
 * @param grammar the default grammar used in code sections that have no specific grammar set
 * @return the inner HTML text of the rendered section
 */
export async function render(markdownText: string, grammar: string): Promise<string> {
  const html = await internalRender(markdownText, grammar)
  return html
}
