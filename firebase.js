
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
const firebaseConfig = {
    apiKey: "AIzaSyAexhpSBpZgD82dwi-2gK-XtzR3t6Gtwak",
    authDomain: "crud-react-a55cd.firebaseapp.com",
    projectId: "crud-react-a55cd",
    storageBucket: "crud-react-a55cd.appspot.com",
    messagingSenderId: "53498360650",
    appId: "1:53498360650:web:f2bb49a66b9486407607b3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
