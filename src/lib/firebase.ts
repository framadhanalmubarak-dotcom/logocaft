import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBKXYhMLW3Y64B8v5PcPtClzNuzGDpDzGg",
  authDomain: "logocraft-5bd12.firebaseapp.com",
  projectId: "logocraft-5bd12",
  storageBucket: "logocraft-5bd12.firebasestorage.app",
  messagingSenderId: "676091772249",
  appId: "1:676091772249:web:52687da25601bf1bcf6048",
  measurementId: "G-7L5LDEP01E",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
