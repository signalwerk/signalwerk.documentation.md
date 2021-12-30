import { safe } from "escape-html-template-tag";

export function attr(obj) {
  const attr = [
    ...Object.entries(obj || {}).map(([key, value]) => {
      if (value) {
        return `${key}="${value.replace(/"/g, "&quot;")}"`;
      }
      return null;
    }),
  ]
    .filter((item) => !!item)
    .join(" ");

  return safe(attr);
}
