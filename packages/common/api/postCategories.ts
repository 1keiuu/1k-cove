import {
  collection,
  DocumentData,
  Firestore,
  getDocs,
  orderBy,
  query,
  where,
  updateDoc,
  DocumentSnapshot,
  CollectionReference,
  addDoc,
  serverTimestamp,
  deleteDoc,
  QueryConstraint,
} from 'firebase/firestore';
import { Category } from '../@types/category';
import { PostCategories } from '../@types/postCategories';

const POST_CATEGORIES_COLLECTION_NAME = 'post_categories';

export class PostCategoryApiClient {
  db: Firestore;
  collectionRef: CollectionReference;

  constructor(db: Firestore) {
    this.db = db;
    this.collectionRef = collection(db, POST_CATEGORIES_COLLECTION_NAME);
  }

  listCategories = async (): Promise<DocumentData[]> => {
    const res: DocumentData[] = [];
    const q = query(this.collectionRef);
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      res.push(doc.data());
    });
    return res;
  };

  getPostCategoriesRefByPostId = async (postId: string) => {
    let res: DocumentSnapshot | null = null;
    const q = query(this.collectionRef, where('postId', '==', postId));
    const querySnapshot = await getDocs(q);
    let i = 0;
    querySnapshot.forEach((result) => {
      if (i > 0) return;
      res = result;
      i++;
    });
    return res;
  };

  where = async (condition: QueryConstraint) => {
    let res: DocumentSnapshot | null = null;
    const q = query(this.collectionRef, condition);
    const querySnapshot = await getDocs(q);
    let i = 0;
    querySnapshot.forEach((result) => {
      if (i > 0) return;
      res = result;
      i++;
    });
    return res;
  };

  getPostCategoriesByPostId = async (postId: string) => {
    const res = await this._getDocByPostId(postId);
    if (!res) return null;
    return Object.assign({ docId: res.id }, res.data());
  };

  createPostCategories = async (postCategory: PostCategories) => {
    const data = Object.assign(postCategory, {
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return await addDoc(this.collectionRef, data);
  };

  updatePostCategories = async (postCategory: PostCategories) => {
    const data = Object.assign(postCategory, {
      updatedAt: serverTimestamp(),
    });
    const doc = await this._getDocByPostId(data.postId);
    if (!doc) {
      return;
    }
    return await updateDoc(doc.ref, data);
  };

  upsertPostCategories = async (postId: string, category: Category) => {
    const doc = await this._getDocByPostId(postId);
    if (!doc) {
      await addDoc(
        this.collectionRef,
        Object.assign(
          { categories: [category], slugs: [category.slug] },
          { postId: postId }
        )
      );
      return;
    }
    let categories = doc?.data()?.categories ?? [];
    let slugs = doc?.data()?.slugs ?? [];
    const categorySlugs = categories?.map(
      (category: Category) => category.slug
    );

    // 既存のslugsになければ追加
    if (!categorySlugs.includes(category.slug)) {
      categories = [...categories, category];
      slugs = [...slugs, category.slug];
    }
    const data = {
      postId: postId,
      categories: categories,
      slugs: slugs,
    };

    return await updateDoc(doc.ref, data);
  };

  deletePostCategories = async (postId: string) => {
    const doc = await this._getDocByPostId(postId);
    if (!doc) {
      return;
    }
    return await deleteDoc(doc.ref);
  };

  private _getDocByPostId = async (
    postId: string
  ): Promise<DocumentSnapshot | null> => {
    let res: DocumentSnapshot | null = null;
    const q = query(this.collectionRef, where('postId', '==', postId));
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
