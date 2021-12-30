import { City } from "../City/index.js";
import { Post } from "../Post/index.js";
import { ASCII } from "../ASCII/index.js";
import { Portfolio } from "../Portfolio/index.js";
import { Page } from "../Page/index.js";
import { Text } from "../Text/index.js";
import { Grid } from "../Grid/index.js";
import { Heading } from "../Heading/index.js";
import { Col } from "../Col/index.js";
import { Img } from "../Img/index.js";
import { Line } from "../Line/index.js";
import { html } from "../../util/html.js";

export function Types(data, route) {
  switch (data.type) {
    case "city": {
      return City({
        title: data.title,
      });

      break;
    }
    case "ascii": {
      return ASCII({
        title: data.title,
      });

      break;
    }
    case "line": {
      return Line;

      break;
    }
    case "portfolio": {
      return Portfolio({
        title: data.title,
        text: data.text,
        img: data.img,
        nav: data.nav,
        route,
      });

      break;
    }
    case "post": {
      return Post({
        title: data.title,
        city: data.city,
        date: data.date,
        author: data.author,
        content: data.content,
      });

      break;
    }
    case "page": {
      return html`<div class="page">
        ${data.content.map((item) => Types(item, route))}
      </div>`;

      break;
    }
    case "headings": {
      return Heading({
        level: data.level,
        text: data.text,
      });

      break;
    }
    case "text": {
      return Text({
        markdown: data.markdown,
      });

      break;
    }
    case "grid": {
      return Grid({
        cols: data.cols,
      });

      break;
    }
    case "col": {
      return Col({
        content: data.content,
      });

      break;
    }
    case "img": {
      return Img({
        className: data.className,
        src: data.src,
      });

      break;
    }

    default:
      // code block
      return `!!! ERROR: ${data.type}`;
  }
}
