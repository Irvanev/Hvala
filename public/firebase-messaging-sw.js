/* eslint-disable no-restricted-globals */
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyA0JYzidakTvQYEe0pS50vshlex2Q4jg4g',
  authDomain: 'hvala-2c8a4.firebaseapp.com',
  projectId: 'hvala-2c8a4',
  storageBucket: 'hvala-2c8a4.appspot.com',
  messagingSenderId: '937525121099',
  appId: '1:937525121099:web:843e79493bbd6e49b7fdce',
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notif = payload.notification || {};
  const data = payload.data || {};
  const title = notif.title || data.title || 'Hvala';
  const body = notif.body || data.body || '';

  return self.registration.showNotification(title, {
    body,
    icon: '/android-chrome-192x192.png',
    data: { adId: data.adId || '' },
    tag: data.adId ? `ad-${data.adId}` : 'hvala-push',
  });
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const adId = event.notification?.data?.adId;
  if (adId) {
    const url = `${self.location.origin}/advertisment/${adId}`;
    event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
        for (const client of clientList) {
          if (client.url.startsWith(self.location.origin) && 'focus' in client) {
            client.navigate(url);
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(url);
        }
      })
    );
  }
});
