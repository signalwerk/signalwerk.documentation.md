# signalwerk.documentation.md

FONT!!!
prism !! https://gist.github.com/lightpohl/f7786afa86ff2901ef40b1b1febf14e0

A small publishing tool to get quickly and easy from an .md to .html file.

## Installation

```bash
mkdir ./packages/
mkdir ./static/
git submodule add git@github.com:signalwerk/signalwerk.documentation.md.git ./packages/signalwerk.documentation.md
node ./packages/signalwerk.documentation.md/cli.js setup webtypo
npm install
```

### Update build based on config.json

```bash
node ./packages/signalwerk.documentation.md/cli.js update
```

### Individual CSS

If `./src/main.css` exists, it will be included in the HTML.

```css
/* FILE ./src/main.css */

@import "signalwerk.documentation.md/main.css"; /* default styles */

/* your style here */
```

## Handlebars helpers

### Date

Under the hood [dateformat](https://www.npmjs.com/package/dateformat) is used.

```md
- Today: {{date}} → default format = `d. m. yyyy`, default value = `now`
- This year: {{date format='yyyy'}} → default value = `now`
- Selected date: {{date '1995-08-24' format='dd. mm. yyyy hh:mm:ss'}}
```

If you like to escape text in the format use `"{{text}}"`: 

```md
{{date '2021-09-18' format='yyyy · "KW" W'}} → 2021 · KW 37 
```

## Usage
* [IAD2021](https://iad2021.signalwerk.ch/)
* [Webtypo](https://webtypo.signalwerk.ch/)

## Todo
* [Switch Date-Format to `date-fns`](https://github.com/date-fns/date-fns)