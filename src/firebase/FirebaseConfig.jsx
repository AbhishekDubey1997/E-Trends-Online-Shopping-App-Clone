// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAhQFZRYBaXGFkxsW6qTlNxMhjeXxm59vk",
  authDomain: "myfirstapp-82dd4.firebaseapp.com",
  projectId: "myfirstapp-82dd4",
  storageBucket: "myfirstapp-82dd4.appspot.com",
  messagingSenderId: "384291272918",
  appId: "1:384291272918:web:e45a7da01a45cddd94b177"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app)
const auth = getAuth(app)

export {fireDB,auth}