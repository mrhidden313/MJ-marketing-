import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { createClient } from '@supabase/supabase-js';

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY || "AIzaSyDTp6gimaXKvrlE9hQaYQyj2furcu619r0",
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || "mj-marketing-f59f5.firebaseapp.com",
  projectId: process.env.VITE_FIREBASE_PROJECT_ID || "mj-marketing-f59f5",
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET || "mj-marketing-f59f5.firebasestorage.app",
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "627456553249",
  appId: process.env.VITE_FIREBASE_APP_ID || "1:627456553249:web:0703a8b2fe1d0d5d520e60"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Use the Service Role Key for bypassing RLS during migration
const supabaseUrl = 'https://wevncduaaejdgbzkknpn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indldm5jZHVhYWVqZGdiemtrbnBuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NTA2MjUxMSwiZXhwIjoyMTAwNjM4NTExfQ.b_j2bxInwo9ZHMsxBMPke5Hrq2fW1q4Vgvn63tPE1W0';
const supabase = createClient(supabaseUrl, supabaseKey);

async function migrate() {
  console.log("Starting data migration from Firebase to Supabase...");

  try {
    // 1. Migrate Properties
    console.log("Fetching properties from Firebase...");
    const propertiesSnap = await getDocs(collection(db, "properties"));
    const properties = [];
    propertiesSnap.forEach((doc) => {
      const data = doc.data();
      properties.push({
        id: doc.id,
        title: data.title,
        location: data.location,
        price: data.price,
        type: data.type,
        beds: String(data.beds || ''),
        baths: String(data.baths || ''),
        sqft: data.area || '',
        status: data.tag || '',
        image: data.image
      });
    });

    console.log(`Found ${properties.length} properties. Inserting to Supabase...`);
    if (properties.length > 0) {
      const { data, error } = await supabase.from('properties').upsert(properties);
      if (error) {
        console.error("Error inserting properties:", error);
      } else {
        console.log("Properties migrated successfully!");
      }
    }

    // 2. Migrate Team Members
    console.log("Fetching team members from Firebase...");
    const teamSnap = await getDocs(collection(db, "team_members"));
    const teamMembers = [];
    teamSnap.forEach((doc) => {
      teamMembers.push({ ...doc.data(), id: doc.id });
    });

    console.log(`Found ${teamMembers.length} team members. Inserting to Supabase...`);
    if (teamMembers.length > 0) {
      const { data, error } = await supabase.from('team_members').upsert(teamMembers);
      if (error) {
        console.error("Error inserting team members:", error);
      } else {
        console.log("Team members migrated successfully!");
      }
    }

    console.log("Migration completed!");
  } catch (err) {
    console.error("Migration failed:", err);
  }
}

migrate().then(() => setTimeout(() => process.exit(0), 1000));
