// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  collection,
  DocumentData,
  Firestore,
  getDocs,
  query,
  where,
  updateDoc,
  DocumentSnapshot,
  CollectionReference,
  addDoc,
  serverTimestamp,
  deleteDoc,
} from 'firebase/firestore';
import { Post } from '../@types/post';

const POSTS_COLLECTION_NAME = 'posts';

export default class PostApiClient {
  db: Firestore;
  collectionRef: CollectionReference;

  constructor(db: Firestore) {
    this.db = db;
    this.collectionRef = collection(db, POSTS_COLLECTION_NAME);
  }

  listPosts = async (): Promise<DocumentData[]> => {
    const res: DocumentData[] = [];
    const querySnapshot = await getDocs(this.collectionRef);
    querySnapshot.forEach((doc) => {
      res.push(doc.data());
    });
    return res;
  };

  getPostRefBySlug = async (slug: string) => {
    let res = null;
    const q = query(this.collectionRef, where('slug', '==', slug));
    const querySnapshot = await getDocs(q);
    let i = 0;
    querySnapshot.forEach((result) => {
      if (i > 0) return;
      res = result;
      i++;
    });
    return res;
  };

  getPostBySlug = async (slug: string) => {
    const res = await this._getDocBySlug(slug);
    if (!res) return null;
    return res.data();
  };

  createPost = async (post: Post) => {
    const data = Object.assign(post, {
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return await addDoc(this.collectionRef, data);
  };

  updatePost = async (post: Post) => {
    const data = Object.assign(post, {
      updatedAt: serverTimestamp(),
    });
    const doc = await this._getDocBySlug(data.slug);
    if (!doc) {
      return;
    }
    return await updateDoc(doc.ref, data);
  };

  deletePost = async (slug: string) => {
    const doc = await this._getDocBySlug(slug);
    if (!doc) {
      return;
    }
    return await deleteDoc(doc.ref);
  };

  private _getDocBySlug = async (
    slug: string
  ): Promise<DocumentSnapshot | null> => {
    let res = null;
    const q = query(this.collectionRef, where('slug', '==', slug));
    const querySnapshot = await getDocs(q);
    let i = 0;
    querySnapshot.forEach((result) => {
      if (i > 0) {
        return;
      }
      res = result;
      i++;
    });
    if (res === null) return null;
    return res;
  };
}
