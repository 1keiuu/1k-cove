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

  upload(file: File, key: string) {
    const storageRef = ref(this.storage, key);

    return uploadBytes(storageRef, file).then(() => {
      return getDownloadURL(ref(this.storage, key));
    });
  }
}
