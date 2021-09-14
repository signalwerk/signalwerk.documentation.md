# signalwerk.documentation.md

A small publishing tool to get quickly and easy from an .md to .html file.

## Installation

```bash
mkdir ./packages/
git submodule add git@github.com:signalwerk/signalwerk.documentation.md.git ./packages/signalwerk.documentation.md

```



### Individual CSS
If `./src/main.css` exists, it will be included in the HTML.

```css
/* FILE ./src/main.css */


@import "signalwerk.documentation.md/main.css"; /* default styles */

/* your style here */
```