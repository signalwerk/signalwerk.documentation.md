---
title: Main Title
subline: Subline and short introduction
info: Stefan Huber · September 21, 2025 · additional information
debug: false
template: "document"
---

## Text with link

This is a link: [link](https://github.com/keeweb/keeweb/wiki/Plugins)↗ in text

---

## Numbered List

1. Item 1
   1. Item 1
   2. Item 2
   3. Item 3
2. Item 2
3. Item 3

## Unordered List

- Item 1
  - Item 1.1
  - Item 1.2
  - Item 1.3
- Item 2
- Item 3

## Code highlighting

### Inline

Inline `code`

### Block

```css
@font-face {
  font-family: "Open Sans";
  src: url("opensans-reg-web.woff2") format("woff2"), /* Modern Browsers */
      url("opensans-reg-web.woff") format("woff");
  font-weight: normal;
  font-style: normal;
  unicode-range: U+000-5FF; /* Latin glyphs */
}

@font-face {
  font-family: "Open Sans";
  src: url("special-web.woff2") format("woff2"), /* Modern Browsers */
      url("special-web.woff") format("woff");
  font-weight: normal;
  font-style: normal;
  unicode-range: U+0061; /* overwrite for letter a */
}

p {
  font-family: "Open Sans", Arial, Helvetica, sans-serif;
}
```

## Quote

> Standing on the soulders of giants.

# H1

## H2

### H3

Test

| Numbers | Text                     | Findet          | Erklärung                                                                                                                                                               |
| ------- | ------------------------ | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1111111 | Hallo.                   | a               | Das `a` ist ein Zeichen ohne spezieller Funktion und wird somit auch im Text gefunden                                                                                   |
| 9999999 | Hallo.                   | a               | Zeichen können auch als Unicode-Wert angegeben werden (`U+0060` = `a`)                                                                                                  |
| 1111111 | Ja.                      | J, a, .         | Der Punkt dient als Platzhalter für alle Zeichen. Somit werden alle Zeichen gefunden.                                                                                   |
| 1111111 | Rauch<br/>Bauch<br/>auch | Rauch<br/>Bauch | Das Platzhalter Zeichen (`.`) findet sowohl ein `R`, wie auch ein `B`. Das Wort `auch` wird jedoch nicht gefunden, da das Platzhalterzeichen nicht gefüllt werden kann. |
| 1111111 | Hallo.                   | .               | Möchte man lediglich einen Punkt suchen, so wird dieser als `\.` gesucht.                                                                                               |
| 1111111 | \o/                      | \               | Back-Slash wird mit `\\` gefunden.                                                                                                                                      |

## custom styling inside markdown

<style>
.test {
  background-color: green;
}
.test span {
  color: red;
}
</style>

<div class="test">

## green <span>title</span>

</div>

## Grid

### 12 columns

<grid columns="12">

<item>

1 column

</item>

<item>

1 column

</item>

<item>

1 column

</item>

<item>

1 column

</item>

<item span="4">

four columns with image

![Test](https://i.picsum.photos/id/1061/1600/800.jpg?hmac=MgVXam7p1UDLMq6oZ6kEaIwNoX6FtBEhmDpUJP_RNRU)

</item>

<item span="4">

four columns with image

![Test](https://i.picsum.photos/id/1061/1600/800.jpg?hmac=MgVXam7p1UDLMq6oZ6kEaIwNoX6FtBEhmDpUJP_RNRU)

</item>

</grid>

### 2 columns

<grid columns="2">
<item>

1 column

</item>
<item>

1 column

</item>
</grid>
