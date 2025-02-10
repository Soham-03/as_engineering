// app/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBjmJz1mEIb43YdjACvdt5DbzbcvZWbmOY",
  authDomain: "music-app-8423a.firebaseapp.com",
  databaseURL: "https://music-app-8423a.firebaseio.com",
  projectId: "music-app-8423a",
  storageBucket: "music-app-8423a.appspot.com",
  messagingSenderId: "826869174710",
  appId: "1:826869174710:web:dabc2264d7aec500ebb117",
  measurementId: "G-M1M1186L4D"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export default app;