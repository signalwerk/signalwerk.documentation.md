# signalwerk.documentation.md

A small publishing tool to get quickly and easy from an .md to .html file.

## Installation

```bash
mkdir ./packages/
mkdir ./static/
git submodule add git@github.com:signalwerk/signalwerk.documentation.md.git ./packages/signalwerk.documentation.md
node ./packages/signalwerk.documentation.md/cli.mjs setup webtypo
npm install
```

### Update build based on config.json

```bash
node ./packages/signalwerk.documentation.md/cli.mjs update
```


### Individual CSS
If `./src/main.css` exists, it will be included in the HTML.

```css
/* FILE ./src/main.css */


@import "signalwerk.documentation.md/main.css"; /* default styles */

/* your style here */
```