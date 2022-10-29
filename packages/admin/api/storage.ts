import {
  FirebaseStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';

export default class StorageApi {
  storage: FirebaseStorage;

  constructor(storage: FirebaseStorage) {
    this.storage = storage;
  }

  upload(file: File, docId: string) {
    const storageRef = ref(this.storage, `_ogp/${docId}`);

    return uploadBytes(storageRef, file).then((snapshot) => {
      return getDownloadURL(ref(this.storage, `_ogp/${docId}`));
    });
  }
}
