import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBjbl3Au5r7mYc8jJt8umgQKrlgxHd1joI",
    authDomain: "recipefinder-d903f.firebaseapp.com",
    databaseURL: "https://recipefinder-d903f-default-rtdb.firebaseio.com",
    projectId: "recipefinder-d903f",
    storageBucket: "recipefinder-d903f.appspot.com",
    messagingSenderId: "207216966639",
    appId: "1:207216966639:web:c4eab50f9b3b3d0f67d41a"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };