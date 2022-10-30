import { Post } from '@1k-cove/common';
import marked from 'marked';

type DetailProps = {
  post: Post;
};

const Detail: React.FC<DetailProps> = (props) => {
  const html = marked(props.post.content);
  return <div>{html}</div>;
};

export default Detail;
