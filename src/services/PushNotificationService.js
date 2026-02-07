import { PushNotifications } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';

let permissionGranted = false;
let listenersAdded = false;

const addPushNotificationListeners = () => {
  if (!Capacitor.isNativePlatform() || listenersAdded) {
    return;
  }

  console.log('Adding push notification listeners...');

  // On successful registration
  PushNotifications.addListener('registration', (token) => {
    console.log('✅ Push notification registration successful!');
    console.log('📱 Registration token: ', token.value);
    // Here you would typically send this token to your server
    // Example: sendTokenToServer(token.value);
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
    console.log('👆 Push notification tapped:', notification.actionId, notification.inputValue);
  });

  console.log('✅ All push notification listeners added');
  listenersAdded = true;
};

export const initializePushNotifications = async () => {
  // Only initialize on mobile platforms
  if (!Capacitor.isNativePlatform()) {
    console.log('ℹ️ Push notifications not supported on web platform');
    return;
  }

  console.log('🚀 Initializing push notifications...');

  try {
    // Add listeners first, before registration
    addPushNotificationListeners();

    console.log('📋 Requesting push notification permissions...');
    // Request permission to use push notifications
    const result = await PushNotifications.requestPermissions();
    console.log('🔐 Permission result:', result);
    
    if (result.receive === 'granted') {
      permissionGranted = true;
      console.log('✅ Push notification permission granted');
      
      console.log('📱 Registering for push notifications...');
      // Register for push notifications
      await PushNotifications.register();
      console.log('✅ Push notification registration initiated');
    } else {
      console.log('❌ Push notification permission denied');
    }
  } catch (error) {
    console.error('💥 Error initializing push notifications:', error);
  }
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
