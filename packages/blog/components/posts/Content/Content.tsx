import { Post } from '@1k-cove/common';
import { useEffect, useRef } from 'react';
import styles from './Content.module.css';
import 'highlightjs/styles/github.css';

type ContentProps = {
  post: Post;
  html: string;
};

const Content: React.FC<ContentProps> = (props) => {
  const articleRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!articleRef.current) return;
    articleRef.current.innerHTML = props.html;
  }, [props.html]);
  return <article ref={articleRef} className={styles.content}></article>;
};

export default Content;
