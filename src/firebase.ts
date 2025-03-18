import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIRBEASE_API_KEY,
  authDomain: "airo-6fc04.firebaseapp.com",
  projectId: "airo-6fc04",
  storageBucket: "airo-6fc04.firebasestorage.app",
  messagingSenderId: "61293363063",
  appId: "1:61293363063:web:8eabfa6db5c861d2856b72",
  measurementId: "G-QQXZK2L2RR",
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
