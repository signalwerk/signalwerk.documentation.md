import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import path from 'path';

import MarkdownItAbbr from 'markdown-it-abbr';
import MarkdownItAttrs from 'markdown-it-attrs';
import MarkdownItAnchor from 'markdown-it-anchor';
import MarkdownItDeflist from 'markdown-it-deflist';
import MarkdownItFootnote from 'markdown-it-footnote';
import MarkdownItInclude from 'markdown-it-include';
import MarkdownItSub from 'markdown-it-sub';
import MarkdownItTOC from 'markdown-it-table-of-contents';
import MarkdownItContainer from 'markdown-it-container';

import MarkdownItReplaceLink from './src/replace-link';
import MarkdownItReplaceExternalLink from './src/replace-external-link';


class SignalwerkDocMd {

  constructor(config) {
    this.config = {};
    Object.assign(this.config,
      {
        html: true,  // Enable HTML tags in source
        linkify: false, // Autoconvert URL-like text to links
        typographer: true, // Enable some language-neutral replacement + quotes beautification
        highlight: this.highlight,  // the code highlighter
        rootPath: './pages/', // root for includes !!!include(include.md)!!!

        linkPrefix: './pages/', // prefix the links
      }, config,
    );
  }

  // the sourcecode highlighter
  static highlight(str, lang) {
    if ((lang !== null) && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (_error) {
        console.error(_error);
      }
    }
    try {
      return hljs.highlightAuto(str).value;
    } catch (_error) {
      console.error(_error);
    }
    return '';
  }

  // function to prefix the links
  prefixLink = (link) => {
    if (this.config.linkPrefix && path.isAbsolute(link)) {
      return this.config.linkPrefix + link;
    }
    return link;
  }

  render(inMarkdown) {
    const md = new MarkdownIt(this.config);

    md
    .use(MarkdownItSub) // 'H~2~0' to <p>H<sub>2</sub>O</p>
    .use(MarkdownItFootnote) // Here is a footnote reference [^1] \n\n [^1]: Here is the footnote.
    .use(MarkdownItDeflist) // Definition lists: http://pandoc.org/MANUAL.html#definition-lists
    .use(MarkdownItAbbr) // *[HTML]: Hyper Text Markup Language
    .use(MarkdownItAttrs) // add attributes with { .classname }
    .use(MarkdownItInclude, this.config.rootPath) // process !!!include(include.md)!!!
    .use(MarkdownItReplaceLink, this.prefixLink) // prfix the links
    .use(MarkdownItContainer, 'classname', { // add div surround lines with colons ':: containerClass\n in the div\n ::'
      validate: name => name.trim().length,
      render: (tokens, idx) => {
        if (tokens[idx].nesting === 1) {
          return `<div class="${tokens[idx].info.trim()}">\n`;
        }

        return '</div>\n';
      },
    })
    .use(MarkdownItAnchor, { // add anchors to titles
      level: [1, 2],
      // slugify: string => string,
      permalink: false,
      // renderPermalink: (slug, opts, state, permalink) => {},
      permalinkClass: 'header-anchor',
      permalinkSymbol: '¶',
      permalinkBefore: false,
    })
    .use(MarkdownItTOC, { // add TOC when [[TOC]] in markdown
      includeLevel: [2],
    })
    .use(MarkdownItReplaceExternalLink, {}); // all external http links with target _blank

    return md.render(inMarkdown);
  }
}
export default SignalwerkDocMd;
