# [2.1.0](https://github.com/atom-ide-community/atom-ide-markdown-service/compare/v2.0.0...v2.1.0) (2021-03-18)


### Bug Fixes

* refactor EventLoopYielder ([89a5933](https://github.com/atom-ide-community/atom-ide-markdown-service/commit/89a5933447f9cb37de3a3c143d54f0c8eaf2e9df))
* scopesByFenceName type ([80749db](https://github.com/atom-ide-community/atom-ide-markdown-service/commit/80749db7047401cbd60a25e9fae76038b2987f57))


### Features

* pass optional configuration to purifier ([f4e064a](https://github.com/atom-ide-community/atom-ide-markdown-service/commit/f4e064abe236e36e0c1c0fa94d45466d6267b580))
* use more robust tree-sitter highlighter variation ([fc6b190](https://github.com/atom-ide-community/atom-ide-markdown-service/commit/fc6b19022493414c72261cdcdde5326d5192e632))

# [2.0.0](https://github.com/atom-ide-community/atom-ide-markdown-service/compare/v1.6.0...v2.0.0) (2021-02-04)


### Bug Fixes

* add tsc.es modules ([7cbae41](https://github.com/atom-ide-community/atom-ide-markdown-service/commit/7cbae414aa0c01efb74bdeedeab900caff48f93c))
* lint ([8467b44](https://github.com/atom-ide-community/atom-ide-markdown-service/commit/8467b44b4ed3b8802385702ccca07b166942fe90))
* update dependencies ([da9da4d](https://github.com/atom-ide-community/atom-ide-markdown-service/commit/da9da4dc4e74d54263a7867478e72aefce94ae01))


### Features

* include utils functions in the package ([3d1999f](https://github.com/atom-ide-community/atom-ide-markdown-service/commit/3d1999f7637d7b4ae7f1467b110f92562ba0355f))


### Performance Improvements

* build modules in separate folders ([a7e069f](https://github.com/atom-ide-community/atom-ide-markdown-service/commit/a7e069fa93fd37c6c8300436a68a09661e9f2537))


### BREAKING CHANGES

* output files paths (see readme)

# [1.6.0](https://github.com/atom-ide-community/atom-ide-markdown-service/compare/v1.5.1...v1.6.0) (2020-10-12)


### Bug Fixes

* don't create unncessary elements ([9341d16](https://github.com/atom-ide-community/atom-ide-markdown-service/commit/9341d1671e20eac3e05bd802684cd5185f07e6c1))
* pass scopeName directly to highlight function ([42e50e9](https://github.com/atom-ide-community/atom-ide-markdown-service/commit/42e50e9b1b43568f7c7d57ec823660e1f38c5167))
* remove unncessary TextEditorElement style setting ([fe6c88b](https://github.com/atom-ide-community/atom-ide-markdown-service/commit/fe6c88bed20d63ae3fe897ee5aabd2a7024f497e))
* sanitize in our code ([3c0f470](https://github.com/atom-ide-community/atom-ide-markdown-service/commit/3c0f47087974f72c00f14d21e04be3348e0925e7)), closes [/github.com/atom-ide-community/atom-ide-markdown-service/pull/35/files#r503025236](https://github.com//github.com/atom-ide-community/atom-ide-markdown-service/pull/35/files/issues/r503025236)
* use Array.from instead of slice.call to convert querySelectorAll output to Array ([0527bc6](https://github.com/atom-ide-community/atom-ide-markdown-service/commit/0527bc6d53a6702696d7e67fe6d762a5c7ea2ba0))
* use callbacks to assing the marked output ([6c1cd2f](https://github.com/atom-ide-community/atom-ide-markdown-service/commit/6c1cd2fbfc9e73ffc96a15423939fc50c6986f3d))
* use setOptions to set marked options ([e07d322](https://github.com/atom-ide-community/atom-ide-markdown-service/commit/e07d322cad48c053071e47378ba1692bf8fb7a5e))


### Features

* highlight function ([87aa6e1](https://github.com/atom-ide-community/atom-ide-markdown-service/commit/87aa6e1186ccae0c0bc9027f2373dc44897ca4f9))
* seprate done function from editorTokenized ([6896dee](https://github.com/atom-ide-community/atom-ide-markdown-service/commit/6896deea38e1a7b2b6265d9f4592c624219ffcf6))

## [1.5.1](https://github.com/atom-ide-community/atom-ide-markdown-service/compare/v1.5.0...v1.5.1) (2020-10-11)


### Bug Fixes

* use firstElementChild instead of firstChild ([a135943](https://github.com/atom-ide-community/atom-ide-markdown-service/commit/a135943a7556beec9dfb00b1cd92bf80c445f412))

# [1.5.0](https://github.com/atom-ide-community/atom-ide-markdown-service/compare/v1.4.1...v1.5.0) (2020-10-09)


### Features

* add cjs module build ([6f4e360](https://github.com/atom-ide-community/atom-ide-markdown-service/commit/6f4e360614e283698b4e7a3fa2d13370a3d87c41))

## [1.4.1](https://github.com/atom-ide-community/atom-ide-markdown-service/compare/v1.4.0...v1.4.1) (2020-10-08)


### Bug Fixes

* files to be included in the pack ([8153c23](https://github.com/atom-ide-community/atom-ide-markdown-service/commit/8153c23867de5c726a88ed455f22dd56bfafcc3a))

# [1.4.0](https://github.com/atom-ide-community/atom-ide-markdown-service/compare/v1.3.4...v1.4.0) (2020-10-08)


### Bug Fixes

* fix renderer in the readme ([8077adb](https://github.com/atom-ide-community/atom-ide-markdown-service/commit/8077adbbcd00ba25aaaaf1cfb723f9400015ef9d))
* getNextUpdatePromise type for text editor ([cdc677d](https://github.com/atom-ide-community/atom-ide-markdown-service/commit/cdc677d5e5076c1b75095af1eae353b22e2e3e01))
* HTMLPreElement type ([8d6deab](https://github.com/atom-ide-community/atom-ide-markdown-service/commit/8d6deabd15150df770ca939f41e89dce663862f8))
* optional chaining for setting innerHTML of line2 ([4fa1e1a](https://github.com/atom-ide-community/atom-ide-markdown-service/commit/4fa1e1a3636a50572d5d54f35d7164a32246d0a1))
* use in instead of checking the value directly ([d48303b](https://github.com/atom-ide-community/atom-ide-markdown-service/commit/d48303b49e9a14cd387d7089871bdce316a9ad59))


### Features

* add es modules bundle ([b001cad](https://github.com/atom-ide-community/atom-ide-markdown-service/commit/b001cadf70ef107834421fc9c4241e9d0aa21c7c))
* add LanguageMode and TextBuffer types ([f6bbb42](https://github.com/atom-ide-community/atom-ide-markdown-service/commit/f6bbb42f822adcfdbc79709b315c12b39b1823ce))
* add TextMateLanguageMode types ([f7c1cd5](https://github.com/atom-ide-community/atom-ide-markdown-service/commit/f7c1cd50bf77b6b66cef7189e39114e056feaa82))
* fix types for renderer.ts ([b91633a](https://github.com/atom-ide-community/atom-ide-markdown-service/commit/b91633a6ec871d0412f4354438e0249199c1e6b4))
* onDidTokenize type ([043c406](https://github.com/atom-ide-community/atom-ide-markdown-service/commit/043c40665c30284fa7b9c7b3a2ee70772450216c))
* rename to typescript ([ac3cd38](https://github.com/atom-ide-community/atom-ide-markdown-service/commit/ac3cd38118814c3644cc6cac7576b87417d6d233))
* set grammar using its buffer ([411748a](https://github.com/atom-ide-community/atom-ide-markdown-service/commit/411748addc1b5e00b5d70af5c789aadc2a497ec1))
* use typescript ([bcf9d64](https://github.com/atom-ide-community/atom-ide-markdown-service/commit/bcf9d64e9bf157dd5c368d4811aab16743758e40))

## [1.3.4](https://github.com/atom-ide-community/atom-ide-markdown-service/compare/v1.3.3...v1.3.4) (2020-10-08)


### Bug Fixes

* bump ([7cc480f](https://github.com/atom-ide-community/atom-ide-markdown-service/commit/7cc480f663cd5aabdb99dd618fe50a687a71bec4))

## [1.3.3](https://github.com/atom-ide-community/atom-ide-markdown-service/compare/v1.3.2...v1.3.3) (2020-09-23)


### Bug Fixes

* bump ([e6f45bd](https://github.com/atom-ide-community/atom-ide-markdown-service/commit/e6f45bdd9a62ee7994c7f45aae6ad3585932f77f))
* remove workaround for escaping doctype ([c8936b8](https://github.com/atom-ide-community/atom-ide-markdown-service/commit/c8936b8da103ab7563d2e8b4f20c15599ceb7ca3)), closes [/github.com/markedjs/marked/issues/354#issuecomment-697489034](https://github.com//github.com/markedjs/marked/issues/354/issues/issuecomment-697489034)

## [1.3.2](https://github.com/atom-ide-community/atom-ide-markdown-service/compare/v1.3.1...v1.3.2) (2020-08-12)


### Bug Fixes

* bump ([3ffb1d1](https://github.com/atom-ide-community/atom-ide-markdown-service/commit/3ffb1d1441ab802b99f8e84ab2a7a54aa3a9781d))

## [1.3.1](https://github.com/atom-ide-community/atom-ide-markdown-service/compare/v1.3.0...v1.3.1) (2020-07-21)

### Bug Fixes

- fix the service by returning {render} object ([afe0712](https://github.com/atom-ide-community/atom-ide-markdown-service/commit/afe071223137ba50e3d3b0db3e20602955c018db))

# [1.3.0](https://github.com/atom-ide-community/atom-ide-markdown-service/compare/v1.2.4...v1.3.0) (2020-07-17)

### Bug Fixes

- enable build-commit ([f65d80d](https://github.com/atom-ide-community/atom-ide-markdown-service/commit/f65d80d48edbafe0f31202cf8335cd3a2fae2dc7))
- npm run format ([0302f71](https://github.com/atom-ide-community/atom-ide-markdown-service/commit/0302f71f63a332a1bc1760229bb8e8e18ca25058))
- renderer use optional chaining ([174d012](https://github.com/atom-ide-community/atom-ide-markdown-service/commit/174d012701a9b40a3afb01d6dedd13433a7a6273))
- use rolled up bundle ([83df123](https://github.com/atom-ide-community/atom-ide-markdown-service/commit/83df123db277bbabd8d669ba6a9e289b67c6f75c))
- utils ([a63eda2](https://github.com/atom-ide-community/atom-ide-markdown-service/commit/a63eda2646d66f90a23ef5ca3ac9abf16d55e41d))

### Features

- Merge pull request [#29](https://github.com/atom-ide-community/atom-ide-markdown-service/issues/29) from atom-ide-community/atomic-packages ([21683a3](https://github.com/atom-ide-community/atom-ide-markdown-service/commit/21683a3c805b1aaef4f563b647024e1a0d984c0a))

## [1.2.4](https://github.com/atom-ide-community/atom-ide-markdown-service/compare/v1.2.3...v1.2.4) (2020-04-13)

### Bug Fixes

- activation hook to improve the loading time by deferring it ([85172b7](https://github.com/atom-ide-community/atom-ide-markdown-service/commit/85172b7))

## [1.2.3](https://github.com/atom-ide-community/atom-ide-markdown-service/compare/v1.2.2...v1.2.3) (2019-06-24)

### Bug Fixes

- upgrade additional build packages ([42e995c](https://github.com/atom-ide-community/atom-ide-markdown-service/commit/42e995c))

## [1.2.2](https://github.com/atom-ide-community/atom-ide-markdown-service/compare/v1.2.1...v1.2.2) (2019-06-21)

### Bug Fixes

- grammar name handling ([0a9106b](https://github.com/atom-ide-community/atom-ide-markdown-service/commit/0a9106b))

## [1.2.1](https://github.com/atom-ide-community/atom-ide-markdown-service/compare/v1.2.0...v1.2.1) (2019-06-19)

### Bug Fixes

- upgrade packages ([ef5e4c1](https://github.com/atom-ide-community/atom-ide-markdown-service/commit/ef5e4c1))

# [1.2.0](https://github.com/atom-ide-community/atom-ide-markdown-service/compare/v1.1.2...v1.2.0) (2019-04-18)

### Features

- typing and documentation added ([4e7f229](https://github.com/atom-ide-community/atom-ide-markdown-service/commit/4e7f229))
- use async/await and default grammar if not set on code section ([d01b00e](https://github.com/atom-ide-community/atom-ide-markdown-service/commit/d01b00e))

## [1.1.2](https://github.com/atom-ide-community/atom-ide-markdown-service/compare/v1.1.1...v1.1.2) (2019-04-08)

### Bug Fixes

- line break at line 80 in code snippets ([859d265](https://github.com/atom-ide-community/atom-ide-markdown-service/commit/859d265))

## [1.1.1](https://github.com/atom-ide-community/atom-ide-markdown-service/compare/v1.1.0...v1.1.1) (2019-03-21)

### Bug Fixes

- error handling, removed obsolete token handling ([523576a](https://github.com/atom-ide-community/atom-ide-markdown-service/commit/523576a))

# [1.1.0](https://github.com/atom-ide-community/atom-ide-markdown-service/compare/v1.0.1...v1.1.0) (2019-03-18)

### Features

- add request token to align request with responses ([0788730](https://github.com/atom-ide-community/atom-ide-markdown-service/commit/0788730))

## [1.0.1](https://github.com/atom-ide-community/atom-ide-markdown-service/compare/v1.0.0...v1.0.1) (2019-03-18)

### Bug Fixes

- improve promise handling ([ab3d655](https://github.com/atom-ide-community/atom-ide-markdown-service/commit/ab3d655))

# 1.0.0 (2019-03-17)

### Features

- initial release ([f4635dc](https://github.com/atom-ide-community/atom-ide-markdown-service/commit/f4635dc))

## 0.1.0 - First Release

- Every feature added
- Every bug fixed
