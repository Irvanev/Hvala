import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging } from "firebase/messaging";
import { getAnalytics } from "firebase/analytics";
import { Capacitor } from '@capacitor/core';

const firebaseConfig = {
    apiKey: "AIzaSyA0JYzidakTvQYEe0pS50vshlex2Q4jg4g",
    authDomain: "hvala-2c8a4.firebaseapp.com",
    projectId: "hvala-2c8a4",
    storageBucket: "hvala-2c8a4.appspot.com",
    messagingSenderId: "937525121099",
    appId: "1:937525121099:web:843e79493bbd6e49b7fdce",
    measurementId: "G-Y1XH28MBTY"
};

console.log('🔥 Initializing Firebase app...');
console.log('Platform:', Capacitor.getPlatform());
console.log('🔧 Firebase Config:', {
    projectId: firebaseConfig.projectId,
    apiKey: firebaseConfig.apiKey ? 'SET' : 'NOT SET',
    authDomain: firebaseConfig.authDomain
});

const app = initializeApp(firebaseConfig);

console.log('🔐 Initializing Firebase Auth...');
export const auth = getAuth(app);

console.log('📊 Initializing Firestore...');
export const db = getFirestore(app);

console.log('📁 Initializing Firebase Storage...');
export const storage = getStorage(app);

// Firebase Analytics (web only)
let analytics = null;
if (typeof window !== 'undefined') {
    try {
        analytics = getAnalytics(app);
        console.log('📊 Firebase Analytics initialized');
    } catch (e) {
        console.log('ℹ️ Analytics skipped:', e.message);
    }
}
export { analytics };

// Only initialize messaging for web platform
let messaging = null;
if (!Capacitor.isNativePlatform() && typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    try {
        console.log('📨 Initializing Firebase Messaging...');
        messaging = getMessaging(app);
        console.log('✅ Firebase Messaging initialized successfully');
    } catch (error) {
        console.log('❌ Firebase messaging not supported in this environment:', error);
    }
} else {
    console.log('ℹ️ Firebase Messaging skipped (native platform)');
}

// Test Firebase connection
setTimeout(() => {
    console.log('🧪 Testing Firebase connection...');
    console.log('Auth state:', auth ? 'Initialized' : 'Failed');
    console.log('Firestore state:', db ? 'Initialized' : 'Failed');
    console.log('Storage state:', storage ? 'Initialized' : 'Failed');
}, 1000);

console.log('✅ Firebase initialization complete');

export { messaging };