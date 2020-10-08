export {}

// An {Object} with the following fields:
interface BufferChangeEvent {

  // The deleted text
  oldText: string

  // The {Range} of the deleted text before the change took place.
  oldRange: Range

  // The inserted text
  newText: string

  // The {Range} of the inserted text after the change took place.
  newRange: Range
}

type HighlightingChangeEvent = (range: Range) => void

declare module "atom" {


  interface TextEditor {

    // Get the Element for the editor.
    getElement(): TextEditorElement

    // Controls visibility based on the given {Boolean}.
    setVisible(visible: boolean): void
  }

  interface LanguageMode {
    // A {Function} that returns a {String} identifying the language.
    getLanguageId(): string

    // A {Function} that is called whenever the buffer changes.
    bufferDidChange(change: BufferChangeEvent): void

    // A {Function} that takes a callback {Function} and calls it with a {Range} argument whenever the syntax of a given part of the buffer is updated.
    onDidChangeHighlighting(callback: HighlightingChangeEvent): void

    // A function that returns an iterator object with the following methods:
    buildHighlightIterator(): {
      // A {Function} that takes a {Point} and resets the iterator to that position.
      seek(point: Point): any

      // A {Function} that advances the iterator to the next token
      moveToSuccessor(): void

      // A {Function} that returns a {Point} representing the iterator's current position in the buffer.
      getPosition(): Point

      //  A {Function} that returns an {Array} of {Number}s representing tokens that end at the current position.
      getCloseTags(): Array<number>

      // A {Function} that returns an {Array} of {Number}s representing tokens that begin at the current position.
      getOpenTags(): Array<number>
    }

  }

  interface TextBuffer {

    // Experimental: Get the language mode associated with this buffer.
    //
    // Returns a language mode {Object} (See {TextBuffer::setLanguageMode} for its interface).
    getLanguageMode(): string


    // Experimental: Set the LanguageMode for this buffer.
    //
    // * `languageMode` - an {Object} with the following methods:
    setLanguageMode (languageMode: LanguageMode): void
  }

  interface TextEditorElement {
    setUpdatedSynchronously(val: boolean): void
  }
}
