import marked from "marked"

/**
 * safe DOM markup operations
 * a reference to the DOMpurify function to make safe HTML strings
 * @type {DOMPurify}
 */
import DOMPurify from "dompurify"
import { highlightTreeSitter } from "./highlighter"

marked.setOptions({
  breaks: true,
})

export type DOMPurifyConfig = Omit<DOMPurify.Config, "RETURN_DOM" | "RETURN_DOM_FRAGMENT" | "RETURN_TRUSTED_TYPE">

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
  return new Promise((resolve, reject) => {
    marked(
      markdownText,
      {
        highlight: function (code, _lang, callback) {
          highlightTreeSitter(code, scopeName)
            .then((codeResult) => {
              callback!(null, codeResult)
            })
            .catch((e) => {
              callback!(e)
            })
        },
      },
      (e, html) => {
        if (e) {
          reject(e)
        }
        // sanitization
        html = domPurifyConfig ? DOMPurify.sanitize(html, domPurifyConfig) : DOMPurify.sanitize(html)

        return resolve(html)
      }
    )
  })
}
