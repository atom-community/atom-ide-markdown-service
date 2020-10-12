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
 * iterates over the content of the HTML fragment and replaces any code section
 * found with an Atom TextEditor element that is used for syntax highlighting the code
 *
 * @param  {HTMLElement} domFragment the HTML fragment to be analyzed and
 * @param  {String} grammar the default grammar to be used if the code section doesn't have a specific grammar set
 * @return  a promise that is resolved when the fragment is ready
 */
async function highlightCodeFragments(domFragment: HTMLElement, grammar: string) {
  const defaultLanguage = fenceNameForScope(grammar || "text.plain")
  // set editor font family
  const fontFamily = atom.config.get("editor.fontFamily")
  const fontSize = atom.config.get("editor.fontSize")
  if (fontFamily !== null) {
    domFragment.querySelectorAll("code").forEach((codeElement) => {
      codeElement.style.fontFamily = fontFamily
      codeElement.style.fontSize = `${fontSize}`
    })
  }

  const elements: HTMLPreElement[] = Array.from(domFragment.querySelectorAll("pre"))
  const promises = elements.map(async (preElement) => {
    let codeBlock = preElement.firstElementChild ?? preElement
    let fenceName =
      codeBlock
        .getAttribute("class")
        ?.replace(/^lang-/, "")
        .replace(/^language-/, "") ?? defaultLanguage
    preElement.classList.add("editor-colors", `lang-${fenceName}`)

    let editor = new TextEditor({
      readonly: true,
      keyboardInputEnabled: false,
      softWrapped: true,
      softWrapAtPreferredLineLength: true,
      preferredLineLength: 80,
    })
    let editorElement = editor.getElement()
    editorElement.setUpdatedSynchronously(true)

    preElement.innerHTML = ""
    preElement.parentNode?.insertBefore(editorElement, preElement)

    editor.setText(codeBlock.textContent?.replace(/\r?\n$/, "") ?? "")

    atom.grammars.assignLanguageMode(editor.getBuffer(), scopeForFenceName(fenceName))
    editor.setVisible(true)

    await editorTokenized(editor)

    editorElement.querySelectorAll(".line:not(.dummy)").forEach((line) => {
      let line2 = document.createElement("div")
      line2.className = "line"
      line2.innerHTML = line.firstElementChild?.innerHTML ?? ""
      preElement.appendChild(line2)
    })

    editorElement.remove()
  })

  return await Promise.all(promises)
}

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

marked.setOptions({
  breaks: true,
  sanitizer: (html) => DOMPurify.sanitize(html),
})

/**
 * renders markdown to safe HTML
 * @param  {String} markdownText the markdown text to render
 * @return {Node} the html template node containing the result
 */
function internalRender(markdownText: string): Node {
  let html = marked(markdownText)
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
  let node = internalRender(markdownText)
  let div = document.createElement("div")
  div.appendChild(node)
  document.body.appendChild(div)

  await highlightCodeFragments(div, grammar)
  div.remove()
  return div.innerHTML
}
