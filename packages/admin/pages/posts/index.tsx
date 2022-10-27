import { Firestore } from 'firebase/firestore';
import { NextPage } from 'next';
import { listPosts } from '../../api/posts';
import { initFirebase } from '../../utils/firebase';
import superjson from 'superjson';
import { Post } from '../../@types/post';
import Link from 'next/link';

type PostIndexPageProps = {
  posts: string;
};

const PostIndexPage: NextPage<PostIndexPageProps> = (props) => {
  const posts = superjson.parse(props.posts) as Post[];
  return (
    <>
      {posts.map((post) => {
        <Link href={`/posts/${post.slug}`}></Link>;
      })}
    </>
  );
};

export const getServerSideProps = async () => {
  const { db } = initFirebase();
  const res = await listPosts(db);
  const posts = superjson.stringify(res);

  return {
    props: {
      posts,
    },
  };
};

export default PostIndexPage;
