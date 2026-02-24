import { PushNotifications } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';
import { getToken, onMessage, isSupported } from 'firebase/messaging';
import { doc, updateDoc, arrayUnion, serverTimestamp } from 'firebase/firestore';
import { auth, db, messaging } from '../config/firebase';
import { VAPID_KEY } from '../config/pushConfig';

let permissionGranted = false;
let listenersAdded = false;
let lastFcmToken = null;

const saveTokenToFirestore = async (userId, token) => {
  if (!userId || !token || !db) return;
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      fcmTokens: arrayUnion(token),
      fcmTokenUpdatedAt: serverTimestamp(),
    });
    console.log('✅ FCM token saved to Firestore');
  } catch (err) {
    console.error('❌ Failed to save FCM token:', err);
  }
};

const addPushNotificationListeners = () => {
  if (!Capacitor.isNativePlatform() || listenersAdded) {
    return;
  }

  console.log('Adding push notification listeners...');

  // On successful registration
  PushNotifications.addListener('registration', (token) => {
    console.log('✅ Push notification registration successful!');
    lastFcmToken = token.value;
    if (auth?.currentUser?.uid) {
      saveTokenToFirestore(auth.currentUser.uid, token.value);
    }
  });

  // Some issue with our setup and push will not work
  PushNotifications.addListener('registrationError', (error) => {
    console.error('❌ Push notification registration error: ', error.error);
    console.error('Error details:', error);
  });

  // Show us the notification payload if the app is open on our device
  PushNotifications.addListener('pushNotificationReceived', (notification) => {
    console.log('📨 Push notification received while app is open: ', notification);
  });

  // Method called when tapping on a notification
  PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
    const data = notification?.notification?.data || {};
    const adId = data.adId;
    if (adId) {
      window.dispatchEvent(new CustomEvent('hvala:pushOpenAd', { detail: { adId } }));
    }
  });

  console.log('✅ All push notification listeners added');
  listenersAdded = true;
};

const initializeWebPush = async () => {
  if (!messaging || !VAPID_KEY || !('serviceWorker' in navigator)) {
    if (!VAPID_KEY) {
      console.log('ℹ️ Web Push: добавьте VAPID_KEY в src/config/pushConfig.js');
    }
    return;
  }

  try {
    const supported = await isSupported();
    if (!supported) {
      console.log('ℹ️ Web Push: браузер не поддерживает (IndexedDB/Service Worker недоступны)');
      return;
    }
  } catch {
    return;
  }

  console.log('🚀 Initializing Web Push...');

  try {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      console.log('❌ Web Push permission denied');
      return;
    }

    permissionGranted = true;
    const token = await getToken(messaging, { vapidKey: VAPID_KEY });
    if (token) {
      lastFcmToken = token;
      if (auth?.currentUser?.uid) {
        await saveTokenToFirestore(auth.currentUser.uid, token);
      }
    }

    auth?.onAuthStateChanged?.((user) => {
      if (user?.uid && lastFcmToken) {
        saveTokenToFirestore(user.uid, lastFcmToken);
      }
    });

    onMessage(messaging, (payload) => {
      const notif = payload.notification || {};
      const data = payload.data || {};
      if (Notification.permission === 'granted') {
        new Notification(notif.title || 'Hvala', {
          body: notif.body || '',
          icon: '/android-chrome-192x192.png',
          data: { adId: data.adId },
        }).onclick = () => {
          if (data.adId) {
            window.dispatchEvent(new CustomEvent('hvala:pushOpenAd', { detail: { adId: data.adId } }));
          }
        };
      }
    });

    console.log('✅ Web Push initialized');
  } catch (err) {
    console.error('💥 Web Push error:', err);
  }
};

export const initializePushNotifications = async () => {
  if (Capacitor.isNativePlatform()) {
    console.log('🚀 Initializing push notifications (native)...');
    try {
      addPushNotificationListeners();
      auth?.onAuthStateChanged?.((user) => {
        if (user?.uid && lastFcmToken) {
          saveTokenToFirestore(user.uid, lastFcmToken);
        }
      });

      const result = await PushNotifications.requestPermissions();
      if (result.receive === 'granted') {
        permissionGranted = true;
        await PushNotifications.register();
        console.log('✅ Push notification registration initiated');
      } else {
        console.log('❌ Push notification permission denied');
      }
    } catch (error) {
      console.error('💥 Error initializing push notifications:', error);
    }
    return;
  }

  await initializeWebPush();
};

export const getPushNotificationToken = async () => {
  if (!Capacitor.isNativePlatform() || !permissionGranted) {
    return null;
  }

  try {
    // Get the registration token
    const result = await PushNotifications.getDeliveredNotifications();
    return result;
  } catch (error) {
    console.error('Error getting push notification token:', error);
    return null;
  }
};
