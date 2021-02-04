const scopesByFenceName = {
  bash: "source.shell",
  sh: "source.shell",
  powershell: "source.powershell",
  ps1: "source.powershell",
  c: "source.c",
  "c++": "source.cpp",
  cpp: "source.cpp",
  coffee: "source.coffee",
  "coffee-script": "source.coffee",
  coffeescript: "source.coffee",
  cs: "source.cs",
  csharp: "source.cs",
  css: "source.css",
  sass: "source.sass",
  scss: "source.css.scss",
  erlang: "source.erl",
  go: "source.go",
  html: "text.html.basic",
  java: "source.java",
  javascript: "source.js",
  js: "source.js",
  json: "source.json",
  less: "source.less",
  mustache: "text.html.mustache",
  objc: "source.objc",
  "objective-c": "source.objc",
  php: "text.html.php",
  py: "source.python",
  python: "source.python",
  rb: "source.ruby",
  ruby: "source.ruby",
  rust: "source.rust",
  text: "text.plain",
  toml: "source.toml",
  ts: "source.ts",
  typescript: "source.ts",
  xml: "text.xml",
  yaml: "source.yaml",
  yml: "source.yaml",
}

export function scopeForFenceName(fenceName: string): string {
  fenceName = fenceName.toLowerCase()
  let result = `source.${fenceName}`
  if (scopesByFenceName[fenceName] != null) {
    result = scopesByFenceName[fenceName]
  }
  return result
}

export function fenceNameForScope(scope: string): string {
  scope = scope.toLowerCase()
  let result = Object.keys(scopesByFenceName).filter((s) => s == scope)
  let resultOut: string
  if (result.length) {
    resultOut = result[0]
  } else {
    resultOut = scope.substr(scope.lastIndexOf(".") + 1)
  }
  return resultOut
}
