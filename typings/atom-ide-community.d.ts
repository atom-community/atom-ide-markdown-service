declare module "atom-ide" {

  /**
   * the markdown service object
   * @type {AtomIDE.MarkdownService}
   */
  export declare type render = (markdownText: string, grammar: string) => Promise<string>;
}
