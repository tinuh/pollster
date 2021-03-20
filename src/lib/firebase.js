import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: "AIzaSyDCe1gpQwAe-mCJTg2WmSBm4bKg3-L-XTs",
  authDomain: "dev-pollster.firebaseapp.com",
  projectId: "dev-pollster",
  storageBucket: "dev-pollster.appspot.com",
  messagingSenderId: "1072476625533",
  appId: "1:1072476625533:web:6ed757ca62cc1c97b92f14"
};

export default function initFirebase() {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
}