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
} from "firebase/firestore";
import { Category } from "../@types/category";

const CATEGORIES_COLLECTION_NAME = "categories";

/**
 * @deprecated
 */
export class CategoryApiClient {
  db: Firestore;
  collectionRef: CollectionReference;

  constructor(db: Firestore) {
    this.db = db;
    this.collectionRef = collection(db, CATEGORIES_COLLECTION_NAME);
  }

  listCategories = async (): Promise<Category[]> => {
    const res: Category[] = [];
    const q = query(this.collectionRef);
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      res.push(doc.data() as Category);
    });
    return res;
  };

  getCategoryRefBySlug = async (slug: string) => {
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

  getCategoryBySlug = async (slug: string) => {
    const res = await this._getDocBySlug(slug);
    if (!res) return null;
    return Object.assign({ docId: res.id }, res.data());
  };

  createCategory = async (category: Category) => {
    const data = Object.assign(category, {
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return await addDoc(this.collectionRef, data);
  };

  updateCategory = async (category: Category) => {
    const data = Object.assign(category, {
      updatedAt: serverTimestamp(),
    });
    const doc = await this._getDocBySlug(data.slug);
    if (!doc) {
      return;
    }
    return await updateDoc(doc.ref, data);
  };

  deleteCategory = async (slug: string) => {
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
