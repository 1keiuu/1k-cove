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
} from "firebase/firestore";
import { Post } from "../@types/post";
import { DomParser } from "@1k-cove/md-editor";

const POSTS_COLLECTION_NAME = "posts";

/**
 * @deprecated
 */
export class PostApiClient {
  db: Firestore;
  collectionRef: CollectionReference;

  constructor(db: Firestore) {
    this.db = db;
    this.collectionRef = collection(db, POSTS_COLLECTION_NAME);
  }

  /**
   * Warning: publicでない記事もfetchする. adminからのみ使う.
   */
  listPosts = async () => {
    const res: DocumentData[] = [];
    const q = query(this.collectionRef, orderBy("date", "desc"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      res.push(doc.data());
    });
    return res;
  };

  listPublicPosts = async (): Promise<DocumentData[]> => {
    const res: DocumentData[] = [];
    const q = query(
      this.collectionRef,
      where("isPublic", "==", true),
      orderBy("date", "desc")
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      res.push(doc.data());
    });
    return res;
  };

  where = async (condition: QueryConstraint): Promise<Post[]> => {
    let res: Post[] = [];
    const q = query(this.collectionRef, condition);
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((result) => {
      res.push(result.data() as Post);
    });
    return res;
  };

  getPostRefBySlug = async (slug: string) => {
    let res: DocumentSnapshot | null = null;
    const q = query(this.collectionRef, where("slug", "==", slug));
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
    return Object.assign({ docId: res.id }, res.data());
  };

  createPost = async (post: Post) => {
    const data = Object.assign(post, {
      isPublic: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return await addDoc(this.collectionRef, data);
  };

  updatePost = async (post: Post) => {
    const parser = new DomParser();
    const description = parser.extractString(post.content).slice(0, 120);
    const data = Object.assign(post, {
      description: description,
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
    let res: DocumentSnapshot | null = null;
    const q = query(this.collectionRef, where("slug", "==", slug));
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
