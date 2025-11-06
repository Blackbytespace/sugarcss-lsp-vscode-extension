# SugarCSS LSP VSCode Extension

This repostory contains the SugarCSS VSCode extension to support the language feature like completion, hover documentation, etc...

- [SugarCSS LSP VSCode Extension](#sugarcss-lsp-vscode-extension)
  - [Features](#features)
  - [Install](#install)
  - [Avoid `unknown AtRule` error](#avoid-unknown-atrule-error)

## Features

1. Support autocompletion for:
   - `AtRules` like `@s-typo`, `@s-container`, etc...
   - `Functions` like `s-color`, `s-space`, etc...
2. Support hover documentation for:
   - `AtRules` like `@s-typo`, `@s-container`, etc...
   - `Functions` like `s-color`, `s-space`, etc...

## Install

You can find the extension on the vscode marketplace

**[INSTALL the extension](https://marketplace.visualstudio.com/items?itemName=Blackbyte.SugarCSSLSPServer)**

## Avoid `unknown AtRule` error

By default, `css` does not support custom atRules. This has as an effect to trigger linting error on SugarCSS specific atRules.

To avoid that, and while we search for a proper fix, you can make this in your project:

Simple create a `.vscode/settings.json` file and add this to it:

```json
{
  "css.lint.unknownAtRules": "ignore"
}
```
