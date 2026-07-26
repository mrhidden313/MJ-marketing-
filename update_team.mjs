import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, updateDoc, doc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDTp6gimaXKvrlE9hQaYQyj2furcu619r0",
  authDomain: "mj-marketing-f59f5.firebaseapp.com",
  projectId: "mj-marketing-f59f5",
  storageBucket: "mj-marketing-f59f5.firebasestorage.app",
  messagingSenderId: "627456553249",
  appId: "1:627456553249:web:0703a8b2fe1d0d5d520e60"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function run() {
  const querySnapshot = await getDocs(collection(db, "team_members"));
  let found = false;
  querySnapshot.forEach(async (d) => {
    const data = d.data();
    console.log("Found member:", data.name);
    if (data.name && data.name.toLowerCase().includes('mohsin')) {
      found = true;
      console.log("Updating", data.name, d.id);
      await updateDoc(doc(db, "team_members", d.id), {
        image: "/team/mohsin.png"
      });
      console.log("Updated Mohsin successfully!");
    }
  });
  if (!found) {
    console.log("Could not find a team member with name 'mohsin'");
  }
}

run().then(() => setTimeout(() => process.exit(0), 2000));
