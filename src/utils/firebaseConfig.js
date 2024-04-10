// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "social-media-app-nextjs-419507.firebaseapp.com",
  projectId: "social-media-app-nextjs-419507",
  storageBucket: "social-media-app-nextjs-419507.appspot.com",
  messagingSenderId: "431405835935",
  appId: "1:431405835935:web:6cd788cb1932278a58a4aa",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
