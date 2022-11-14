import styles from './BlogInfo.module.css';

type BlogInfoProps = {
  date: string;
};

const BlogInfo: React.FC<BlogInfoProps> = (props) => {
  return (
    <div className={styles['blog-info']}>
      <div></div>
      <p>{props.date ?? '不明'}</p>
    </div>
  );
};
export default BlogInfo;
