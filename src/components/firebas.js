// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAqbH2kKYUommsLaWdIxPvM5qjulunp_3w",
  authDomain: "ecommerce-website-45ad0.firebaseapp.com",
  projectId: "ecommerce-website-45ad0",
  storageBucket: "ecommerce-website-45ad0.firebasestorage.app",
  messagingSenderId: "112491678765",
  appId: "1:112491678765:web:1dfa731562c2450fb83ca4",
  measurementId: "G-L8LJEXJJJ1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);