declare module "atom-ide" {
  /**
   * the markdown service object
   * @type {AtomIDE.MarkdownService}
   */
  export type render = (markdownText: string, grammar: string) => Promise<string>
}
