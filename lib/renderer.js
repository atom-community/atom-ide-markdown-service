'use babel';

import { TextEditor } from 'atom';
import { scopeForFenceName } from './utils';

const marked = require('marked');
const createDOMPurify = require('dompurify');
/**
 * [domPurify description]
 * @type {DOMPurify}
 */
const domPurify = createDOMPurify();

/**
 * [highlightCodeFragments description]
 * @param  {HTMLElement}   domFragment [description]
 * @returns {Promise}
 */
function highlightCodeFragments(domFragment) {
  const defaultLanguage = 'text';
  // set editor font family
  const fontFamily = atom.config.get('editor.fontFamily');
  const fontSize = atom.config.get('editor.fontSize');
  if (fontFamily !== null) {
    domFragment.querySelectorAll('code').forEach(codeElement => {
      codeElement.style.fontFamily = fontFamily;
      codeElement.style.fontSize = fontSize;
    });
  }

  let promises = new Array();
  domFragment.querySelectorAll('pre').forEach((preElement) => {
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
    promises.push(tokenizeEditor(editorElement, preElement));
  });

  return Promise.all(promises);
}

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
      });
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
 * [render description]
 * @param  {String}   markdownText [description]
 * @returns {HTMLElement} node
 */
function internalRender(markdownText) {
  // Remove the <!doctype> since otherwise marked will escape it
  // https://github.com/chjj/marked/issues/354
  let text = markdownText.replace(/^\s*<!doctype(\s+.*)?>\s*/i, '');
  let html = domPurify.sanitize(marked(text, { breaks: true }));
  let template = document.createElement('template');
  template.innerHTML = html.trim();
  return template.content.cloneNode(true);
}


export default {
  /**
   * [render description]
   * @param {String} requestToken
   * @param  {String} markdownText [description]
   * @return {Promise}              [description]
   */
  render (markdownText) {
    let node = internalRender(markdownText);
    let div = document.createElement('div');
    div.appendChild(node);
    document.body.appendChild(div);

    let result = new Promise((resolve, reject) => {
      highlightCodeFragments(div).then(() => {
        div.remove();
        resolve(div.innerHTML);
      }).catch((err) => {
        console.error(err);
        reject(err);
      });
    });
    return result;
  }
}
