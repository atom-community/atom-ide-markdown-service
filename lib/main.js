// @ts-check
/// <reference path="../typings/atom-ide.d.ts"/>
'use babel';

import { CompositeDisposable } from 'atom';
import { render } from './renderer';

/**
 * the Atom IDE markdown service plugin
 * @type {Object}
 */

/**
 * [subscriptions description]
 * @type {CompositeDisposable}
 */
let subscriptions: CompositeDisposable

/**
* called by Atom when activating an extension
* @param  {any} state the current state of atom
*/
export function activate(state: any) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    subscriptions = new CompositeDisposable();
}

/**
 * called by Atom when deactivating an extension
 */
export function deactivate() {
    if (subscriptions) {
      subscriptions.dispose();
    }
    subscriptions = null;
}

/**
 * provide an interface to the Markdown renderer service
 * @return {AtomIDE.MarkdownService} the markdown renderer service
 */
export function provideMarkdownRenderer(): AtomIDE.MarkdownService {
    return {render};
}
