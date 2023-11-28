import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";



const firebaseConfig = {
    apiKey: "AIzaSyBRMu_-_yEejRHw9FE-TjblMxUikccWbvs",
    authDomain: "blogging-app-ad12e.firebaseapp.com",
    projectId: "blogging-app-ad12e",
    storageBucket: "blogging-app-ad12e.appspot.com",
    messagingSenderId: "10495524272",
    appId: "1:10495524272:web:d6893b23fb91458097ea75"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);