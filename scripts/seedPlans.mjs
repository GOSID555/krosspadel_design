import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAbxjbnHAxPDB4vJ7fX3iemkt3XIQnDNDE",
  authDomain: "kross-backend.firebaseapp.com",
  projectId: "kross-backend",
  storageBucket: "kross-backend.firebasestorage.app",
  messagingSenderId: "894318108715",
  appId: "1:894318108715:web:b199640d29cc241a2e8a6e",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// clear existing plans
const existing = await getDocs(collection(db, "plans"));
for (const d of existing.docs) await deleteDoc(doc(db, "plans", d.id));

const plans = [
  {
    name: "Kross Pass",
    price: "All KROSS Clubs",
    featured: true,
    order: 1,
    highlight: "Valid 3 months · Non-transferable · All clubs",
    perks: "20 hrs — 17,400 THB\n30 hrs — 25,600 THB\n50 hrs — 41,000 THB\n100 hrs — 78,000 THB (no expiry)\nUse for regular booking",
  },
  {
    name: "Club Pass",
    price: "1 Club Only",
    featured: false,
    order: 2,
    highlight: "Valid 3 months · Non-transferable · 1 club",
    perks: "20 hrs — 16,000 THB\n30 hrs — 24,000 THB\n50 hrs — 37,000 THB\n100 hrs — 70,000 THB (no expiry)\nUse for regular booking",
  },
];

for (const p of plans) {
  await addDoc(collection(db, "plans"), p);
  console.log(`✓ ${p.name} added`);
}
console.log("Done.");
