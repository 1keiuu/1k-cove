import { useEffect, useRef } from 'react';
import styles from './Preview.module.css';
import 'highlightjs/styles/github.css';

type PreviewProps = {
  html: string;
};

const Preview: React.FC<PreviewProps> = (props) => {
  const articleRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!articleRef.current) return;
    articleRef.current.innerHTML = props.html;
  }, [props.html]);
  return <article ref={articleRef} className={styles.preview}></article>;
};

export default Preview;
