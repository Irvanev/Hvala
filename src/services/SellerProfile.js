import { collection, query, where, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../config/firebase";

export const getUserSeller = async (link, setUser) => {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('id', '==', link));

    try {
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            console.warn("No matching documents found.");
            return;
        }
        querySnapshot.forEach((doc) => {
            setUser(doc.data());
        });
    } catch (error) {
        console.error("Error getting documents: ", error);
    }
};