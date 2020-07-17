// @ts-check
/// <reference path="../typings/atom-ide.d.ts"/>
'use babel';

import { TextEditor } from 'atom';
import { scopeForFenceName, fenceNameForScope } from './utils';
import marked from 'marked';

 /**
  * safe DOM markup operations
  * a reference to the DOMpurify function to make safe HTML strings
  * @type {DOMPurify}
  */
 import DOMPurify from "dompurify";


/**
 * iterates over the content of the HTML fragment and replaces any code section
 * found with an Atom TextEditor element that is used for syntax highlighting the code
 *
 * @param  {HTMLElement} domFragment the HTML fragment to be analyzed and
 * @param  {String} grammar     the default grammar to be used if the code section doesn't have a specific grammar set
 * @return {Promise}  a promise that is resolved when the fragment is ready
 */
async function highlightCodeFragments(domFragment, grammar) {
  const defaultLanguage = fenceNameForScope(grammar || 'text.plain');
  // set editor font family
  const fontFamily = atom.config.get('editor.fontFamily');
  const fontSize = atom.config.get('editor.fontSize');
  if (fontFamily !== null) {
    domFragment.querySelectorAll('code').forEach(codeElement => {
      codeElement.style.fontFamily = fontFamily;
      codeElement.style.fontSize = `${fontSize}`;
    });
  }

  const elements = [].slice.call(domFragment.querySelectorAll('pre'));
  const promises = elements.map(async (preElement) => {
    let codeBlock = preElement.firstElementChild != null ? preElement.firstElementChild : preElement;
    let fenceName = codeBlock.getAttribute('class') ? codeBlock.getAttribute('class').replace(/^lang-/, '').replace(/^language-/, '') : defaultLanguage;
    preElement.classList.add('editor-colors', `lang-${fenceName}`);

    let editor = new TextEditor({
      readonly: true,
      keyboardInputEnabled: false,
      softWrapped: true,
      softWrapAtPreferredLineLength: true,
      preferredLineLength: 80
    });
    let editorElement = editor.getElement();
    editorElement.setUpdatedSynchronously(true);

    preElement.innerHTML = '';
    preElement.parentNode.insertBefore(editorElement, preElement);

    editor.setText(codeBlock.textContent.replace(/\r?\n$/, ''));

    atom.grammars.assignLanguageMode(editor, scopeForFenceName(fenceName));
    editor.setVisible(true);
    return await tokenizeEditor(editorElement, preElement);
  });

  return await Promise.all(promises);
}

/**
 * takes an Atom TextEditor element, tokenize the content and move the resulting lines to the pre element given
 * @param  {HTMLElement} editorElement the HTML element containing the Atom TextEditor
 * @param  {HTMLPreElement} preElement    the HTML pre element that should host the resulting lines
 * @return {Promise}  a promise that is triggered as soon as tokenization and moving the content is done
 */
function tokenizeEditor(editorElement, preElement) {
  let p = new Promise((resolve, reject) => {
    let done = () => {
      editorElement.querySelectorAll('.line:not(.dummy)').forEach((line) => {
       let line2 = document.createElement('div');
       line2.className = 'line';
       line2.innerHTML = line.firstChild.innerHTML;
       preElement.appendChild(line2);
      });
      editorElement.remove();
      resolve();
    }
    const editor = editorElement.getModel();
    const languageMode = editor.getBuffer().getLanguageMode();
    if ((languageMode.fullyTokenized) || (languageMode.tree)) {
      editor.component.getNextUpdatePromise().then(() => {
        done();
      })
      .catch(reject);
    }
    else {
      editor.onDidTokenize(() => {
        done();
      });
    }
  });
  return p;
}

/**
 * renders markdown to safe HTML
 * @param  {String} markdownText the markdown text to render
 * @return {Node} the html template node containing the result
 */
function internalRender(markdownText) {
  // Remove the <!doctype> since otherwise marked will escape it
  // https://github.com/chjj/marked/issues/354
  let text = markdownText.replace(/^\s*<!doctype(\s+.*)?>\s*/i, '');
  let html = DOMPurify.sanitize(marked(text, { breaks: true }));
  let template = document.createElement('template');
  template.innerHTML = html.trim();
  return template.content.cloneNode(true);
}

/**
 * renders the markdown text to html
 * @param  {string} markdownText the markdown text to render
 * @param  {string} grammar the default grammar used in code sections that have no specific grammar set
 * @return {Promise<string>} the inner HTML text of the rendered section
 */
export async function render (markdownText: string, grammar: string): Promise<string> {
    let node = internalRender(markdownText);
    let div = document.createElement('div');
    div.appendChild(node);
    document.body.appendChild(div);

    await highlightCodeFragments(div, grammar);
    div.remove();
    return div.innerHTML;
}
