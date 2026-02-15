// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDAjQUw_HXjV9Gv_fJTtTnB8OGOmEnClgQ",
    authDomain: "soya-udyog.firebaseapp.com",
    projectId: "soya-udyog",
    storageBucket: "soya-udyog.firebasestorage.app",
    messagingSenderId: "662384376592",
    appId: "1:662384376592:web:00f4e3608796a81facc395"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
