## Introduction
This is basically a wrapper for markdown-it and many extensions.

## Installation
```shell
npm install signalwerk.documentation.md --save
```

## Use
```js
import SignalwerkDocMd from 'signalwerk.documentation.md';

const md = `
# Heading 1
## Heading 2

Hello World!
`;
const html = new SignalwerkDocMd().render(md);
console.log(html);
fs.writeFileSync('./index.html', html);
```
