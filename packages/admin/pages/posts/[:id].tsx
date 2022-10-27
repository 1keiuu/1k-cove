import { Firestore } from 'firebase/firestore';
import { GetServerSideProps, NextPage } from 'next';
import { getPost } from '../../api/posts';
import { initFirebase } from '../../utils/firebase';
import superjson from 'superjson';
import { Post } from '../../@types/post';

type PostIdPageProps = {
  post: string;
};

const PostIdPage: NextPage<PostIdPageProps> = (props) => {
  const post = superjson.parse(props.post) as Post;

  return <p>{post?.content}</p>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.params?.[':id'];
  if (!slug) {
    return {
      props: {},
      notFound: !slug,
    };
  }
  const { db } = initFirebase();
  const res = await getPost(db, slug as string);

  return {
    props: {
      post: superjson.stringify(res),
    },
    notFound: !res,
  };
};

export default PostIdPage;
