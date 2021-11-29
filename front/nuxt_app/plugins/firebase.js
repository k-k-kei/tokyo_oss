import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyDtXT47mW0Faq8lOKOFum1ZkgsGxKCnQGo',
  authDomain: 'tokyo-oss-ad760.firebaseapp.com',
  projectId: 'tokyo-oss-ad760',
  storageBucket: 'tokyo-oss-ad760.appspot.com'
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}
const db = firebase.firestore()
export default db
