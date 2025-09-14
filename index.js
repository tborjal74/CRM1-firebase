// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'; 
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqgac26sQ5zygGpuGcjSIOf3pYpHXoFao",
  authDomain: "crm1-e85dc.firebaseapp.com",
  projectId: "crm1-e85dc",
  storageBucket: "crm1-e85dc.firebasestorage.app",
  messagingSenderId: "951669850060",
  appId: "1:951669850060:web:91ccbe16e938663249e769",
  measurementId: "G-QK0H3M64J3"
};
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('6Le1YskrAAAAAMCfGxPZLSmN7yif5o4NjH9IRKYs'),
  });

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Auth for Firebase
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
db.collection('todos').getDocs();
const todosCol = collection(db,'todos');
const snapshot = awaitgetDocs(todosCol);

//Detect auth state
onAuthStateChanged(auth, user => {
    if(user != null) {
        console.log('logged in!');
    } else {
        console.log('No user');
    }
});