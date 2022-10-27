// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  collection,
  DocumentData,
  Firestore,
  getDocs,
  getDoc,
  query,
  where,
} from 'firebase/firestore';

export const listPosts = async (db: Firestore): Promise<DocumentData[]> => {
  const res: DocumentData[] = [];
  const querySnapshot = await getDocs(collection(db, 'posts'));
  querySnapshot.forEach((doc) => {
    res.push(doc.data());
  });
  return res;
};

export const getPost = async (db: Firestore, slug: string) => {
  let res = null;
  const postRef = collection(db, 'posts');
  const q = query(postRef, where('slug', '==', slug));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc, i) => {
    if (i > 0) return;
    res = doc.data();
  });
  return res;
};
