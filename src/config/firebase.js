import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyA0JYzidakTvQYEe0pS50vshlex2Q4jg4g",
    authDomain: "hvala-2c8a4.firebaseapp.com",
    projectId: "hvala-2c8a4",
    storageBucket: "hvala-2c8a4.appspot.com",
    messagingSenderId: "937525121099",
    appId: "1:937525121099:web:843e79493bbd6e49b7fdce"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const messaging = getMessaging(app);