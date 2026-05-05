import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export const getVenues = async () => {
    const snapshot = await getDocs(collection(db, "venues"));
    return snapshot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id  // ✅ วางทีหลัง ให้ doc.id ชนะเสมอ
}));
};