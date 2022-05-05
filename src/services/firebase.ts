import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: "AIzaSyAT_u8SGD2fYQAfS2A7TtbLnw2858gXJ-Q",
  authDomain: "letmeask-nlw-01.firebaseapp.com",
  databaseURL: "https://letmeask-nlw-01-default-rtdb.firebaseio.com",
  projectId: "letmeask-nlw-01",
  storageBucket: "letmeask-nlw-01.appspot.com",
  messagingSenderId: "139439964623",
  appId: "1:139439964623:web:8e9f5203e0cdab427c92ba"
  };

  firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

  export {firebase, auth, database}