
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAIMfVQm1q7gqXJPZNLdV45y80luIgMgqA",
    authDomain: "hotel-app-2fd7a.firebaseapp.com",
    projectId: "hotel-app-2fd7a",
    storageBucket: "hotel-app-2fd7a.appspot.com",
    messagingSenderId: "721470363134",
    appId: "1:721470363134:web:139f86868f769d2c5a5caf"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
