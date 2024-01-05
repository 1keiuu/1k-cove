import { Post } from '@1k-cove/common';
import { useEffect, useRef } from 'react';
import styles from './BlogContent.module.css';
import 'highlightjs/styles/github.css';
type BlogContentProps = {
  post: Post;
  html: string;
};

const BlogContent: React.FC<BlogContentProps> = (props) => {
  const articleRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!articleRef.current) return;
    articleRef.current.innerHTML = props.html;
  }, [props.html]);
  return <article ref={articleRef} className={styles.content}></article>;
};

export default BlogContent;
