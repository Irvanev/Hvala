import { db, auth } from '../config/firebase';
import { collection, getDocs, query, limit } from 'firebase/firestore';
import { Capacitor } from '@capacitor/core';

class FirebaseDebug {
    static async testConnection() {
        console.log('🔧 FIREBASE DEBUG: Starting comprehensive test...');
        
        // Проверяем платформу
        const platform = Capacitor.getPlatform();
        console.log('📱 PLATFORM:', platform);
        console.log('🔧 IS_NATIVE:', Capacitor.isNativePlatform());
        
        // Проверяем объект db
        console.log('💾 DATABASE OBJECT:', db);
        console.log('🔑 AUTH OBJECT:', auth);
        
        // Проверяем подключение к коллекции advertisements
        try {
            console.log('🔍 TESTING ADVERTISEMENTS COLLECTION...');
            const adsCollection = collection(db, 'advertisements');
            console.log('📂 COLLECTION REFERENCE:', adsCollection);
            
            const q = query(adsCollection, limit(1));
            console.log('📋 QUERY OBJECT:', q);
            
            console.log('⏳ EXECUTING QUERY...');
            const snapshot = await getDocs(q);
            console.log('📊 QUERY SNAPSHOT:', snapshot);
            console.log('📏 SNAPSHOT SIZE:', snapshot.size);
            console.log('📦 SNAPSHOT EMPTY:', snapshot.empty);
            
            if (!snapshot.empty) {
                console.log('✅ ADVERTISEMENTS FOUND:', snapshot.size);
                snapshot.forEach((doc) => {
                    console.log('📄 DOCUMENT ID:', doc.id);
                    console.log('📄 DOCUMENT DATA:', doc.data());
                });
            } else {
                console.log('⚠️ NO ADVERTISEMENTS FOUND');
            }
            
            return {
                success: true,
                platform,
                documentsCount: snapshot.size,
                isEmpty: snapshot.empty
            };
            
        } catch (error) {
            console.error('❌ FIREBASE DEBUG ERROR:', error);
            console.error('❌ ERROR CODE:', error.code);
            console.error('❌ ERROR MESSAGE:', error.message);
            console.error('❌ ERROR STACK:', error.stack);
            
            return {
                success: false,
                platform,
                error: error.message,
                errorCode: error.code
            };
        }
    }
    
    static async testAuth() {
        console.log('🔐 TESTING FIREBASE AUTH...');
        try {
            const user = auth.currentUser;
            console.log('👤 CURRENT USER:', user);
            
            return {
                success: true,
                user: user ? user.uid : null,
                isAuthenticated: !!user
            };
        } catch (error) {
            console.error('❌ AUTH ERROR:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }
}

export default FirebaseDebug;
