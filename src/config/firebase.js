import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCgXAxlwicwjoEXZTgj0sRQ9Zpu7isBpo8",
  authDomain: "connectsphere-ab9d7.firebaseapp.com",
  projectId: "connectsphere-ab9d7",
  storageBucket: "connectsphere-ab9d7.appspot.com",
  messagingSenderId: "987047797955",
  appId: "1:987047797955:web:1cad8f294f1d33454c6e76"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app) 