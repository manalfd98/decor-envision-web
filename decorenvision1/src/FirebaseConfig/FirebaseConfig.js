import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDmZyNZlMun0lcGIcPtKBC9DxY3IFZb3QA",
  authDomain: "decorenvision-2ef04.firebaseapp.com",
  projectId: "decorenvision-2ef04",
  storageBucket: "decorenvision-2ef04.appspot.com",
  messagingSenderId: "614206080340",
  appId: "1:614206080340:web:15d94c923d8006aa40b4c1",
  measurementId: "G-64B9RV49Y0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);