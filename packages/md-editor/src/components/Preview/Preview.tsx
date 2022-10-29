import { useEffect, useRef } from 'react';
import './preview.css';
import { marked } from 'marked';

type PreviewProps = {
  content: string;
};

const Preview: React.FC<PreviewProps> = (props) => {
  const previewRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!previewRef.current) return;
    previewRef.current.innerHTML = marked(props.content, {
      gfm: true,
      breaks: true,
    });
  }, [props.content]);
  return <div className="preview" ref={previewRef}></div>;
};

export default Preview;
