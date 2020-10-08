export {}
declare module "atom" {
  interface TextEditor {

    // Get the Element for the editor.
    getElement(): TextEditorElement

    // Controls visibility based on the given {Boolean}.
    setVisible(visible: boolean): void
  }

  interface TextEditorElement {
    setUpdatedSynchronously(val: boolean): void
  }
}
