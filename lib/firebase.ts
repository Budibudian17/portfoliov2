// lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCS3qb-46rW_LVA6vDWZib2KWwlqdvI4qQ",
    authDomain: "hilmiportfoliodev.firebaseapp.com",
    projectId: "hilmiportfoliodev",
    storageBucket: "hilmiportfoliodev.firebasestorage.app",
    messagingSenderId: "387779604069",
    appId: "1:387779604069:web:114a89857946a9f3c5208c",
    measurementId: "G-T9RC0YKQN2"
  };

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
