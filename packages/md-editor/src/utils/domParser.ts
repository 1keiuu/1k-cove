import { marked } from 'marked';
import hljs from 'highlightjs';

export default class DomParser {
  parse(md: string) {
    // encode heading element's id value
    let renderer = new marked.Renderer();
    renderer.heading = function (text, level, raw) {
      return `<h${level} id="${encodeURIComponent(
        text
      )}">${text}</h${level}>\n`;
    };

    let html = marked(md, { renderer: renderer });
    marked.setOptions({
      highlight: function (code, lang) {
        return hljs.highlightAuto(code, [lang]).value;
      },
    });

    return html;
  }
}
