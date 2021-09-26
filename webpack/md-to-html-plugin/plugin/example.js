function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// https://rosettacode.org/wiki/Tokenize_a_string_with_escaping#JavaScript
// tokenize :: String -> Character -> Character -> [String]
const tokenize = (charDelim, charEsc, str) => {
  const [token, list, _] = str.split("").reduce(
    ([aToken, aList, aEsc], x) => {
      const blnBreak = !aEsc && x === charDelim,
        blnEscChar = !aEsc && x === charEsc;

      return [
        blnBreak ? "" : aToken + (blnEscChar ? "" : x),
        aList.concat(blnBreak ? aToken : []),
        blnEscChar,
      ];
    },
    ["", [], false]
  );

  return list.concat(token);
};

function example({ Handlebars }, text, options) {
  let markers = tokenize(",", "\\", options.hash.marker).map((item) =>
    item.split("=").map((item) => item.trim())
  );

  if (!markers.length) {
    return `### ${text}`;
  }

  var title = text;
  var code = `<code>${escapeHtml(text)}</code>`;
  markers.forEach((item, i) => {
    var search = new RegExp(escapeRegExp(item[0]), "g");

    title = title
      .replace(
        search,
        `<span class="mark mark--${i} mark--${item[2] || "normal"}">${
          item[1]
        }</span>`
      )
      .replace("\\n", `<br />`);
    code = code
      .replace("\\n", "")
      .replace(`<code>${item[0]}</code>`, item[0])
      .replace(
        search,
        `</code><code class="mark mark--${i} mark--${
          item[2] || "normal"
        }">&ZeroWidthSpace;${Handlebars.escapeExpression(item[1])}</code><code>`
      );
  });

  let escapedOutput = `
### ${title}

${code}
`;

  return new Handlebars.SafeString(escapedOutput);
}

const helpers = [{ name: "example", hanlder: example }];

exports.helpers = helpers;
