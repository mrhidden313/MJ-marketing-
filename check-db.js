import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import dotenv from "dotenv";

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function check() {
  const propsSnap = await getDocs(collection(db, "properties"));
  console.log("Properties:");
  propsSnap.forEach(d => console.log(d.id, d.data().image));

  const teamSnap = await getDocs(collection(db, "team_members"));
  console.log("\nTeam:");
  teamSnap.forEach(d => console.log(d.id, d.data().image));
  
  process.exit(0);
}

check();
