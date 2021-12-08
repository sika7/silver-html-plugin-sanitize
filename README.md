[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# @sika7/silver-html-plugin-sanitize

this package is silver-html plugin

## Usage

**Step 1:** Install plugin:

```sh
npm install --save @sika7/silver-html
npm install --save @sika7/silver-html-plugin-sanitize
```

**Step 2:** add a functions or plugin.

```javascript
import { silverHtml } from '@sika7/silver-html'
import { silverHtmlSanitize } from "@sika7/silver-html-plugin-sanitize";

const result = silverHtml("<div><p>test</p><div>test</div></div>", {}, [
silverHtmlSanitize({
  allowTags: [
    {
      tag: "div",
      allowAttrs: ["class", "style"],
      allowStyle: ["color"],
    },
  ],
})]);
console.log(result)
// # <div><div>test</div></div>
```

## config

```javascript
const plugin = {
  allowTags: [
    {
      tag: "div", // require
      allowAttrs: ["class", "style"], // options
      allowStyle: ["color"],          // options
    },
  ]
}
```

| setting    | description                                | example                | 
| ---------- | ------------------------------------------ | ---------------------- | 
| tag        | allow tag name.                            | div                    | 
| allowAttrs | allow attributes.                          | ['class','style']      | 
| allowStyle | allow styles. require style in allowAttrs. | ['color','text-align'] | 

