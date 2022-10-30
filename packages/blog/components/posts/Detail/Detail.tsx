import { Post } from '@1k-cove/common';
import { marked } from 'marked';
import { useEffect, useRef } from 'react';
import styles from './Detail.module.css';
import hljs from 'highlightjs';
import 'highlightjs/styles/github.css';

type DetailProps = {
  post: Post;
};

const Detail: React.FC<DetailProps> = (props) => {
  const divRef = useRef<HTMLDivElement>(null);
  const html = marked(props.post.content);
  marked.setOptions({
    highlight: function (code, lang) {
      return hljs.highlightAuto(code, [lang]).value;
    },
  });
  useEffect(() => {
    if (!divRef.current) return;
    divRef.current.innerHTML = html;
  }, []);
  return <div ref={divRef} className={styles.detail}></div>;
};

export default Detail;
