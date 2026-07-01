import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import dotenv from "dotenv";
import sharp from "sharp";

dotenv.config({ path: '.env.local' });

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
const storage = getStorage(app);

async function processCollection(colName) {
  const snap = await getDocs(collection(db, colName));
  for (const d of snap.docs) {
    const data = d.data();
    const url = data.image;
    if (!url) continue;

    console.log(`Processing ${colName} -> ${d.id}...`);

    if (url.includes('unsplash.com')) {
      if (!url.includes('w=800')) {
        let newUrl = url.includes('?') ? `${url}&w=800&q=50&auto=format` : `${url}?w=800&q=50&auto=format`;
        await updateDoc(doc(db, colName, d.id), { image: newUrl });
        console.log(`Updated Unsplash URL for ${d.id}`);
      } else {
        console.log(`Unsplash URL already optimized for ${d.id}`);
      }
    } else if (url.includes('firebasestorage')) {
      try {
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        
        if (buffer.length < 250 * 1024) {
          console.log(`Skipping ${d.id}, already small: ${Math.round(buffer.length/1024)}KB`);
          continue;
        }

        console.log(`Compressing ${d.id}... Original size: ${Math.round(buffer.length/1024)}KB`);
        const compressedBuffer = await sharp(buffer)
          .resize({ width: 800, withoutEnlargement: true })
          .jpeg({ quality: 60 })
          .toBuffer();
          
        console.log(`New size: ${Math.round(compressedBuffer.length/1024)}KB`);

        const filename = `images/compressed_${Date.now()}_${d.id}.jpg`;
        const storageRef = ref(storage, filename);
        await uploadBytes(storageRef, compressedBuffer, { contentType: 'image/jpeg' });
        const newUrl = await getDownloadURL(storageRef);

        await updateDoc(doc(db, colName, d.id), { image: newUrl });
        console.log(`Updated Firestore for ${d.id}`);
      } catch (err) {
        console.error(`Error processing ${d.id}:`, err.message);
      }
    }
  }
}

async function run() {
  await processCollection('properties');
  await processCollection('team_members');
  console.log("Done!");
  process.exit(0);
}

run();
