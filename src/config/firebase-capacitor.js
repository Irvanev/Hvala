import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { Capacitor } from '@capacitor/core';
import { FirebaseApp } from '@capacitor-firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyA0JYzidakTvQYEe0pS50vshlex2Q4jg4g",
    authDomain: "hvala-2c8a4.firebaseapp.com",
    projectId: "hvala-2c8a4",
    storageBucket: "hvala-2c8a4.appspot.com",
    messagingSenderId: "937525121099",
    appId: "1:937525121099:web:843e79493bbd6e49b7fdce"
};

let app;

const initializeFirebase = async () => {
    try {
        if (Capacitor.isNativePlatform()) {
            // Для нативных платформ используем Capacitor Firebase
            console.log('🔥 Initializing Firebase app for native platform...');
            app = await FirebaseApp.initializeApp(firebaseConfig);
        } else {
            // Для веб используем обычный Firebase
            console.log('🔥 Initializing Firebase app for web platform...');
            app = initializeApp(firebaseConfig);
        }
        
        console.log('✅ Firebase initialization complete');
        return app;
    } catch (error) {
        console.error('❌ Firebase initialization failed:', error);
        throw error;
    }
};

// Инициализируем Firebase
initializeFirebase();

// Экспортируем сервисы Firebase
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Экспортируем app для случаев, когда он нужен
export { app };

console.log('✅ Firebase services exported successfully');
