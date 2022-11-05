import { Post } from '@1k-cove/common';
import { useEffect, useRef } from 'react';
import styles from './Content.module.css';
import 'highlightjs/styles/github.css';

type ContentProps = {
  post: Post;
  html: string;
};

const Content: React.FC<ContentProps> = (props) => {
  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!divRef.current) return;
    divRef.current.innerHTML = props.html;
  }, [props.html]);
  return <div ref={divRef} className={styles.content}></div>;
};

export default Content;
