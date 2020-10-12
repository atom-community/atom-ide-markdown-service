// These functions are deprecated because they edit the markdown output. We instead use a `highlight` hook to tokenize and highlight the code

import { TextEditor, TextEditorElement } from "atom"
import { scopeForFenceName, fenceNameForScope } from "./utils"

/**
 * iterates over the content of the HTML fragment and replaces any code section
 * found with an Atom TextEditor element that is used for syntax highlighting the code
 *
 * @param  {HTMLElement} domFragment the HTML fragment to be analyzed and
 * @param  {String} grammar the default grammar to be used if the code section doesn't have a specific grammar set
 * @return  a promise that is resolved when the fragment is ready
 */
export async function highlightCodeFragments(domFragment: HTMLElement, grammar: string): Promise<any> {
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

  const elements: HTMLPreElement[] = [].slice.call(domFragment.querySelectorAll("pre"))
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
    return await tokenizeEditor(editorElement, preElement)
  })

  return await Promise.all(promises)
}

/**
 * takes an Atom TextEditor element, tokenize the content and move the resulting lines to the pre element given
 * @param  editorElement the HTML element containing the Atom TextEditor
 * @param  preElement    the HTML pre element that should host the resulting lines
 * @return a promise that is triggered as soon as tokenization and moving the content is done
 */
export function tokenizeEditor(editorElement: TextEditorElement, preElement: HTMLPreElement): Promise<void> {
  let p = new Promise<void>((resolve, reject) => {
    let done = () => {
      editorElement.querySelectorAll(".line:not(.dummy)").forEach((line) => {
        let line2 = document.createElement("div")
        line2.className = "line"
        line2.innerHTML = line.firstElementChild?.innerHTML ?? ""
        preElement.appendChild(line2)
      })
      editorElement.remove()
      resolve()
    }
    const editor = editorElement.getModel()
    const languageMode = editor.getBuffer().getLanguageMode()
    if ("fullyTokenized" in languageMode || "tree" in languageMode) {
      editor.component
        .getNextUpdatePromise()
        .then(() => {
          done()
        })
        .catch(reject)
    } else {
      editor.onDidTokenize(() => {
        done()
      })
    }
  })
  return p
}
