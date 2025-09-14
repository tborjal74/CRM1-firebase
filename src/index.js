// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);