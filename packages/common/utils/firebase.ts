// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { FirebaseConfig } from "../@types/firebase";

export const initFirebase = (config?: FirebaseConfig) => {
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  // const firebaseConfig = config ?? {
  //   apiKey: process.env.API_KEY,
  //   authDomain: process.env.AUTH_DOMAIN,
  //   projectId: process.env.PROJECT_ID,
  //   storageBucket: process.env.STORAGE_BUCKET,
  //   messagingSenderId: process.env.MESSAGING_SENDER_ID,
  //   appId: process.env.APP_ID,
  //   measurementId: process.env.MEASUREMENT_ID,
  // };
  const firebaseConfig = config ?? {
    apiKey: "AIzaSyCpk7ep7tMSS0i8f3ku00JCIlbbBRdwkmE",
    authDomain: "portfolio21-56e7e.firebaseapp.com",
    projectId: "portfolio21-56e7e",
    storageBucket: "portfolio21-56e7e.appspot.com",
    messagingSenderId: "515187296876",
    appId: "1:515187296876:web:6dc12de78358be1c81a649",
    measurementId: "G-JGPW8TVGZP",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const storage = getStorage(app);

  return { db, storage };
};
