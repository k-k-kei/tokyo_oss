import firebase from 'firebase';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_PROJECT_API,
  authDomain: process.env.FIREBASE_AUTH_DOMEIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STRAGE_BUCKET
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}

const db = firebase.firestore();
export default db

