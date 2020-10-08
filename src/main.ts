import { CompositeDisposable } from "atom"
import { render } from "./renderer"
import type { MarkdownService } from "atom-ide-base"

/**
 * [subscriptions description]
 */
let subscriptions: CompositeDisposable | null

/**
 * called by Atom when activating an extension
 */
export function activate() {
  // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
  subscriptions = new CompositeDisposable()
}

/**
 * called by Atom when deactivating an extension
 */
export function deactivate() {
  if (subscriptions) {
    subscriptions.dispose()
  }
  subscriptions = null
}

/**
 * provide an interface to the Markdown renderer service
 * @return {MarkdownService} the markdown renderer service
 */
export function provideMarkdownRenderer(): MarkdownService {
  return { render }
}
