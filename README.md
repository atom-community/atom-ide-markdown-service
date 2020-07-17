# atom-ide-markdown-service package

Markdown service in atom-ide-community packages (e.g. ide-datatip).

### Usage

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
let renderer: (markdownText: string, grammar: string) => Promise<string>;

/**
 * retrieves a reference to the markdown rendering service that should be used
 * @param  {AtomIDE.MarkdownService} rendererIn the service for rendering markdown text
 */
export function consumeMarkdownRenderer(rendererIn: AtomIDE.MarkdownService) {
  renderer = rendererIn;
}
```

`renderer` is a function with this type:

```js
let renderer: (markdownText: string, grammar: string) => Promise<string>;
```
