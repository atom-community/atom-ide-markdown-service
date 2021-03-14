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

export type PurifyConfig = Omit<DOMPurify.Config, "RETURN_DOM" | "RETURN_DOM_FRAGMENT" | "RETURN_TRUSTED_TYPE">

/**
 * renders markdown to safe HTML asynchronously
 * @param markdownText the markdown text to render
 * @param scopeName scope name used for highlighting the code
 * @return the html string containing the result
 */
function internalRender(
  markdownText: string,
  scopeName: string = "text.plain",
  purifyConfig?: PurifyConfig
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
        html = purifyConfig ? DOMPurify.sanitize(html, purifyConfig) : DOMPurify.sanitize(html)

        return resolve(html)
      }
    )
  })
}

/**
 * renders the markdown text to html
 * @param markdownText the markdown text to render
 * @param grammar the default grammar used in code sections that have no specific grammar set
 * @return the inner HTML text of the rendered section
 */
export async function render(markdownText: string, grammar: string, purifyConfig?: PurifyConfig): Promise<string> {
  const html = await internalRender(markdownText, grammar, purifyConfig)
  return html
}
