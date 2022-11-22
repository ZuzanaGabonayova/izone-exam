// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
/* import { getAnalytics } from "firebase/analytics"; */
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBt5PAl_O4-VzqW35HYJihiOfvbhCv8Hyk",
  authDomain: "zuzanagabonayova-izone.firebaseapp.com",
  projectId: "zuzanagabonayova-izone",
  storageBucket: "zuzanagabonayova-izone.appspot.com",
  messagingSenderId: "878857885847",
  appId: "1:878857885847:web:856b7c53ecb694f54571d2",
  measurementId: "G-L1KK65V4J1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
/* const analytics = getAnalytics(app); */
const auth = getAuth();

export {auth};
export const db = getFirestore(app);
export const storage = getStorage(app);