// @ts-check
/// <reference path="../typings/atom-ide.d.ts"/>
'use babel';

const { CompositeDisposable } = require('atom');
const renderer = require('./renderer');

/**
 * the Atom IDE markdown service plugin
 * @type {Object}
 */
module.exports = {
  /**
   * [subscriptions description]
   * @type {CompositeDisposable}
   */
  subscriptions: null,

  /**
   * called by Atom when activating an extension
   * @param  {any} state the current state of atom
   */
  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();
  },

  /**
   * called by Atom when deactivating an extension
   */
  deactivate() {
    if (this.subscriptions) {
      this.subscriptions.dispose();
    }
    this.subscriptions = null;
  },

  /**
   * provide an interface to the Markdown renderer service
   * @return {AtomIDE.MarkdownService} the markdown renderer service
   */
  provideMarkdownRenderer() {
    return renderer;
  }
};
