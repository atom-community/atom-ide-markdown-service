# atom-ide-markdown-service package

Markdown service in atom-ide-community packages (e.g. ide-datatip).

### Usage

Just install.

### Developer Usage - As apm package

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
import type {MarkdownService} from "atom-ide-base"

let render: MarkdownService["render"]

/**
 * retrieves a reference to the markdown rendering service that should be used
 * @param  {MarkdownService} markdownService the service for rendering markdown text
 */
export function consumeMarkdownRenderer(markdownService: MarkdownService) {
  render = markdownService.render
}
```

`render` is a function with this type:

```js
let render: (markdownText: string, grammar: string) => Promise<string>
```

### Developer Usage - as npm package - ES6 modules

```
npm install --save atom-ide-markdown-service
```

and use it inside your package like this:

```js
import { render } from "atom-ide-markdown-service/modules/renderer.es"
```

in which renderer is a function with this type `render(markdownText: string, grammar: string) => Promise<string>`

### Developer Usage - as npm package - commonjs

```
npm install --save atom-ide-markdown-service
```

and use it inside your package like this:

```js
const { render } = require("atom-ide-markdown-service/modules/renderer")
```

in which render is a function with this type `renderer(markdownText: string, grammar: string) => Promise<string>`
