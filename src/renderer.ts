let markdown_parse: typeof import("markdown-wasm").parse | undefined

import DOMPurify from "dompurify"
import type { Config as DOMPurifyOriginalConfig } from "dompurify"

import { highlightTreeSitter } from "./highlighter"
import make_synchronous from "make-synchronous"
const highlightTreeSitterSync = make_synchronous(highlightTreeSitter)

export type DOMPurifyConfig = Omit<
  DOMPurifyOriginalConfig,
  "RETURN_DOM" | "RETURN_DOM_FRAGMENT" | "RETURN_TRUSTED_TYPE"
>

/**
 * renders markdown to safe HTML asynchronously
 * @param markdownText the markdown text to render
 * @param scopeName scope name used for highlighting the code
 * @param purifyConfig (optional) configuration object for DOMPurify
 * @return the html string containing the result
 */
export async function render(
  markdownText: string,
  scopeName: string = "text.plain",
  domPurifyConfig?: DOMPurifyConfig
): Promise<string> {
  if (markdown_parse === undefined) {
    // wasm should be loaded async
    // @ts-ignore
    const markdown_wasm = (await import("markdown-wasm/dist/markdown.es")) as typeof import("markdown-wasm") & {
      ready: Promise<void>
    }
    // instantiate wasm
    await markdown_wasm.ready
    markdown_parse = markdown_wasm.parse
  }
  const renderedHTML = markdown_parse(markdownText, {
    onCodeBlock(_, body) {
      return highlightTreeSitterSync(body.toString(), scopeName)
    },
  })
  // sanitization to make safe HTML strings
  return domPurifyConfig !== undefined
    ? DOMPurify.sanitize(renderedHTML, domPurifyConfig)
    : DOMPurify.sanitize(renderedHTML)
}
