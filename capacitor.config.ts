import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.monteNegro',
  appName: 'Hvala',
  webDir: 'build',
  server: {
    allowNavigation: [
      "*.google.com",
      "*.googleapis.com",
      "*.gstatic.com",
      "*.firebaseapp.com",
      "*.firebase.com"
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
  }
};

export default config;
