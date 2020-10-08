# atom-ide-markdown-service package

Markdown service in atom-ide-community packages (e.g. ide-datatip).

### Usage

Just install.

### Developer Usage

Put this in your `package.json`

```json
"consumedServices": {
  "markdown-renderer": {
    "versions": {
      "1.0.0": "consumeMarkdownRenderer"
    }
  }
}
```

and use it inside your package like this:

```js
let renderer: (markdownText: string, grammar: string) => Promise<string>

/**
 * retrieves a reference to the markdown rendering service that should be used
 * @param  {MarkdownService} markdownService the service for rendering markdown text
 */
export function consumeMarkdownRenderer(markdownService: MarkdownService) {
  renderer = markdownService.render
}
```

`renderer` is a function with this type:

```js
let renderer: (markdownText: string, grammar: string) => Promise<string>
```
