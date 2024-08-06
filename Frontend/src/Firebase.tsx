import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCp-0ibgM_NMyGtxYlsJqwwWbwJrYk1nuY",
    authDomain: "fastreachdb.firebaseapp.com",
    projectId: "fastreachdb",
    storageBucket: "fastreachdb.appspot.com",
    messagingSenderId: "474288761313",
    appId: "1:474288761313:web:9de5f80939069a72458aa0",
    measurementId: "G-VJ6QQBLRW9"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);