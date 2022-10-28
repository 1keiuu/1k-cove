import { useEffect, useRef } from 'react';
import '../style/editor.css';

type EditorProps = {
  defaultContent: string;
  onContentChange: (text: string) => void;
};

const Editor: React.FC<EditorProps> = (props) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const handleContentChange:
    | React.ChangeEventHandler<HTMLTextAreaElement>
    | undefined = (e) => {
    const target = e.target as HTMLTextAreaElement;
    if (!target) return;
    props.onContentChange(target.value);
  };

  const handleInsertContent:
    | React.MouseEventHandler<HTMLButtonElement>
    | undefined = () => {
    const target = textAreaRef.current;
    if (!target) return;

    const img = document.createElement('img');
    img.src = 'https://avatars.githubusercontent.com/u/46051957?v=4';
    const beforeInsertTarget = target.value.slice(0, target.selectionStart);
    const afterInsertTarget = target.value.slice(target.selectionStart);
    const DOM = `${beforeInsertTarget}${`<br/>${img.outerHTML}<br/>`}${afterInsertTarget}`;
    target.value = DOM;
    props.onContentChange(DOM);
  };

  useEffect(() => {
    window.addEventListener('insertContent' as any, handleInsertContent);
    return () => {
      return window.removeEventListener(
        'insertContent' as any,
        handleInsertContent
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
