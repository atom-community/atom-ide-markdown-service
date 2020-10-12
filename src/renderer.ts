// TODO fix types

import { TextEditor, TextEditorElement } from "atom"
import { scopeForFenceName, fenceNameForScope } from "./utils"
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
    el.style.pointerEvents = "none"
    el.style.position = "absolute"
    el.style.top = "100vh"
    el.style.width = "100vw"
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
  sanitizer: (html) => DOMPurify.sanitize(html),
})

/**
 * renders markdown to safe HTML
 * @param  {String} markdownText the markdown text to render
 * @param grammar scope name used for highlighting the code
 * @return {Node} the html template node containing the result
 */
function internalRender(markdownText: string, grammar: string = "text.plain"): Node {
  let html = marked(markdownText, {
    highlight: function(code, lang, callback) {
      let scopeName = grammar ?? scopeForFenceName(lang);
      highlight(code, scopeName).then((codeResult) => {
        callback(null, codeResult.join("\n"))
      }).catch((e) => {
        callback(e)
      })
    }
  })
  let template = document.createElement("template")
  template.innerHTML = html.trim()
  return template.content.cloneNode(true)
}

/**
 * renders the markdown text to html
 * @param  {string} markdownText the markdown text to render
 * @param  {string} grammar the default grammar used in code sections that have no specific grammar set
 * @return {Promise<string>} the inner HTML text of the rendered section
 */
export async function render(markdownText: string, grammar: string): Promise<string> {
  let node = internalRender(markdownText, grammar)
  let div = document.createElement("div")
  div.appendChild(node)
  document.body.appendChild(div)
  div.remove()
  return div.innerHTML
}
