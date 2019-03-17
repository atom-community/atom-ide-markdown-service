'use babel';

import { CompositeDisposable } from 'atom';
import renderer from './renderer';

export default {

  /**
   * [subscriptions description]
   * @type {CompositeDisposable}
   */
  subscriptions: null,

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  provideMarkdownRenderer() {
    return renderer;
  }
};
