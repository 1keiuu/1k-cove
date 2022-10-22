import { useEffect, useRef } from 'react';
import '../style/editor.css';

type EditorProps = {
  onContentChange: (text: string) => void;
};

const Editor: React.FC<EditorProps> = (props) => {
  const divRef = useRef<HTMLDivElement>(null);
  const handleContentChange = () => {
    if (!divRef.current || !divRef.current?.textContent) return;
    props.onContentChange(divRef.current.textContent);
  };
  useEffect(() => {
    divRef.current?.addEventListener('input', handleContentChange);
    return () => {
      divRef.current?.removeEventListener('input', handleContentChange);
    };
  }, []);
  return <div className="editor" contentEditable ref={divRef}></div>;
};

export default Editor;
