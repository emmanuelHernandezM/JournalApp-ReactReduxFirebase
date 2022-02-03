import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDmc91JS9KOOdymjBLFi6nrEaHrtFhm7u8",
    authDomain: "react-app-curso-aeab8.firebaseapp.com",
    projectId: "react-app-curso-aeab8",
    storageBucket: "react-app-curso-aeab8.appspot.com",
    messagingSenderId: "496873216661",
    appId: "1:496873216661:web:5178ba9322813d8337d99c"
  };
  
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  export {
      db, 
      googleAuthProvider,
      firebase
  }
