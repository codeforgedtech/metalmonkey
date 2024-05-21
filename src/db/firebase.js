import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBLWoKwVA3kJoN3Z6amgvvl6FPLIqtMXAA",
  authDomain: "dev-news-24784.firebaseapp.com",
  projectId: "dev-news-24784",
  storageBucket: "dev-news-24784.appspot.com",
  messagingSenderId: "997981118580",
  appId: "1:997981118580:web:68a6e8c293263fb49e3121"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  
  export { auth, db };