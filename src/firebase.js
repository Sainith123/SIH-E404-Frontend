import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; // Import getStorage

//created by sainith
// const firebaseConfig = {
// apiKey: "AIzaSyBSrUxYDBsqg5nCwPMclTQTCaDh82NmX_U",
// authDomain: "sih2024-8db60.firebaseapp.com",
// projectId: "sih2024-8db60",
// storageBucket: "sih2024-8db60.appspot.com",
// messagingSenderId: "750252057543",
// appId: "1:750252057543:web:d8ff3397ee60bc71f12fe2",
// measurementId: "G-65HFX3PKW6"
// };

//created by sohan
const firebaseConfig = {
    apiKey: "AIzaSyBSrUxYDBsqg5nCwPMclTQTCaDh82NmX_U",
    authDomain: "sih2024-8db60.firebaseapp.com",
    projectId: "sih2024-8db60",
    storageBucket: "sih2024-8db60.appspot.com",
    messagingSenderId: "750252057543",
    appId: "1:750252057543:web:d8ff3397ee60bc71f12fe2",
    measurementId: "G-65HFX3PKW6"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app); // Initialize Firebase Storage


export { auth, provider, signInWithPopup, signOut, db, doc, getDoc, setDoc, storage };
