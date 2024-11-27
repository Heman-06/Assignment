import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const Config = {
  apiKey: "AIzaSyBS0bTpHJrf-HdQOVwpdxGgKrQTuc3i5Ck",
  authDomain: "crud-de212.firebaseapp.com",
  projectId: "crud-de212",
  storageBucket: "crud-de212.firebasestorage.app",
  messagingSenderId: "654646406822",
  appId: "1:654646406822:web:8cc75407916a3b88124e67",
  measurementId: "G-P8GLJG6XZR"
};
const app = initializeApp(Config);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
