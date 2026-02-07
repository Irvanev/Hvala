import type { CapacitorConfig } from '@capacitor/cli';

// Режим WebView по URL: приложение грузится с сервера, обновления без нового APK.
// По умолчанию используется https://hvala.app
// Чтобы переопределить, задай CAPACITOR_SERVER_URL=другой_url и собери: npx cap sync.
// Чтобы отключить WebView (использовать локальный фронт из APK), задай CAPACITOR_SERVER_URL=""
const serverUrl = process.env.CAPACITOR_SERVER_URL;
const defaultServerUrl = 'https://hvala.app';

const config: CapacitorConfig = {
  appId: 'app.hvala.release',
  appName: 'Hvala',
  webDir: 'build',
  server: {
    // Используем переданный URL, или дефолтный, или пусто (локальный режим)
    ...(serverUrl !== undefined 
      ? (serverUrl === '' ? {} : { url: serverUrl })
      : { url: defaultServerUrl }
    ),
    allowNavigation: [
      "*.google.com",
      "*.googleapis.com",
      "*.gstatic.com",
      "*.firebaseapp.com",
      "*.firebase.com",
      "*.web.app",
      "hvala.app",
      "*.hvala.app"
    ]
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0
    },
    FirebaseMessaging: {
      presentationOptions: ["badge", "sound", "alert"]
    },
    FirebaseApp: {
      projectId: "hvala-2c8a4",
      authDomain: "hvala-2c8a4.firebaseapp.com",
      apiKey: "AIzaSyA0JYzidakTvQYEe0pS50vshlex2Q4jg4g",
      storageBucket: "hvala-2c8a4.appspot.com",
      messagingSenderId: "937525121099",
      appId: "1:937525121099:web:843e79493bbd6e49b7fdce"
    }
  },
  android: {
    path: "android"
  },
  ios: {
    path: "ios"
  }
};

export default config;
