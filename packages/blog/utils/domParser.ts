import { marked } from 'marked';
import hljs from 'highlightjs';
import { JSDOM } from 'jsdom';
import { AnchorListItem } from '@1k-cove/common';

export class DomParser {
  md: string;
  constructor(md: string) {
    this.md = md;
  }
  parse() {
    // encode heading element's id value
    let renderer = new marked.Renderer();
    renderer.heading = function (text, level, raw) {
      return `<h${level} id="${encodeURIComponent(
        text
      )}">${text}</h${level}>\n`;
    };

    const html = marked(this.md, { renderer: renderer });
    marked.setOptions({
      highlight: function (code, lang) {
        return hljs.highlightAuto(code, [lang]).value;
      },
    });
    // extract headings from html
    const jsdom = new JSDOM(html);

    const headingNames = ['H2', 'H3'];
    const dom = jsdom.window.document;

    const treeWalker = dom.createTreeWalker(dom, 1, function (node) {
      if (headingNames.includes(node.nodeName)) {
        return 1;
      } else {
        return 3;
      }
    });
    let current: HTMLElement;
    const headings: AnchorListItem[] = [];

    // extract headings and attach id to heading element
    while ((current = treeWalker.nextNode() as HTMLElement)) {
      if (current.nodeName === 'H2') {
        headings.push({
          to: `#${encodeURIComponent(current.textContent ?? '')}`,
          text: current.textContent ?? '',
          children: [],
        });
      } else if (current.nodeName === 'H3') {
        const last = headings.at(headings.length - 1);
        if (!last) continue;
        last.children.push({
          to: `#${encodeURIComponent(current.textContent ?? '')}`,
          text: current.textContent ?? '',
          children: [],
        });
      }
    }

    return { html, headings };
  }
}
