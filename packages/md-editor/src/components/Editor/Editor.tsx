import { useEffect, useRef } from 'react';
import { LinkCard } from '../../../../admin/@types/post';
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
    console.log(e.detail);
    const src = e.detail.src;
    anchor.target = '_blank';
    anchor.rel = 'noopener';
    anchor.href = src;
    // inner
    const inner = document.createElement('span');

    // img
    const img = document.createElement('img');
    const imgSrc = e.detail.imgSrc;
    img.src = imgSrc;
    img.style.width = '100%';
    img.style.height = '100%';

    // text
    const title = e.detail.title;
    const text = document.createTextNode(title);

    inner.appendChild(img);
    inner.appendChild(text);

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
