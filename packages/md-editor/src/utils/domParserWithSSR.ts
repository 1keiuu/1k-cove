import { AnchorListItem } from '@1k-cove/common';
import DomParser from './domParser';
import { JSDOM } from 'jsdom';

export default class DomParserWithSSR extends DomParser {
  extractHeadings(html: string) {
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
      }
    }
    return headings;
  }
}
