import { useEffect, useRef } from 'react';
import { LinkCard } from '@1k-cove/common';
import './editor.css';

type EditorProps = {
  defaultContent: string;
  onContentChange: (text: string) => void;
};

type InsertImageEvent = CustomEvent<{ url: string }>;
type InsertLinkCardEvent = CustomEvent<LinkCard>;

const Editor: React.FC<EditorProps> = (props) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const handleContentChange:
    | React.ChangeEventHandler<HTMLTextAreaElement>
    | undefined = (e) => {
    const target = e.target as HTMLTextAreaElement;
    if (!target) return;
    props.onContentChange(target.value);
  };

  const handleInsertImage = (e: InsertImageEvent) => {
    const target = textAreaRef.current;
    if (!target) return;
    const url = e.detail.url;
    const anchor = document.createElement('a');
    anchor.target = '_blank';
    anchor.rel = 'noopener';
    anchor.href = url;
    const img = document.createElement('img');
    img.src = url;
    img.style.width = '100%';
    img.style.height = '100%';
    anchor.appendChild(img);
    const beforeInsertTarget = target.value.slice(0, target.selectionStart);
    const afterInsertTarget = target.value.slice(target.selectionStart);
    const DOM = `${beforeInsertTarget}${`\r\n<br/>\r\n${anchor.outerHTML}\r\n<br/>\r\n`}${afterInsertTarget}`;
    target.value = DOM;
    props.onContentChange(DOM);
  };

  const handleInsertLinkCard = (e: InsertLinkCardEvent) => {
    const target = textAreaRef.current;
    if (!target) return;
    // anchor
    const anchor = document.createElement('a');
    const src = e.detail.src;
    anchor.target = '_blank';
    anchor.rel = 'noopener';
    anchor.href = src;
    anchor.className = 'link-card';

    // inner
    const inner = document.createElement('span');
    inner.className = 'link-card__inner';

    // img
    const img = document.createElement('img');
    const imgSrc = e.detail.imgSrc;
    img.src = imgSrc;
    img.className = 'link-card__image';

    // title
    const span1 = document.createElement('span');
    const title = document.createTextNode(e.detail.title || e.detail.src);
    span1.appendChild(title);
    span1.className = 'link-card__title';

    // description
    const span2 = document.createElement('span');
    const description = document.createTextNode(e.detail.description ?? '');
    span2.appendChild(description);
    span2.className = 'link-card__description';

    inner.appendChild(span1);
    inner.appendChild(span2);

    anchor.appendChild(img);
    anchor.appendChild(inner);
    const beforeInsertTarget = target.value.slice(0, target.selectionStart);
    const afterInsertTarget = target.value.slice(target.selectionStart);
    const DOM = `${beforeInsertTarget}${`\r\n<br/>\r\n${anchor.outerHTML}\r\n<br/>\r\n`}${afterInsertTarget}`;
    target.value = DOM;
    props.onContentChange(DOM);
  };

  useEffect(() => {
    window.addEventListener(
      'insertImage',
      handleInsertImage as EventListenerOrEventListenerObject
    );
    window.addEventListener(
      'insertLinkCard',
      handleInsertLinkCard as EventListenerOrEventListenerObject
    );
    return () => {
      window.removeEventListener(
        'insertImage',
        handleInsertImage as EventListenerOrEventListenerObject
      );
      window.removeEventListener(
        'insertLinkCard',
        handleInsertLinkCard as EventListenerOrEventListenerObject
      );
    };
  }, []);

  useEffect(() => {
    const target = textAreaRef.current;
    if (!target) return;
    target.value = props.defaultContent;
  }, []);

  return (
    <>
      <textarea
        className="editor"
        onChange={handleContentChange}
        ref={textAreaRef}
      ></textarea>
    </>
  );
};

export default Editor;
