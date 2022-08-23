import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCvIXJBY3J_JfEUoel5zJFZKgteJi_3pck",
  authDomain: "todo-2211.firebaseapp.com",
  projectId: "todo-2211",
  storageBucket: "todo-2211.appspot.com",
  messagingSenderId: "404613594582",
  appId: "1:404613594582:web:074c7f0038e93d51123877",
  measurementId: "G-KZKNJBWTQ5",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth();
