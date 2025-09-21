import { initializeApp } from 'firebase/app';

const firebaseConfig = {
apiKey: "AIzaSyBqgac26sQ5zygGpuGcjSIOf3pYpHXoFao",
authDomain: "crm1-e85dc.firebaseapp.com",
projectId: "crm1-e85dc",
storageBucket: "crm1-e85dc.firebasestorage.app",
messagingSenderId: "951669850060",
appId: "1:951669850060:web:91ccbe16e938663249e769",
measurementId: "G-QK0H3M64J3"
};

const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;