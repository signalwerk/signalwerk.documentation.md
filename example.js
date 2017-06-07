import fs from 'fs';
import SignalwerkDocMd from './index';


const md = `

::: TOC
**Content**
[[TOC]]
:::

!!!include(include.md)!!!

::: containerClass
this is in a div with class containerClass
:::

[Hello](test.html)

# Heading 1 { .custom-classname }
## Heading 2 – A
## Heading 2 – B

hello world[^1]
[^1]: Here is the footnote text.

*[HTML]: Hyper Text Markup Language
new text here HTML

Term 1
:   Definition 1

`;

const html = new SignalwerkDocMd({ rootPath: './test' }).render(md);
fs.writeFileSync('./index.html', html);
