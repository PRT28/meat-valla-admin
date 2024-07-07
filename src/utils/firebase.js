import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCFHF3UNDCUJ53C5ZE-c5W2PLW1mtYCSf4",
  authDomain: "meat-delivery-c9079.firebaseapp.com",
  projectId: "meat-delivery-c9079",
  storageBucket: "meat-delivery-c9079.appspot.com",
  messagingSenderId: "553907136224",
  appId: "1:553907136224:web:a1ef500962456f4f539285",
  measurementId: "G-H9PDKT6H4Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);