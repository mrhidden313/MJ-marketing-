import { doc, setDoc } from "firebase/firestore";
import { db } from "../src/lib/firebase";
import { PROPERTIES } from "../src/data/properties";

async function seedDatabase() {
  try {
    console.log("Seeding properties...");
    for (const property of PROPERTIES) {
      const docRef = doc(db, "properties", property.id);
      await setDoc(docRef, property);
      console.log(`✅ Uploaded property: ${property.title}`);
    }

    console.log("🎉 Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
