import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import fs from 'fs';
import path from 'path';

// Manual simple dotenv parser
const envConfig = fs.readFileSync(path.resolve(process.cwd(), '.env.local'), 'utf8')
  .split('\n')
  .filter(line => line.includes('='))
  .reduce((acc: any, line) => {
    const [key, val] = line.split('=');
    acc[key.trim()] = val.trim().replace(/"/g, '');
    return acc;
  }, {});

const firebaseConfig = {
  apiKey: envConfig.VITE_FIREBASE_API_KEY,
  authDomain: envConfig.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: envConfig.VITE_FIREBASE_PROJECT_ID,
  storageBucket: envConfig.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: envConfig.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: envConfig.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const TEAM_MEMBERS = [
  {
    id: "1",
    name: "Malik Jalil",
    role: "CEO & Founder",
    image: "/src/assets/team/Malik jail .jpg",
    description: "Visionary leader driving our highly professional company to unprecedented success in the premium real estate industry."
  },
  {
    id: "2",
    name: "Adil Khalil",
    role: "General Manager",
    image: "/src/assets/team/Adil khalil.png",
    description: "Operational maestro orchestrating excellence and ensuring our professional company delivers unmatched client satisfaction."
  },
  {
    id: "3",
    name: "Abdul Rahim",
    role: "Management Director",
    image: "/src/assets/team/Abdul rahim.jpeg",
    description: "Seasoned professional overseeing high-value project executions, corporate governance, and strategic planning."
  },
  {
    id: "4",
    name: "Irshad Mohmand",
    role: "News Director",
    image: "/src/assets/team/irshad mohmand .JPEG",
    description: "Expert media strategist ensuring top-tier brand visibility and leading professional communication across platforms."
  },
  {
    id: "5",
    name: "Tariq Mangal",
    role: "Sales Executive",
    image: "/src/assets/team/Tariq mangal.jpeg",
    description: "Dedicated sales specialist providing lucrative investment opportunities and unmatched value to our premium clients."
  },
  {
    id: "6",
    name: "Zaman",
    role: "CEO Personal Assistant",
    image: "/src/assets/team/zaman assistant.jpg",
    description: "Organized and highly efficient assistant ensuring seamless executive operations and daily professional coordination."
  }
];

async function seed() {
  console.log("Seeding team members...");
  for (const member of TEAM_MEMBERS) {
    try {
      await setDoc(doc(db, "team_members", member.id), member);
      console.log(`Added: ${member.name}`);
    } catch (e) {
      console.error(`Failed to add ${member.name}:`, e);
    }
  }
  console.log("Done seeding team members!");
}

seed();
