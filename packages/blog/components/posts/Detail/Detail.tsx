import { Post } from '@1k-cove/common';
import { marked } from 'marked';
import { useEffect, useRef } from 'react';

type DetailProps = {
  post: Post;
};

const Detail: React.FC<DetailProps> = (props) => {
  const divRef = useRef<HTMLDivElement>(null);
  const html = marked(props.post.content);
  useEffect(() => {
    if (!divRef.current) return;
    divRef.current.innerHTML = html;
  }, []);
  return <div ref={divRef}></div>;
};

export default Detail;
