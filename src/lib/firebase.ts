import { FirebaseApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase Web configuration. These values are intended for client-side use.
const firebaseConfig = {
  apiKey: "AIzaSyCI2zju-RiUZxI9hpI7-lvVOGs_-trGrpQ",
  authDomain: "alpha-foundation-3f847.firebaseapp.com",
  projectId: "alpha-foundation-3f847",
  storageBucket: "alpha-foundation-3f847.firebasestorage.app",
  messagingSenderId: "608257286890",
  appId: "1:608257286890:web:0ce7585a28f499c26a2d93",
  measurementId: "G-0B1WF6JKRW",
};

function getFirebaseApp(): FirebaseApp {
  const existing = getApps();
  if (existing.length > 0) return existing[0];

  return initializeApp(firebaseConfig);
}

export const firebaseApp = getFirebaseApp();
export const auth = getAuth(firebaseApp);
