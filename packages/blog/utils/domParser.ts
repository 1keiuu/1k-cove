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
    renderer.paragraph = function (this, text) {
      return '';
    };
    renderer.heading = function (text, level, raw) {
      return `<h${level} id="${encodeURIComponent(
        text
      )}">${text}</h${level}>\n`;
    };

    let html = marked(this.md, { renderer: renderer });
    marked.setOptions({
      highlight: function (code, lang) {
        return hljs.highlightAuto(code, [lang]).value;
      },
    });
    // extract headings from html
    const jsdom = new JSDOM(html);

    const allowNodeNameList = ['H2', 'H3', 'OGP-CARD'];
    const dom = jsdom.window.document;

    const treeWalker = dom.createTreeWalker(dom, 1, function (node) {
      if (allowNodeNameList.includes(node.nodeName)) {
        return 1;
      } else {
        return 3;
      }
    });
    let current: HTMLElement;
    const headings: AnchorListItem[] = [];
    const ogps = [];

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
      } else if (current.nodeName === 'OGP-CARD') {
        console.log(current.getAttribute('src'));
        const src = current.getAttribute('src');
        const title = 'title';
        if (!src) {
          throw new Error('ogp src could not found.');
        }
        if (!title) {
          throw new Error('ogp title could not found.');
        }
        ogps.push({
          rawHTML: current.outerHTML.replaceAll(`"`, `'`),
          newHTML: generateOgpHTML(src, title),
        });
      }
    }

    ogps.forEach((ogp) => {
      html = html.replace(ogp.rawHTML, ogp.newHTML);
    });

    return { html, headings };
  }
}

/**
 * - FIXME: pタグの配下に以下のDOMを入れることになるため、divやpタグを使えない
 * - ex) <a><div>test</div></a>をrenderingするとDOM構造がおかしくなる
 * */
const generateOgpHTML = (src: string, title: string) => {
  const imgSrc = 'https://via.placeholder.com/150';
  return `<a href="${src}" target="_blank" rel="noopener noreferrer" class="ogp-card__link">
    <span class="ogp-card">
      <img src="${imgSrc}"/ class="ogp-card__image"> 
      ${title}
    </span>
  </a>`;
};
